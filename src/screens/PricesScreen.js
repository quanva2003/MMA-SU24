import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  CheckBox,
  Image,
  TouchableOpacity,
} from "react-native";
import { Checkbox, Slider } from "@ant-design/react-native";

const diamonds = [
  { size: 3.9, color: "D", clarity: "VVS1" },
  { size: 4.5, color: "D", clarity: "VVS1" },
  { size: 4.6, color: "D", clarity: "VVS1" },
  { size: 4.1, color: "D", clarity: "VVS1" },
  { size: 4.5, color: "E", clarity: "VVS1" },
  { size: 3.8, color: "E", clarity: "VVS1" },
  { size: 3.9, color: "E", clarity: "VVS1" },
  { size: 3.6, color: "F", clarity: "VVS1" },
  { size: 4.2, color: "F", clarity: "VVS1" },
  { size: 3.7, color: "F", clarity: "VVS1" },
  { size: 4.0, color: "G", clarity: "VVS1" },
  { size: 4.3, color: "G", clarity: "VVS1" },
];

const PriceComponent = () => {
  const [color, setColor] = useState("F");
  const [clarity, setClarity] = useState("VS1");
  const [size, setSize] = useState([3.6, 10.2]);
  const [filteredDiamonds, setFilteredDiamonds] = useState([]);

  const colorLabels = ["F", "G", "H"];
  const clarityLabels = ["VS1", "VS", "I2", "SI1", "SI"];
  const filterDiamonds = () => {
    console.log("color:", color);
    console.log("clarity:", clarity);
    console.log("size range:", size);
    const results = diamonds.filter(
      (diamond) =>
        diamond.size >= size[0] &&
        diamond.size <= size[1] &&
        diamond.color === color &&
        diamond.clarity === clarity
    );
    console.log(results);
    setFilteredDiamonds(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PRICES OF DIAMOND</Text>

      <Text style={styles.label}>Màu sắc:</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={colorLabels.length - 1}
        step={0.5}
        value={color}
        onChange={(value) => {
          setColor(colorLabels[Math.round(value * 2)]);
        }}
      />
      <View style={styles.sliderLabels}>
        {colorLabels.map((label, index) => (
          <Text key={index} style={styles.sliderLabel}>
            {label}
          </Text>
        ))}
      </View>

      <Text style={styles.label}>Độ tinh khiết:</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={clarityLabels.length - 1}
        step={0.25}
        value={clarity}
        onChange={(value) => {
          setClarity(clarityLabels[Math.round(value * 4)]);
        }}
      />
      <View style={styles.sliderLabels}>
        {clarityLabels.map((label, index) => (
          <Text key={index} style={styles.sliderLabel}>
            {label}
          </Text>
        ))}
      </View>

      <Text style={styles.label}>Kích thước (mm/ly):</Text>
      <Slider
        style={styles.slider}
        minimumValue={7}
        maximumValue={10}
        step={1 / 3}
        value={size[1]}
        onChange={(val) => {
          value = Math.round((3.6 + val * 6.6) * 10) / 10;
          setSize([size[0], value]);
        }}
      />
      <View style={styles.sizeLabels}>
        <Text style={{ color: "#fff" }}>{size[0].toFixed(1)}</Text>
        <Text style={{ color: "#fff" }}>{size[1].toFixed(1)}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={filterDiamonds} style={styles.resultBtn}>
          <Text style={{ color: "#fff", fontWeight: 700 }}>SHOW RESULTS</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title="Show Results" onPress={filterDiamonds} /> */}

      {filteredDiamonds.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results:</Text>
          <FlatList
            data={filteredDiamonds}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultRow}>
                <Image
                  source={{
                    uri: "https://i.natgeofe.com/k/905d83a3-45ed-46d1-8717-833d30b8c964/diamond-polished_4x3.jpg",
                  }}
                  style={styles.icon}
                />
                <Text style={styles.resultText}>{item.size}</Text>
                <Text style={styles.resultText}>{item.color}</Text>
                <Text style={styles.resultText}>{item.clarity}</Text>
                <Checkbox />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    marginTop: 30,
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: "#fff",
  },
  slider: {
    width: "100%",
    height: 40,
    color: "#fff",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#fff",
  },
  sliderLabel: {
    fontSize: 12,
    color: "#fff",
  },
  sizeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    color: "#fff",
  },
  resultsContainer: {
    marginTop: 20,
    color: "#fff",
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  resultText: {
    flex: 1,
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 10,
  },
  resultBtn: {
    backgroundColor: "#212121",
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 30,
  },
});

export default PriceComponent;
