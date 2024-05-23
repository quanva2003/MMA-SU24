// CartScreen.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
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

const cartItems = [
  {
    id: "1",
    name: "2,99 Karat Pırlanta Yüzük",
    size: "Boyut: 3.5",
    price: "10.750 ₺",
    image: require("../../assets/LOGO.png"), // replace with your image path
  },
  {
    id: "2",
    name: "Sevgililer gününe özel hediye bileklik",
    size: "",
    price: "0 ₺",
    image: require("../../assets/LOGO.png"), // replace with your image path
  },
];

const CartScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.header}>Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSize}>{item.size}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <View style={styles.quantityContainer}>
                <Icon name="remove" size={24} color="#fff" />
                <Text style={styles.quantityText}>1</Text>
                <Icon name="add" size={24} color="#fff" />
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Toplam 10.750 ₺</Text>
        <Button title="Sepeti Onayla" onPress={() => {}} />
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
    flexDirection: "row",
    alignItems: "center",
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
