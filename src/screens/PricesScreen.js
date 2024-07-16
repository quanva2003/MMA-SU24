import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Slider } from "@ant-design/react-native";
import axios from "axios";
import CurrencySplitter from "../assistants/currencySpliter";
import { useNavigation } from "@react-navigation/native";

const PriceComponent = () => {

  const colorLabels = ["F", "G", "H"];
  const clarityLabels = ["VS1", "VS", "I2", "SI1", "SI"];
  const navigate = useNavigation();
  const [color, setColor] = useState(colorLabels[0]);
  const [clarity, setClarity] = useState(clarityLabels[0]);
  const [size, setSize] = useState([0.2, 2.0]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/api/products")
      .then((response) => {
        setProductData(response.data);
        console.log("all product:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filterProducts = () => {

    console.log("color:", color);
    console.log("clarity:", clarity);
    console.log("size range:", size);
    const results = productData.filter(
      (product) =>
        product.diamondId.carat >= size[0] &&
        product.diamondId.carat <= size[1] &&
        product.diamondId.color === color &&
        product.diamondId.clarity === clarity
    );
    console.log(results);
    setFilteredProducts(results);
  };

  console.log(filteredProducts);
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PRICES OF DIAMOND</Text>

      <Text style={styles.label}>Color:</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={colorLabels.length - 1}
        step={0.5}
        value={colorLabels.indexOf(color)}
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

      <Text style={styles.label}>Clarity:</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={clarityLabels.length - 1}
        step={0.25}

        value={clarityLabels.indexOf(clarity)}



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

      <Text style={styles.label}>Carat:</Text>
      <Slider
        style={styles.slider}
        minimumValue={0.2}
        maximumValue={2}
        step={0.1}
        value={size[1]}
        onChange={(val) => {
          setSize([size[0], val.toFixed(2) * 10 * 0.18 + size[0]]);
        }}
      />
      <View style={styles.sizeLabels}>
        <Text style={{ color: "#fff" }}>{size[0].toFixed(2)}</Text>
        <Text style={{ color: "#fff" }}>{size[1].toFixed(2)}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={filterProducts} style={styles.resultBtn}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>SHOW RESULTS</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultsTitle}>Results:</Text>
      {filteredProducts.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {filteredProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultRow}
              onPress={() => navigate.navigate("ProductDetail", { product })}
              // onPress={() => console.log(item.image)}
            >
              <Image
                source={{
                  uri: product.image[0],
                }}
                style={styles.icon}
              />
              <Text style={styles.resultText}>
                {truncateText(product.productName, 4)}
              </Text>
              <Text style={styles.resultText}>
                ${CurrencySplitter(product.price)}
              </Text>
              <Text style={styles.resultText}>{product.diamondId.type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    marginTop: 12,
    color: "#fff",
    maxHeight: 350,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    justifyContent: "space-between",
  },
  resultText: {
    fontSize: 14,
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
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
