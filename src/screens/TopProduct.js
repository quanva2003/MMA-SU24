import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
const products = [
  {
    id: "1",
    category: "Sanpham1",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "1,75 qqasfergrefadf",
    price: "9.875 $",
    quantitySold: "10",
  },
  {
    id: "2",
    category: "Sanpham2",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "2,99 ergsefdgrqef",
    price: "10.750 $",
    quantitySold: "10",
  },
  {
    id: "3",
    category: "Sanpham3",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "1,75 qqasfergrefadf",
    price: "9.875 $",
    quantitySold: "10",
  },
  {
    id: "4",
    category: "Sanpham4",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "2,99 ergsefdgrqef",
    price: "10.750 $",
    quantitySold: "10",
  },
  {
    id: "5",
    category: "Sanpham1",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "1,75 qqasfergrefadf",
    price: "9.875 $",
    quantitySold: "10",
  },
  {
    id: "6",
    category: "Sanpham2",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "2,99 ergsefdgrqef",
    price: "10.750 $",
    quantitySold: "10",
  },
  {
    id: "7",
    category: "Sanpham3",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "1,75 qqasfergrefadf",
    price: "9.875 $",
    quantitySold: "10",
  },
  {
    id: "8",
    category: "Sanpham4",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    description: "2,99 ergsefdgrqef",
    price: "10.750 $",
    quantitySold: "10",
  },
];
const ProductCard = ({ product }) => (
  <View style={tw`bg-neutral-800 rounded-lg p-4 m-2 w-40`}>
    <Image
      source={{ uri: product.image }}
      style={tw`w-full h-40 rounded-lg mb-2`}
    />
    <Text style={tw`text-white text-center mb-1`}>{product.description}</Text>
    <Text style={tw`text-white font-bold text-center mb-1`}>
      {product.price}
    </Text>
    <Text style={tw`text-white text-center`}>{product.quantitySold} sold</Text>
  </View>
);
const TopProduct = () => {
  const navigate = useNavigation();
  return (
    <View style={tw`flex-1 bg-black mt-7.5 p-6`}>
      <TouchableOpacity
        style={tw`items-start`}
        onPress={() => navigate.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={tw`text-white text-xl font-bold mt-2 pb-3`}>
        Top Product
      </Text>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={tw`items-center`}
      />
    </View>
  );
};

export default TopProduct;
