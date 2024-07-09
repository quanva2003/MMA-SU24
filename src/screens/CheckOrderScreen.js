import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';


const mockCustomerOrders = [
  { id: '1', customerName: 'John Doe', orderDetails: '1 carat Round Brilliant' },
  { id: '2', customerName: 'Jane Smith', orderDetails: '1.5 carat Princess Cut' },
  { id: '3', customerName: 'Michael Johnson', orderDetails: '2 carat Emerald Cut' },
];

function CheckOrderScreen({ route }) {
  const navigate = useNavigation();
  const { diamond } = route.params || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={tw`items-start`}
        onPress={() => navigate.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.topHeader}>Check Order</Text>
      {diamond && (
        <View style={styles.diamondDetails}>
          <Image source={{ uri: diamond.image }} style={styles.productImage} />
          <Text style={styles.productDescription}>Type: {diamond.type}</Text>
          <Text style={styles.productDescription}>Carat: {diamond.carat}</Text>
          <Text style={styles.productDescription}>Size: {diamond.size}</Text>
          <Text style={styles.productDescription}>Price: ${diamond.price}</Text>
          <Text style={styles.productDescription}>Status: {diamond.status}</Text>
        </View>
      )}
      <Text style={styles.ordersHeader}>Customer Orders</Text>
      <FlatList
        data={mockCustomerOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>{item.customerName} - {item.orderDetails}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  topHeader: {
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 20,
  },
  diamondDetails: {
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productDescription: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  ordersHeader: {
    color: "#ffffff",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 20,
  },
  orderItem: {
    backgroundColor: "#1c1c1c",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  orderText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CheckOrderScreen;
