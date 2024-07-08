import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const data = [
  {
    id: "1",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/bong-tai-kim-cuong.png",
    label: "Earring",
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
      "https://images.ctfassets.net/7m8i36sp5l90/2OjntdC41RkFSwyp96bD6U/ffeaf63f154c47cf3d102f1c7ba59be1/forever-gifts_thumb2.jpg",
    label: "Watch",
  },
  {
    id: "5",
    image:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    label: "Necklace",
  },
];

const ChooseJewelry = ({ onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (itemId) => {
    setSelectedItem(itemId);
    onSelectItem(itemId); // Notify parent component
  };

  const renderItem = (item, index) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedItem === item.id && styles.selectedItem,
      ]}
      onPress={() => handleItemPress(item.id)}
      key={item.id}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemLabel}>{item.label}</Text>
      {selectedItem === item.id && (
        <View style={styles.checkContainer}>
          <Icon
            name="check-circle"
            type="font-awesome"
            color="#212121"
            size={30}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {data.slice(0, 3).map((item, index) => renderItem(item, index))}
      </View>
      <View style={styles.row}>
        {data.slice(3).map((item, index) => renderItem(item, index + 3))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 15,
    position: "relative",
    opacity: 1,
  },
  selectedItem: {
    opacity: 0.5,
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
  checkContainer: {
    position: "absolute",
    top: "25%",
    left: "38%",
  },
});

export default ChooseJewelry;
