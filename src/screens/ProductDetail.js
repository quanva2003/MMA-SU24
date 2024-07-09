import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

var { width, height } = Dimensions.get("window");

const ProductDetail = ({ route }) => {
  const product = route.params;
  const [isFavorite, toggleIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.product.image[0]);

  const navigate = useNavigation();
  const productData = product.product;
  console.log("Product: ", productData);

  return (
    <ScrollView style={tw`flex-1 mt-7.5 py-6 bg-stone-950 ${styles.container}`}>
      <View style={tw`flex flex-row justify-between px-6`}>
        <TouchableOpacity
          style={tw`items-start`}
          onPress={() => navigate.goBack()}
        >
          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
            style={tw`bg-yellow-500 p-1 rounded-xl hover:bg-yellow-600`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`items-start`}
          onPress={() => {
            toggleIsFavorite(!isFavorite);
          }}
        >
          <Icon
            type="font-awesome"
            name={`${isFavorite ? "heart" : "heart-o"}`}
            size={24}
            color={`${isFavorite ? "rgb(234 179 8)" : "#fff"}`}
          />
        </TouchableOpacity>
      </View>

      <View
        style={tw`w-full flex justify-center items-center bg-stone-800 rounded-xl py-8`}
      >
        <Image
          source={{ uri: currentImage }}
          style={{
            width: 400,
            height: 200,
          }}
        />
        <View
          style={tw`flex flex-row items-start justify-center gap-4 border-4 border-red-500`}
        >
          {productData.image.map((image, index) => {
            return (
              <TouchableOpacity
                onPress={() => setCurrentImage(image)}
                key={index}
                style={tw`flex`}
              >
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 100,
                    height: 100,
                    opacity: currentImage === image ? 1 : 0.3,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={tw`w-full flex p-4`}>
        <View style={tw`flex-row items-start justify-between text-white`}>
          <Text style={tw`text-white font-black text-[1.8rem] max-w-1/2`}>
            Diamond Dia Diamond{" "}
          </Text>
          <Text style={tw`text-white text-xs py-2`}>
            Sold: {productData.quantitySold}
          </Text>
        </View>
        <Text style={tw`text-slate-200 text-xl pt-4`}>
          {productData.category}
        </Text>
        <Text style={tw`text-slate-200 text-sm font-light pt-4`}>
          {productData.description.length < 20
            ? "a spoken or written representation or account of a person, object, or event. a spoken or written representation or account of a person, object, or event. a spoken or written representation or account of a person, object, or event. a spoken or written representation or account of a person, object, or event."
            : productData.description}
        </Text>
      </View>

      <View style={tw`bg-black`}>
        <Text style={tw`text-white`}>{productData.price}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductDetail;
