import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Navbar from "../components/Home/Navbar";
import BasicCarouselExample from "../components/Home/Carousel";
import Category from "../components/Home/Category";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView>
        <BasicCarouselExample />
        <Category />
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
