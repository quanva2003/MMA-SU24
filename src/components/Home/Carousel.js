import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Carousel } from "@ant-design/react-native";
import tw from "twrnc";
const images = [
  "https://www.tierra.vn/files/bannercach-oNYNJcb86Y.jpg",
  // "https://fifthandfine.com/cdn/shop/files/3200x1200-shopify-top-banner-grand_5ab78400-8e1b-4815-909b-340790c10123.jpg?v=1710264970",
  // "https://images.ctfassets.net/7m8i36sp5l90/2OjntdC41RkFSwyp96bD6U/ffeaf63f154c47cf3d102f1c7ba59be1/forever-gifts_thumb2.jpg",
];

const CarouselComponent = () => {
  return (
    <View style={tw`mt-0 `}>
      <View style={tw`px-5`}>
        {/* <Carousel
          style={tw`bg-black w-auto h-30`}
          selectedIndex={0}
          autoplay={true}
          infinite
        > */}
        {images.map((image, index) => (
          <View key={index} style={tw`bg-black w-auto h-30`}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
        {/* </Carousel> */}
      </View>
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#000000",
    width: "100%",
    height: 150,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: "#000000",
    overflow: "hidden", // Prevents the image from overflowing the border radius
    borderRadius: 15, // Applies the border radius to the container
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15, // Applies the border radius to the image
  },
});
