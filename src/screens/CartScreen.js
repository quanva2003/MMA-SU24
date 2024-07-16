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
import CurrencySplitter from "../assistants/currencySpliter";

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCartItems();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchCartItems = async () => {
    await AsyncStorage.getItem("user")
      .then(async (value) => {
        const userData = JSON.parse(value);
        await axios
          .get(`http://10.0.2.2:8000/api/carts/user/${userData._id}`)
          .then((res) => {
            console.log("cart", res.data);
            setCartItems(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Authentication is required",
          "Please sign in to start shopping!",
          [
            {
              text: "Cancel",
              isPreferred: false,
              style: "destructive",
              onPress: () => {
                navigation.navigate("Cart");
              },
            },
            {
              text: "Sign in",
              isPreferred: true,
              style: "default",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ]
        );
      });
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
      (sum, item) => sum + item.productId.price * item.quantity,
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
        <View style={tw`items-center gap-4 mt-24`}>
          <Icon type="font-awesome-5" name="box-open" color="#fff" size={96} />
          <Text style={tw`text-gray-500 text-sm italic`}>
            There is no product yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image
                source={{ uri: item.productId.image[0] }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>
                  {truncateText(item.productId.productName, 4)}
                </Text>
                <Text style={styles.itemSize}>Size: {item.size}</Text>
                <Text style={styles.itemPrice}>
                  $ {CurrencySplitter(item.productId.price)}
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
          <View>
            <Text style={tw`text-yellow-100 text-xs`}>Total</Text>
            <Text style={styles.totalText}>
              $ {CurrencySplitter(totalPrice)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Checkout", { products: cartItems })
            }
            style={styles.buyBtn}
          >
            <Text style={tw`text-white font-bold`} numberOfLines={1}>
              PROCEED TO CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <Modal
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
      </Modal> */}
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
  itemDescription: {
    color: "#aaa",
    fontSize: 14,
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
    paddingTop: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
  },
  totalText: {
    color: "#FFDE4D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "teal",
    paddingVertical: 12,
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
});

export default CartScreen;
