import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import tw from "twrnc";
import MixMatch from "../components/News/MixMatch";
import Wedding from "../components/News/Wedding";
import GiftSuggestion from "../components/News/GiftSuggestion";
import JewerlyKnowledge from "../components/News/JewerlyKnowledge";
import Questions from "../components/News/Questions";

const sections = [
  { title: "Mix Match", component: <MixMatch /> },
  { title: "Wedding", component: <Wedding /> },
  { title: "Gift", component: <GiftSuggestion /> },
  { title: "Know", component: <JewerlyKnowledge /> },
  { title: "Question", component: <Questions /> },
];

const News = () => {
  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          {item.component}
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 20,
    marginTop: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default News;
