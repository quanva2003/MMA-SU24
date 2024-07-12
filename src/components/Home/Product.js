import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import tw from "twrnc";

const truncateText = (text, wordLimit) => {
  if (!text) return ""; // Return an empty string if text is undefined
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

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

const NewProduct = () => {
  const navigate = useNavigation();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/api/products")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setProductData(sortedData.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl font-bold ml-2 mb-2`}>Products</Text>
        <TouchableOpacity
          onPress={() => navigate.navigate("AllProducts")}
          style={tw`flex-row items-center`}
        >
          <Text style={tw`text-white text-base font-light ml-2 mb-2`}>
            See more
          </Text>
          <Icon
            name="chevron-right"
            type="MaterialIcons"
            size={20}
            color="white"
            style={tw`ml-1 mb-1`}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={productData}
        renderItem={({ item }) => (
          <ProductCard product={item} navigate={navigate} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
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
    // marginBottom: 10,
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
});

export default NewProduct;
