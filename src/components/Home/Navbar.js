import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

const Navbar = () => {
  const navigation = useNavigation();

  const goToShoppingCart = () => {
    navigation.navigate("CartScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.logo}>Kicusho</Text>
        <View style={styles.searchBoxContainer}>
          <Icon
            type="ionicons"
            name="search"
            color="white"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBox}
            placeholder="Search..."
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => navigation.navigate("CartScreen")}
        >
          <Icon type="MaterialIcons" name="shopping-cart" color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    paddingLeft: 10,
    color: "#FFFFFF",
  },
  searchIcon: {
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    paddingVertical: 5,
    paddingRight: 10,
    color: "#FFFFFF",
  },
  cartContainer: {
    padding: 10,
    borderColor: "black",
  },
});

export default Navbar;
