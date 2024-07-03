import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const categories = ["Tüm Ürünler", "Yüzük", "Kolye"];
const products = [
  {
    id: "1",
    category: "Sanpham1",
    image:
      "https://th.bing.com/th/id/OIP.VL7Yvcbyjm4RP2D9IQiNXQHaFj?rs=1&pid=ImgDetMain",
    description: "1,75 qqasfergrefadf",
    price: "9.875 $",
    quantitySold: "10",
  },
  {
    id: "2",
    category: "Sanpham2",
    image:
      "https://th.bing.com/th/id/OIP.VL7Yvcbyjm4RP2D9IQiNXQHaFj?rs=1&pid=ImgDetMain",
    description: "2,99 ergsefdgrqef",
    price: "10.750 $",
    quantitySold: "10",
  },
  {
    id: "3",
    category: "Sanpham3",
    image:
      "https://th.bing.com/th/id/OIP.VL7Yvcbyjm4RP2D9IQiNXQHaFj?rs=1&pid=ImgDetMain",
    description: "1,75 qqasfergrefadf",
    price: "9.875 $",
    quantitySold: "10",
  },
  {
    id: "4",
    category: "Sanpham4",
    image:
      "https://th.bing.com/th/id/OIP.VL7Yvcbyjm4RP2D9IQiNXQHaFj?rs=1&pid=ImgDetMain",
    description: "2,99 ergsefdgrqef",
    price: "10.750 $",
    quantitySold: "10",
  },
  // Add more products as needed
];

const ProductCard = ({ product }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: product.image }} style={styles.productImage} />
    <Text style={styles.productDescription}>{product.description}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
    <Text style={tw`text-white `}>{product.quantitySold} sold</Text>
  </View>
);

const Category = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Tüm Ürünler");

  const filteredProducts =
    selectedCategory === "Tüm Ürünler"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl font-bold ml-2 mb-2`}>
          Top Category
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
      {/* <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
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

export default Category;
