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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import tw from "twrnc";

const AccountScreen = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    point: 0,
  });
  const navigate = useNavigation();

  const fetchData = async () => {
    await AsyncStorage.getItem("user")
      .then(async (value) => {
        const userData = JSON.parse(value);
        await axios
          .get(`http://10.0.2.2:8000/api/users/getUser/${userData.email}`)
          .then((res) => {
            setProfileData({
              name: res.data.user.name,
              point: res.data.user.point,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Authentication is required", "Please sign in!");
      });
  };

  useEffect(() => {
    const unsubscribe = navigate.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("user");
      console.log("Logout successful");
      navigate.navigate("Login");
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
            uri: "https://i.pinimg.com/564x/f3/d1/ed/f3d1edf10d63c40e1fa06364176fa502.jpg",
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {profileData ? profileData.name : "error"}
          </Text>
        </View>
      </View>

      <View style={styles.reportsContainer}>
        <View style={styles.reportsGrid}>
          <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <Icon type="entypo" name="ticket" color="#ffffff" />
              <Text style={styles.reportTitle}>
                Point: {profileData ? profileData.point : 0}
              </Text>
            </View>
            <Text style={styles.reportDescription}>
              This point is automatically applied when purchasing to get
              discounted prices.
            </Text>
            <Text style={styles.reportDescription}>
              Every order gives 1% of the subtotal as point.
            </Text>
            <Text style={styles.reportDescription}>
              1 point is equivalent to 1 US Dollar.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigate.navigate("Orders")}
            style={[styles.reportCard, tw`bg-stone-700`]}
          >
            <View style={styles.cardHeader}>
              <Icon type="font-awesome-5" name="box" color="#ffffff" />
              <Text style={styles.reportTitle}>Orders</Text>
            </View>
            <Text style={styles.reportDescription}>
              View ongoing and past orders.
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
    borderWidth: 1,
    borderColor: "white",
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
    gap: 12,
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
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    gap: 8,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  reportDescription: {
    fontSize: 12,
    color: "#bbb",
  },
  logoutButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: "auto",
    backgroundColor: "red",
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
