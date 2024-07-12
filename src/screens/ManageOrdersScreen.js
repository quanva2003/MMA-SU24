import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Card, Button } from "react-native-elements";
import tw from "twrnc";
import moment from "moment"; // Import moment for date comparison

const orders = [
  {
    transactionId: "123456",
    price: "$100",
    deliveryRequired: true,
    status: "Delivered",
    date: "2024-07-11",
    avatar:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    quantity: 2,
  },
  {
    transactionId: "789012",
    price: "$200",
    deliveryRequired: false,
    status: "Pending",
    date: "2024-07-11",
    avatar:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    quantity: 1,
  },
  {
    transactionId: "345678",
    price: "$150",
    deliveryRequired: true,
    status: "Shipped",
    date: "2024-07-11",
    avatar:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    quantity: 3,
  },
  {
    transactionId: "901234",
    price: "$250",
    deliveryRequired: true,
    status: "Delivered",
    date: "2024-07-11",
    avatar:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    quantity: 1,
  },
  {
    transactionId: "567890",
    price: "$300",
    deliveryRequired: false,
    status: "Cancelled",
    date: "2024-07-11",
    avatar:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    quantity: 4,
  },
  {
    transactionId: "012345",
    price: "$350",
    deliveryRequired: true,
    status: "Pending",
    date: "2024-07-11",
    avatar:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    quantity: 2,
  },
  {
    transactionId: "012345",
    price: "$350",
    deliveryRequired: true,
    status: "Pending",
    date: "2024-07-11",
    avatar:
      "https://cdn.pnj.io/images/image-update/2022/hot-categories/trang-suc-bac.png",
    quantity: 2,
  },
];

const ManageOrdersScreen = () => {
  const [tab, setTab] = useState("upcoming");
  const navigate = useNavigation();

  // Filter orders based on the selected tab
  const today = moment().startOf("day"); // Get today's date at the start of the day
  const filteredOrders = orders.filter((order) => {
    const orderDate = moment(order.date, "YYYY-MM-DD").startOf("day");
    if (tab === "upcoming") {
      return orderDate.isSameOrAfter(today);
    } else if (tab === "past") {
      return orderDate.isBefore(today);
    }
  });

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
            style={tw`grow flex items-center py-2 border-b-2 ${
              tab === "upcoming" ? "border-white" : "border-stone-800"
            }`}
          >
            <Text
              style={tw`${
                tab === "upcoming" ? "text-white" : "text-stone-600"
              }`}
            >
              Upcoming orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab("past")}
            style={tw`grow flex items-center py-2 border-b-2 ${
              tab === "past" ? "border-white" : "border-stone-800"
            }`}
          >
            <Text
              style={tw`${tab === "past" ? "text-white" : "text-stone-600"}`}
            >
              Past Orders
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`px-4`}>
          {filteredOrders.length === 0 ? (
            <Text style={tw`text-white text-center mt-8`}>
              No orders found.
            </Text>
          ) : (
            filteredOrders.map((order, index) => (
              <Card key={index} containerStyle={tw`bg-stone-800 border-0`}>
                <View style={tw`flex-row mb-2`}>
                  <Text style={tw`text-white`}>
                    Transaction ID: {order.transactionId}
                  </Text>

                  <Text style={tw`text-white`}>
                    Delivery Required: {order.deliveryRequired ? "Yes" : "No"}
                  </Text>
                </View>
                <Card.Divider />
                <View>
                  <Text style={tw`text-white`}>Dia chi nhan hang</Text>
                  <Text style={tw`text-white`}>email</Text>
                  <Text style={tw`text-white`}>phone number</Text>
                  <Text style={tw`text-white`}>address</Text>
                </View>
                <Card.Divider />

                <View style={tw`flex-row mb-2`}>
                  <Image
                    style={tw`w-16 h-16 rounded-lg`}
                    resizeMode="cover"
                    source={{ uri: order.avatar }}
                  />
                  <View style={tw`flex-col`}>
                    <Text style={tw`text-white ml-5`}>Product Name</Text>

                    <View style={tw`ml-4 flex-row`}>
                      <Text style={tw`text-white ml-1 mr-36`}>Size</Text>
                      <Text style={tw`text-white`}>
                        x{order.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
                <Card.Divider />
                <View>
                  <Text style={tw`text-white text-right`}>Price: {order.price}</Text>
                </View>

                <Card.Divider />
                <View>
                  <Text style={tw`text-white`}>Status: {order.status}</Text>
                </View>

                <Card.Divider />
                <View style={tw`flex-row justify-between mt-2`}>
                  <Button
                    title="Completed"
                    buttonStyle={tw`bg-green-500 px-4 py-2 rounded-md`}
                    titleStyle={tw`text-white`}
                  />
                  <Button
                    title="Not Completed"
                    buttonStyle={tw`bg-red-500 px-4 py-2 rounded-md`}
                    titleStyle={tw`text-white`}
                  />
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageOrdersScreen;

{
  /* <Text style={tw`text-white`}>Transaction ID: {order.transactionId}</Text> */
}
{
  /* <Text style={tw`text-white`}>Status: {order.status}</Text> */
}
{
  /* <Text style={tw`text-white`}>Date: {order.date}</Text> */
}
