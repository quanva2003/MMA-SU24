import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Carousel } from "@ant-design/react-native";
const ProductDetail = ({ route }) => {
  const product = route.params;
  const navigate = useNavigation();
  console.log(product.product);
  const productData = product.product;
  return (
    <View style={tw`flex-1 bg-black mt-7.5 p-6`}>
      <TouchableOpacity
        style={tw`items-start`}
        onPress={() => navigate.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={tw`mt-0 flex-1`}>
        <View style={tw`px-5`}>
          <Carousel
            style={tw`bg-black w-auto h-full`}
            selectedIndex={0}
            infinite={true}
            dotActiveStyle={tw`bg-red-800`}
            autoplay
          >
            {productData.image.map((image, index) => (
              <View key={index} style={tw``}>
                <Image
                  source={{ uri: image }}
                  style={tw`w-full h-full`}
                  //   resizeMode="cover"
                />
              </View>
            ))}
          </Carousel>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
