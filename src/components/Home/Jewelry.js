import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const data = [
  {
    id: "1",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/bong-tai-kim-cuong.png",
    label: "Bông Tai ",
  },
  {
    id: "2",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/nhan-kim-cuong.png",
    label: "Nhẫn Kim Cương",
  },
  {
    id: "3",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/vong-lac-tay-bac.png",
    label: "Lắc - Vòng Tay",
  },
  {
    id: "4",
    image:
      "https://images.ctfassets.net/7m8i36sp5l90/2OjntdC41RkFSwyp96bD6U/ffeaf63f154c47cf3d102f1c7ba59be1/forever-gifts_thumb2.jpg",
    label: "Đồng Hồ",
  },
  {
    id: "5",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    label: "Dây Chuyền",
  },
  {
    id: "6",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/nhan-cuoi.png",
    label: "Nhẫn Cưới",
  },
];

const Jewelry = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemLabel}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hot Search</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  itemContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemLabel: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
});

export default Jewelry;
