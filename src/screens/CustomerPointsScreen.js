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
        style={tw`items-start`}
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
  customerCard: {
    backgroundColor: "#1c1c1c",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  customerName: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  customerPoints: {
    color: "#fff",
    fontSize: 14,
  },
});

export default CustomerPointsScreen;