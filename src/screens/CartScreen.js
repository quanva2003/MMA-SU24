import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { List, Stepper } from "@ant-design/react-native";
import tw from "twrnc";
const cartItems = [
  {
    id: "1",
    name: "White ring 10K synthentic STYLE",
    size: "3.9",
    price: "200",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    quantity: 1,
  },
  {
    id: "2",
    name: "White ring 20K synthentic STYLE",
    size: "4.2",
    price: "300",
    image:
      "https://cdn.pnj.io/images/thumbnails/300/300/detailed/176/sp-gnztztw000012-nhan-vang-trang-10k-dinh-da-sythertic-style-by-pnj-unisex-1.png",
    quantity: 1,
  },
];

const CartScreen = () => {
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  const handleQuantityChange = (value, id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );
    calculateTotalPrice(updatedCartItems);
  };

  const calculateTotalPrice = (items = cartItems) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity> */}
      <Text style={styles.header}>Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSize}>Size: {item.size}</Text>
              <Text style={styles.itemPrice}>Price: {item.price}$</Text>
              <View style={styles.quantityContainer}>
                {/* <Icon name="remove" size={24} color="#fff" />
                <Text style={styles.quantityText}>1</Text>
                <Icon name="add" size={24} color="#fff" /> */}
                <Stepper
                  max={10}
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(value) => handleQuantityChange(value, item.id)}
                  inputStyle={tw`text-white`}
                />
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: {totalPrice}$</Text>
        <Button title="BUY " onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    marginTop: 30,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSize: {
    color: "#aaa",
    fontSize: 14,
  },
  itemPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  quantityContainer: {
    width: "35%",
    marginTop: 5,
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#555",
    paddingVertical: 10,
    alignItems: "center",
  },
  totalText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CartScreen;
