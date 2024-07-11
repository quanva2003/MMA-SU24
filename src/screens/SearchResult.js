import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import axios from "axios";

const SearchResult = ({ route }) => {
  const { query } = route.params;
  const navigate = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8000/api/products/name/${query}`)
      .then((response) => {
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-black mt-7.5 p-6`}>
      <TouchableOpacity
        style={tw`items-start`}
        onPress={() => navigate.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={tw`text-white text-xl font-bold mt-2 pb-3`}>
        Search Results for: {query}
      </Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() =>
              navigate.navigate("ProductDetail", { product: item })
            }
          >
            <Image
              source={{ uri: item.image[0] }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.productPrice}>Price: {item.price}$</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  productList: {
    paddingVertical: 10,
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    color: "#fff",
    fontSize: 14,
  },
});

export default SearchResult;
