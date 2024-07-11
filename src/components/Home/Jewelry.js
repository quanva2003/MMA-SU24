import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const data = [
  {
    id: "1",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/bong-tai-kim-cuong.png",
    label: "Earrings ",
  },
  {
    id: "2",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/nhan-kim-cuong.png",
    label: "Ring",
  },
  {
    id: "3",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/vong-lac-tay-bac.png",
    label: "Bracelet",
  },
  {
    id: "4",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    label: "Necklace",
  },
];

const Jewelry = () => {
  const navigate = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigate.navigate("Shell")}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shells</Text>
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
