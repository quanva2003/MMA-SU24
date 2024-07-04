import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import tw from "twrnc";

const ProductCard = ({ product, navigate }) => (
  <TouchableOpacity
    onPress={() => navigate.navigate("ProductDetail", { product })}
    style={styles.productCard}
  >
    <Image source={{ uri: product.image[0] }} style={styles.productImage} />
    <Text style={styles.productDescription}>{product.category}</Text>
    <Text style={styles.productPrice}>{product.price}$</Text>
    <Text style={tw`text-white`}>{product.quantitySold} sold</Text>
  </TouchableOpacity>
);

const NewProduct = () => {
  const navigate = useNavigation();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://6686443583c983911b01668f.mockapi.io/product")
      .then((response) => {
        console.log(response.data);
        setProductData(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl font-bold ml-2 mb-2`}>
          New Product
        </Text>
        <TouchableOpacity style={tw`flex-row items-center`}>
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
        keyExtractor={(item) => item.id}
        horizontal={true} // Enable horizontal scrolling
        contentContainerStyle={styles.productList}
      />
    </View>
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
  },
  topHeader: {
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  selectedCategoryButton: {
    backgroundColor: "#555",
  },
  categoryText: {
    color: "#ccc",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  productList: {
    alignItems: "flex-start",
  },
  productCard: {
    width: 150,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
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
