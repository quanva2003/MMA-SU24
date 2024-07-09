import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Navbar from "../components/Home/Navbar";
import CarouselComponent from "../components/Home/Carousel";
import Category from "../components/Home/TopProduct";
import NewProduct from "../components/Home/NewProduct";
import Jewelry from "../components/Home/Jewelry";
import NewCollection from "../components/Home/NewCollection";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView>
        <CarouselComponent />
        <Jewelry />
        <Category />
        <NewProduct />
        <NewCollection />
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
