import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AccountScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    email: "",
    name: "",
    token: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        const token = await AsyncStorage.getItem("userToken");
        if (email && token) {
          setProfileData((prevState) => ({ ...prevState, email, token }));
          const response = await axios.get(
            `http://10.0.2.2:8000/api/users/getUser/${email}`
          );
          const name = response.data.user.name;
          console.log("jo:", response.data.user.name);
          setProfileData((prevState) => ({ ...prevState, name }));
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage or API", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userEmail");
      console.log("Logout successful");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout", error);
      Alert.alert(
        "Logout Failed",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/30/9f/ec/309fecf07c6707f3041164171a3510b3.jpg",
          }} // Replace with actual image URL
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileRole}>Golden Break</Text>
          <TouchableOpacity>
            <Text style={styles.changeProfileText}>Change profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.reportsContainer}>
        <Text style={styles.reportsTitle}>My Reports:</Text>
        <View style={styles.reportsGrid}>
          <TouchableOpacity style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <Icon type="entypo" name="ticket" color="#ffffff" />
              <Text style={styles.reportTitle}>Voucher</Text>
            </View>
            <Text style={styles.reportDescription}>
              Some short description of this type of report.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.reportCard, styles.highlightedCard]}>
            <View style={styles.cardHeader}>
              <Icon type="entypo" name="shopping-cart" color="#ffffff" />
              <Text style={styles.reportTitle}>Đơn hàng</Text>
            </View>
            <Text style={styles.reportDescription}>
              Some short description of this type of report.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <Icon type="entypo" name="ticket" color="#ffffff" />
              <Text style={styles.reportTitle}>Điểm</Text>
            </View>
            <Text style={styles.reportDescription}>
              Some short description of this type of report.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <Icon type="entypo" name="heart" color="#ffffff" />
              <Text style={styles.reportTitle}>Yêu thích</Text>
            </View>
            <Text style={styles.reportDescription}>
              Some short description of this type of report.
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon type="entypo" name="log-out" color="#ffffff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    marginTop: 30,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileRole: {
    fontSize: 18,
    color: "#888",
    marginBottom: 5,
  },
  changeProfileText: {
    color: "#fff",
    fontSize: 16,
  },
  reportsContainer: {
    marginTop: 20,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  reportsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  reportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  reportCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  highlightedCard: {
    backgroundColor: "#444",
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  reportDescription: {
    fontSize: 14,
    color: "#bbb",
  },
  logoutButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    backgroundColor: "#212121",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AccountScreen;
