import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

export default function OrdersScreen() {
  const [tab, setTab] = useState("upcoming");
  const [user, setUser] = useState(null);
  const navigate = useNavigation();

  const fetchOrders = async () => {
    await AsyncStorage.getItem("user").then(async (value) => {
      const currentUser = JSON.parse(value);
      setUser(currentUser);

      await axios
        .get(`http://localhost:8000/api/orders/user/${currentUser._id}`)
        .then((res) => {
          console.log("Orders: ", res.data);
        });
    });
  };
  return (
    <View style={tw`flex-1`}>
      <SafeAreaView
        style={tw`absolute top-8 left-0 right-0 w-full flex flex-row justify-between px-4 pt-2 z-20`}
      >
        <TouchableOpacity
          style={tw`items-start`}
          onPress={() => navigate.goBack()}
        >
          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
            style={tw`bg-gray-800 p-1 rounded-xl`}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView style={tw`flex-1 mt-7.5 bg-stone-950`}>
        <View style={tw`w-full flex items-start pt-12 px-8`}>
          <Text style={tw`text-white text-[2rem] font-bold pb-2`}>ORDERS</Text>
        </View>

        <View style={tw`w-full flex-row items-center px-4 pt-4`}>
          <TouchableOpacity
            onPress={() => setTab("upcoming")}
            style={tw`grow flex items-center py-2 border-b-2 ${tab === "upcoming" ? "border-white" : "border-stone-800"
              }`}
          >
            <Text
              style={tw`${tab === "upcoming" ? "text-white" : "text-stone-600"
                }`}
            >
              Upcoming orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab("past")}
            style={tw`grow flex items-center py-2 border-b-2 ${tab === "past" ? "border-white" : "border-stone-800"
              }`}
          >
            <Text
              style={tw`${tab === "past" ? "text-white" : "text-stone-600"}`}
            >
              Past Orders
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
