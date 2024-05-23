import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Navbar from "../components/Home/Navbar";
import CarouselComponent from "../components/Home/Carousel";
import Category from "../components/Home/Category";
import NewProduct from "../components/Home/NewProduct";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView>
        <CarouselComponent />
        <Category />
        <NewProduct />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#000000",
  },
});

export default HomeScreen;
