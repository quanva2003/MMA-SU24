import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

const customerPointsData = [
  { id: '1', name: 'John Doe', points: 120 },
  { id: '2', name: 'Jane Smith', points: 200 },
];

function CustomerPointsScreen() {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={tw`items-start mb-4`}
        onPress={() => navigate.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.topHeader}>Customer Points</Text>
      <FlatList
        data={customerPointsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.customerCard}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.customerPoints}>Points: {item.points}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  topHeader: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  customerCard: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customerName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  customerPoints: {
    color: "#b0b0b0",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default CustomerPointsScreen;
