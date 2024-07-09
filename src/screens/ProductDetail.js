import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import CurrencySplitter from "../assistants/currencySpliter";
import { StarRatingDisplay } from "react-native-star-rating-widget";

const tempSize = [9, 10, 12];

const ProductDetail = ({ route }) => {
  const product = route.params;
  const [isFavorite, toggleIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.product.image[0]);
  const [currentSize, setCurrentSize] = useState();

  const navigate = useNavigation();
  const productData = product.product;
  console.log("Product: ", productData);

  const handleSelectSize = (selectedSize) => {
    if (currentSize === selectedSize) setCurrentSize(null);
    else setCurrentSize(selectedSize);
  };

  const handleAddToFavorite = () => {
    toggleIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!currentSize) {
      Alert.alert(
        "Select a size",
        "Please select a size before adding it to cart!"
      );
    } else {
      console.log("Add to cart");
      navigate.navigate("Checkout", { product: productData });
    }
  };

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView
        style={tw`absolute top-8 left-0 right-0 w-full flex flex-row justify-between px-6 pt-4 z-20`}
      >
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
        <TouchableOpacity style={tw`items-start`} onPress={handleAddToFavorite}>
          <Icon
            type="font-awesome"
            name={`${isFavorite ? "heart" : "heart-o"}`}
            size={24}
            color={`${isFavorite ? "rgb(234 179 8)" : "#fff"}`}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {!product ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            style={tw`flex-1 mt-7.5 bg-stone-950 ${styles.container}`}
          >
            <View style={tw`w-full rounded-b-xl pb-8`}>
              <ImageBackground
                source={{
                  uri: currentImage,
                }}
                style={{
                  width: "auto",
                  height: 400,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={tw`flex flex-row items-start justify-center gap-8 p-2`}
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
                            width: 50,
                            height: 50,
                            opacity: currentImage === image ? 1 : 0.3,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ImageBackground>
            </View>

            <View style={tw`w-full flex p-4`}>
              <View style={tw`flex-row items-start justify-between text-white`}>
                <Text style={tw`text-white font-black text-[1.8rem] max-w-1/2`}>
                  Diamond Dia Diamond{" "}
                </Text>
                <View style={tw`flex items-end gap-2 py-2`}>
                  <View style={tw`flex-row items-center gap-1`}>
                    <StarRatingDisplay
                      rating={4.5}
                      color="white"
                      starSize={16}
                    />
                    <Text style={tw`text-white text-[0.5rem]`}>
                      &#40;4.7&#41;
                    </Text>
                  </View>
                  <Text style={tw`text-white text-[0.6rem]`}>
                    {productData.quantitySold} sold
                  </Text>
                </View>
              </View>
              <Text style={tw`text-slate-200 text-xl py-4`}>
                {productData.category}
              </Text>
              <View style={tw`flex-1 items-start gap-2`}>
                <Text style={tw`text-white opacity-50`}>Size</Text>
                <View style={tw`flex-row gap-2`}>
                  {tempSize.map((size) => {
                    return (
                      <TouchableOpacity onPress={() => handleSelectSize(size)}>
                        <Text
                          key={size}
                          style={tw`w-8 text-white font-semibold border border-white py-2 text-center rounded-lg ${
                            size === currentSize ? "text-black bg-white" : ""
                          }`}
                        >
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={tw`flex-1 items-start gap-2 mt-8`}>
                <Text style={tw`text-white opacity-50`}>Description</Text>
                <Text style={tw`text-slate-200 text-sm font-light`}>
                  {productData.description.length < 20
                    ? "a spoken or written representation or account of a person, object, or event. a spoken or written representation or account of a person, object, or event. a spoken or written representation or account of a person, object, or event. a spoken or written representation or account of a person, object, or event."
                    : productData.description}
                </Text>
              </View>

              <View style={tw`min-h-16`} />
            </View>
          </ScrollView>

          <View
            style={tw`w-full bg-stone-800 absolute bottom-0 left-0 right-0 flex-row items-center rounded-t-xl px-4 py-2`}
          >
            <View style={tw`flex gap-1`}>
              <Text style={tw`text-xs text-white`}>Price</Text>
              <Text style={tw`text-lg text-white font-semibold`}>
                ${" "}
                {CurrencySplitter(
                  Math.round(productData.price * 10000000000) / 100
                )}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleAddToCart}
              style={tw`grow ml-4 py-3 rounded-xl flex-row items-center justify-center gap-2 bg-white`}
            >
              <Icon type="zocial" name="cart" size={16} color="#000" />
              <Text>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductDetail;
