import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { Stepper } from "@ant-design/react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { Icon } from "react-native-elements";

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCartItems();
    });

    return unsubscribe;
  }, [navigation]);
  const fetchCartItems = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      const token = await AsyncStorage.getItem("userToken");

      if (!email || !token) {
        Alert.alert("Please log in to view your cart.");
        return;
      }

      const userIdResponse = await axios.get(
        `http://10.0.2.2:8000/api/users/getUser/${email}`
      );
      const userId = userIdResponse.data.user._id;

      const cartResponse = await axios.get(
        `http://10.0.2.2:8000/api/carts/user/${userId}`
      );
      const cartItems = cartResponse.data;
      console.log(cartItems);
      const productDetailsPromises = cartItems.map(async (item) => {
        const productResponse = await axios.get(
          `http://10.0.2.2:8000/api/products/${item.productId}`
        );
        return {
          ...item,
          product: productResponse.data,
        };
      });

      const cartItemsWithProductDetails = await Promise.all(
        productDetailsPromises
      );
      setCartItems(cartItemsWithProductDetails);
      console.log("haha", cartItemsWithProductDetails);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      Alert.alert("Error", "Failed to fetch cart items. Please try again.");
    }
  };

  useEffect(() => {
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  const handleQuantityChange = (value, id) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: value } : item
    );
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:8000/api/carts/delete/${id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      Alert.alert("Error", "Failed to delete cart item. Please try again.");
    }
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>No products added to cart.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image
                source={{ uri: item.product.image[0] }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>
                  {truncateText(item.product.productName, 4)}
                </Text>
                <Text style={styles.itemSize}>Size: {item.size}</Text>
                <Text style={styles.itemPrice}>
                  Price: {item.product.price}$
                </Text>
                <View style={styles.quantityContainer}>
                  <Stepper
                    max={10}
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(value) => handleQuantityChange(value, item._id)}
                    inputStyle={tw`text-white`}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => deleteCartItem(item._id)}>
                <Icon type="antdesign" name="delete" color={"red"} size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: {totalPrice}$</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.buyBtn}
          >
            <Text style={tw`text-white font-bold text-lg`}>BUY IT</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to proceed without choosing size?
            </Text>
            <View style={styles.modalFooter}>
              <Pressable
                style={[styles.button, styles.btnClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.btnConfirm]}
                onPress={() => {
                  navigation.navigate("ChooseNi");
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
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
    color: "#FFDE4D",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    color: "#FFDE4D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buyBtn: {
    backgroundColor: "#212121",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "40%",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  btnClose: {
    backgroundColor: "#999999",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  btnConfirm: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  emptyCartText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CartScreen;
