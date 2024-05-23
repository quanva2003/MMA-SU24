import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Sample data
const items = [
  {
    id: "1",
    name: "2,99 Karat Pırlanta Yüzük",
    size: "3.5",
    price: "10.750 ₺",
    image: require("../../assets/R.jpg"), // Replace with actual image path
  },
  {
    id: "2",
    name: "1,75 Karat Pırlanta Yüzük",
    size: "3.5",
    price: "9.875 ₺",
    image: require("../../assets/R.jpg"), // Replace with actual image path
  },
  {
    id: "3",
    name: "2,99 Karat Pırlanta Yüzük",
    size: "3.5",
    price: "10.750 ₺",
    image: require("../../assets/R.jpg"), // Replace with actual image path
  },
  {
    id: "4",
    name: "1,75 Karat Pırlanta Yüzük",
    size: "3.5",
    price: "9.875 ₺",
    image: require("../../assets/R.jpg"), // Replace with actual image path
  },
  {
    id: "5",
    name: "2,99 Karat Pırlanta Yüzük",
    size: "3.5",
    price: "10.750 ₺",
    image: require("../../assets/R.jpg"), // Replace with actual image path
  },
  {
    id: "6",
    name: "1,75 Karat Pırlanta Yüzük",
    size: "3.5",
    price: "9.875 ₺",
    image: require("../../assets/R.jpg"), // Replace with actual image path
  },
];

// PriceCard Component
const PriceCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.size}>Boyut: {item.size}</Text>
        <Text style={styles.delivery}>Yarın Kapında</Text>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mua di</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchBox = ({ onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#aaa" />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#aaa"
        onChangeText={onSearch}
      />
    </View>
  );
};

const PriceScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBox onSearch={setSearchTerm} />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PriceCard item={item} />}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  size: {
    color: "#aaa",
    fontSize: 14,
  },
  delivery: {
    color: "#aaa",
    fontSize: 14,
  },
  price: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#555",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default PriceScreen;
