import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Sample data for news
const newsItems = [
  {
    id: "1",
    title: "Latest Trends in Diamond Jewelry",
    description: "Discover the newest trends in diamond jewelry for 2024...",
  },
  {
    id: "2",
    title: "How to Choose the Perfect Diamond",
    description:
      "Tips and tricks for selecting the best diamond for your needs...",
  },
  // Add more news items here
];

// QuestionSection Component
const QuestionSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Question about Diamonds</Text>
      <Text style={styles.question}>
        What is the difference between a diamond and a moissanite?
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

// NewsSection Component
const NewsSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Diamond News</Text>
      <FlatList
        data={newsItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

// News Component
const News = () => {
  return (
    <View style={styles.container}>
      <QuestionSection />
      <NewsSection />
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  question: {
    color: "#aaa",
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#555",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  newsItem: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  newsDescription: {
    color: "#aaa",
    fontSize: 14,
  },
});

export default News;
