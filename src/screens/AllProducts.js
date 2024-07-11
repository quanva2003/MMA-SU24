import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ProductCard = ({ product, navigate }) => (
  <TouchableOpacity
    onPress={() => navigate.navigate("ProductDetail", { product })}
    style={styles.productCard}
  >
    <Image source={{ uri: product.image[0] }} style={styles.productImage} />
    <Text style={styles.productDescription}>
      {truncateText(product.productName, 4)}
    </Text>
    <Text style={styles.productPrice}>Price: {product.price}$</Text>
  </TouchableOpacity>
);

const truncateText = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const AllProducts = () => {
  const navigate = useNavigation();
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/api/products")
      .then((response) => {
        setProductData(response.data);
        setFilteredProductData(response.data); // Initialize filtered data with all products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = productData.filter((item) =>
      item.productName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProductData(filteredData);
  };

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
      <Text style={tw`text-white text-2xl font-bold mt-2 pb-3`}>Product</Text>
      <View style={styles.searchBoxContainer}>
        <Icon
          type="ionicons"
          name="search"
          color="white"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBox}
          placeholder="Search..."
          placeholderTextColor="#FFFFFF"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredProductData}
        renderItem={({ item }) => (
          <ProductCard product={item} navigate={navigate} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  productList: {
    justifyContent: "center",
    alignItems: "center",
  },
  productCard: {
    width: 180,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  productImage: {
    width: 163,
    height: 207,
    borderRadius: 10,
    marginBottom: 10,
  },
  productDescription: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  productPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    paddingLeft: 10,
    color: "#FFFFFF",
  },
  searchIcon: {
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    paddingVertical: 5,
    paddingRight: 10,
    color: "#FFFFFF",
  },
});
