import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import Navbar from "../components/Home/Navbar";
import CarouselComponent from "../components/Home/Carousel";
import Category from "../components/Home/TopProduct";
import NewProduct from "../components/Home/Product";
import Jewelry from "../components/Home/Jewelry";
import NewCollection from "../components/Home/NewCollection";

const HomeScreen = () => {
  const components = [
    // { key: "Navbar", component: <Navbar /> },
    { key: "CarouselComponent", component: <CarouselComponent /> },
    { key: "Jewelry", component: <Jewelry /> },
    // { key: 'Category', component: <Category /> },
    { key: "NewProduct", component: <NewProduct /> },
    // { key: "NewCollection", component: <NewCollection /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <FlatList
        data={components}
        renderItem={({ item }) => (
          <View style={styles.componentContainer}>{item.component}</View>
        )}
        keyExtractor={(item) => item.key}
        nestedScrollEnabled
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#000000",
  },
  componentContainer: {
    marginBottom: 10,
  },
});

export default HomeScreen;
