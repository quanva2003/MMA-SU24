import React, { useState } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';

const diamondsData = [
  {
    id: '1',
    user: 'John',
    type: 'Round Brilliant',
    carat: '1.0',
    size: '6.5mm',
    image: 'https://cdn.pnj.io/images/detailed/203/sp-gnddddw012437-nhan-kim-cuong-vang-trang-14k-pnj-1.png',
    price: '5000',
    status: 'Available',
    discount: '10%',
  },
  {
    id: '2',
    user: 'Jane',
    type: 'Princess Cut',
    carat: '1.5',
    size: '6.0mm',
    image: 'https://cdn.pnj.io/images/detailed/203/sp-gnddddw012437-nhan-kim-cuong-vang-trang-14k-pnj-1.png',
    price: '7000',
    status: 'Sold',
    discount: '15%',
  },
  {
    id: '3',
    user: 'Michael',
    type: 'Princess Cut',
    carat: '1.5',
    size: '6.0mm',
    image: 'https://cdn.pnj.io/images/detailed/203/sp-gnddddw012437-nhan-kim-cuong-vang-trang-14k-pnj-1.png',
    price: '7000',
    status: 'Sold',
    discount: '20%',
  },
  {
    id: '4',
    user: 'Jordan',
    type: 'Princess Cut',
    carat: '1.5',
    size: '6.0mm',
    image: 'https://cdn.pnj.io/images/detailed/203/sp-gnddddw012437-nhan-kim-cuong-vang-trang-14k-pnj-1.png',
    price: '7000',
    status: 'Sold',
    discount: '15%',
  },
];

const { width } = Dimensions.get('window');

function SaleScreen() {
  const navigation = useNavigation();

  const handleViewCustomerPoints = () => {
    navigation.navigate('CustomerPoints');
  };

  const handleItemPress = (item) => {
    navigation.navigate('ChooseNi', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topHeader}>Sale</Text>
      <FlatList
        data={diamondsData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => handleItemPress(item)}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productDescription}>{item.type}</Text>
            <Text style={styles.productDescription}>Carat: {item.carat}</Text>
            <Text style={styles.productDescription}>{item.user}</Text>
            <Text style={styles.productDescription}>Size: {item.size}</Text>
            <Text style={styles.productDescription}>Price: ${item.price}</Text>
            <Text style={[styles.productDescription, item.status === 'Available' ? styles.available : styles.sold]}>
              Status: {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="View Customer Points" onPress={handleViewCustomerPoints} color="#1c1c1c" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  topHeader: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 20,
  },
  productList: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    width: (width / 2) - 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productDescription: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  available: {
    color: '#4CAF50',
  },
  sold: {
    color: '#F44336',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default SaleScreen;