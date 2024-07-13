import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://10.0.2.2:8000/api/users/login", {
        email: email,
        password: password,
      });
      console.log("Success", res.data);
      const decoded = jwtDecode(res.data.token).user;
      console.log("Decoded: ", decoded);
      await AsyncStorage.setItem("user", JSON.stringify(decoded));
      await AsyncStorage.setItem("userToken", res.data.token);
      await AsyncStorage.setItem("userEmail", email);
      navigation.navigate("Main");
    } catch (err) {
      console.error("Error", err);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };

  // const handleLogin = () => {
  //   navigation.navigate("Main");
  // }

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLinkText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#FF6F61",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
  },
  signUpLinkText: {
    color: "#FF6F61",
    fontSize: 16,
  },
});

export default LoginScreen;
