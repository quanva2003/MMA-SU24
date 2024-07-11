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
import React, { useEffect } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import CurrencySplitter from "../assistants/currencySpliter";

//Khi nào đổi bên trang home truyền qua đúng data thì sửa mấy cái "temp" thành "product" là được
const temp = {
  _id: "668e2baa1d9ba0c851a29441",
  productName:
    "Anastasia Lab Diamond Halo Engagement Ring 18K White Gold 1.30ct F/VS1",
  diamondId: {
    _id: "668e2ac450d3ae9df2b1806b",
    type: "Lab Diamond",
  },
  shellId: {
    _id: "668e2a1f50d3ae9df2b18069",
    shellName: "Halo",
    category: "ring",
    size: [7, 8, 9, 10],
    createdAt: "2024-07-10T06:28:47.501Z",
    updatedAt: "2024-07-10T06:28:47.501Z",
    __v: 0,
  },
  materialId: {
    _id: "668e29c450d3ae9df2b18067",
    materialName: "White Gold",
    createdAt: "2024-07-10T06:27:16.519Z",
    updatedAt: "2024-07-10T06:27:16.519Z",
    __v: 0,
  },
  quantity: 300,
  price: 35650000,
  image: [
    "https://thediamondstore.imgix.net/productimages/LBSR57-D50w-2.jpg",
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  ],
  description:
    "To create breathtaking brilliance, this exquisite engagement ring brings together a stunning lab grown solitaire and a double halo of diamonds. Drawing the eye to the solitaire is a split shank band, which provides more surface area for dazzling accent diamonds. The handcrafted 18K white gold setting looks and feels luxurious on the hand.",
  createdAt: "2024-07-10T06:35:22.888Z",
  updatedAt: "2024-07-10T06:35:22.888Z",
  __v: 0,
};

const ProductDetail = ({ route }) => {
  const product = route.params;
  const [isInCart, toggleIsInCart] = useState(false);
  const [currentImage, setCurrentImage] = useState(temp.image[0]);
  const [currentSize, setCurrentSize] = useState(0);

  const navigate = useNavigation();
  const productData = product.product;
  console.log("Product: ", productData);

  const handleAddToCart = () => {
    console.log("Add to cart");
    toggleIsInCart(!isInCart);
  };

  const handleSelectSize = (size) => {
    if (size === currentSize) setCurrentSize(0);
    else setCurrentSize(size);
  };

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView
        style={tw`absolute top-8 left-0 right-0 w-full flex flex-row justify-between px-4 pt-2 z-20`}
      >
        <TouchableOpacity
          style={tw`items-start`}
          onPress={() => navigate.goBack()}
        >
          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
            style={tw`bg-gray-800 p-1 rounded-xl`}
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
            <View style={tw`w-full rounded-b-xl pb-2`}>
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
                  style={tw`flex flex-row items-start justify-center gap-4 p-2
                  ${temp.image.length === 0 && "hidden"}`}
                >
                  {temp.image.map((image, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setCurrentImage(image)}
                        key={index}
                        style={tw`flex rounded-full overflow-hidden p-1 bg-gray-500`}
                      >
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: 50,
                            height: 50,
                            opacity: currentImage === image ? 1 : 0.3,
                            borderRadius: 50,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ImageBackground>
            </View>

            <View style={tw`w-full flex p-2`}>
              <Text style={tw`text-white font-black text-[1.5rem]`}>
                {temp.productName}
              </Text>
              <View style={tw`flex-1 items-start gap-2 py-4`}>
                <Text style={tw`text-white opacity-50`}>
                  Detailed information:
                </Text>
                <View style={tw`flex-1 items-start gap-2 px-4`}>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Icon
                      type="font-awesome"
                      name="diamond"
                      size={16}
                      color="#fff"
                    />
                    <Text style={tw`text-slate-200 text-sm font-light`}>
                      Type: {temp.diamondId.type}
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Icon
                      type="font-awesome-5"
                      name="ring"
                      size={16}
                      color="#fff"
                    />
                    <Text style={tw`text-slate-200 text-sm font-light`}>
                      {temp.shellId.category.charAt(0).toUpperCase() +
                        temp.shellId.category.substring(1)}{" "}
                      brand: {temp.shellId.shellName}
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-2`}>
                    <Icon
                      type="material-community"
                      name="gold"
                      size={16}
                      color="#fff"
                    />
                    <Text style={tw`text-slate-200 text-sm font-light`}>
                      {temp.shellId.category.charAt(0).toUpperCase() +
                        temp.shellId.category.substring(1)}{" "}
                      material: {temp.materialId.materialName}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={tw`flex-1 items-start gap-2 py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Text style={tw`text-white opacity-50`}>Available size:</Text>
                  <View style={tw`flex-row items-center gap-2`}>
                    {temp.shellId.size.map((size) => {
                      return (
                        <TouchableOpacity
                          onPress={() => handleSelectSize(size)}
                          style={tw`min-w-8 min-h-8 flex items-center justify-center rounded-xl bg-white ${
                            currentSize !== size &&
                            "bg-black border border-white"
                          }`}
                        >
                          <Text
                            style={tw`${currentSize !== size && "text-white"}`}
                          >
                            {size}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <Text style={tw`text-white italic text-xs px-8`}>
                  We can help in size selecting unless you do not know the exact
                  one.
                </Text>
                <Text style={tw`text-red-500 italic text-xs px-8`}>
                  Nếu nó chọn size thì cho bỏ qua bước gửi request cho sale, còn
                  không chọn thì như cũ. Bước này không có trong main flow nhưng
                  dù sao cũng ngắn gọn, cho UI nó phong phú tí. Đọc rồi thì xóa
                  dòng đỏ đỏ này.
                </Text>
              </View>

              <View style={tw`flex-1 items-start gap-2 py-4`}>
                <Text style={tw`text-white opacity-50`}>Description</Text>
                <Text style={tw`text-slate-200 text-sm font-light`}>
                  {temp.description}
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
                $ {CurrencySplitter(Math.round(temp.price))}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleAddToCart}
              style={tw`grow ml-4 px-2 py-3 rounded-xl flex-row items-center justify-center gap-2 ${
                isInCart ? "bg-green-600" : "bg-white"
              }`}
            >
              {isInCart ? (
                <Icon
                  type="antdesign"
                  name="checkcircle"
                  size={16}
                  color="#fff"
                />
              ) : (
                <Icon type="zocial" name="cart" size={16} color="#000" />
              )}
              <Text
                style={tw`${
                  isInCart && "text-white"
                } flex-row items-center font-semibold`}
              >
                {isInCart ? "ADDED" : "ADD"} TO CART
              </Text>
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
