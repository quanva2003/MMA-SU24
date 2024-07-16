import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import CurrencySplitter from "../assistants/currencySpliter";
import dateFormat from "../assistants/date.format";

export default function OrderDetail({ route }) {
  const order = route.params.order;
  const items = route.params.items;
  const [statusColor, setStatusColor] = useState("gray-500");

  useEffect(() => {
    switch (order.status) {
      case "IN DELIVERY": {
        setStatusColor("sky-700");
        break;
      }
      case "COMPLETED": {
        setStatusColor("green-700");
        break;
      }
      case "CANCELED": {
        setStatusColor("red-700");
        break;
      }
    }
  }, [order]);

  console.log("Order: ", order);
  console.log("Items: ", items);

  const navigate = useNavigation();

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

      <View style={tw`flex-1 mt-7.5 bg-stone-950`}>
        <View style={tw`pt-16 px-4 pb-4 flex-row justify-between items-center`}>
          <Text style={tw`text-white text-[1.2rem] font-bold pb-2`}>
            #{order.transactionId}
          </Text>
          <Text
            style={tw`px-8 py-2 bg-${statusColor} font-black rounded-full text-xl text-white`}
          >
            {order.status}
          </Text>
        </View>

        <View style={tw`px-4 gap-1 pb-4`}>
          <Text style={tw`text-gray-500 text-xs font-bold pb-2`}>
            GENERAL INFORMATION
          </Text>
          <View style={tw`flex-row items-start gap-3`}>
            <View style={tw`flex-row items-center gap-2 mt-[2px]`}>
              <Icon type="antdesign" name="contacts" color="#fff" size={12} />
              <Text style={tw`text-gray-500 text-xs`}>Contact: </Text>
            </View>
            <Text style={tw`text-gray-300 text-sm`}>
              {order.deliveryInfo.email}&ensp;&#8226;&ensp;
              {order.deliveryInfo.phoneNumber}
            </Text>
          </View>

          <View style={tw`flex-row items-start gap-2`}>
            <View style={tw`flex-row items-center gap-2 mt-[2px]`}>
              <Icon
                type="ionicon"
                name="location-sharp"
                color="#fff"
                size={12}
              />
              <Text style={tw`text-gray-500 text-xs`}>
                {order.deliveryRequired ? "Address: " : "Direct pick up"}
              </Text>
            </View>

            <Text
              style={tw`${
                order.deliveryRequired === true ? "flex-1" : "hidden"
              } flex-wrap text-gray-300 text-sm `}
            >
              {order.deliveryInfo.address}
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-3`}>
            <View style={tw`flex-row items-center gap-2 mt-[2px]`}>
              <Icon type="antdesign" name="calendar" color="#fff" size={12} />
              <Text style={tw`text-gray-500 text-xs`}>Ordered at: </Text>
            </View>
            <Text style={tw`text-gray-300 text-sm`}>
              {dateFormat(order.createdAt, "mmmm dd, yyyy")}&ensp;&#8226;&ensp;
              {dateFormat(order.createdAt, "HH:MM")}
            </Text>
          </View>
        </View>

        <View style={tw`flex items-start gap-1 pt-4`}>
          <Text style={tw`text-gray-500 text-xs px-4 font-bold`}>ITEMS</Text>
          <ScrollView style={tw`w-full pt-2 max-h-64`}>
            <View style={tw`w-full flex border-t border-white gap-2`}>
              {items.map((item) => {
                return (
                  <TouchableOpacity
                    key={item._id}
                    style={tw`w-full flex-row gap-2 py-2 border-b border-gray-500`}
                  >
                    <Image
                      source={{ uri: item.product.image[0] }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginLeft: 5,
                      }}
                    />
                    <View style={tw`max-w-1/2 flex gap-2`}>
                      <Text style={tw`text-white text-xs`} numberOfLines={2}>
                        {item.product.productName}
                      </Text>
                      <Text style={tw`text-white text-[0.6rem] text-gray-500`}>
                        Size: {item.size}
                      </Text>
                    </View>
                    <View style={tw`flex items-center gap-1 ml-auto mr-2`}>
                      <Text style={tw`text-gray-400 text-[0.6rem]`}>
                        Quantity: {item.quantity}
                      </Text>
                      <Text style={tw`text-red-300`}>
                        $ {CurrencySplitter(item.price * item.quantity)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View style={tw`px-4 pt-4`}>
          <Text style={tw`text-gray-500 text-xs font-bold pb-4`}>TOTAL</Text>
          <View style={tw`w-full flex-row justify-between items-center`}>
            <Text style={tw`text-gray-500 text-xs pb-2`}>Subtotal</Text>
            <Text style={tw`text-gray-500 text-xs pb-2`}>
              $ {CurrencySplitter(order.total)}
            </Text>
          </View>
          <View style={tw`w-full flex-row justify-between items-center`}>
            <Text style={tw`text-gray-500 text-xs pb-2`}>Delivery cost</Text>
            <Text style={tw`text-gray-500 text-xs pb-2`}>$ 0</Text>
          </View>
          <View style={tw`w-full flex-row justify-between items-center`}>
            <Text style={tw`text-gray-500 text-xs pb-2`}>Discount</Text>
            <Text style={tw`text-gray-500 text-xs pb-2`}>$ 0</Text>
          </View>
          <View style={tw`border-t border-gray-300 pb-4`}></View>
          <View style={tw`w-full flex-row justify-between items-center`}>
            <Text style={tw`text-gray-500 text-xs pb-2`}>Total</Text>
            <Text style={tw`text-white text-lg font-bold pb-2`}>
              $ {CurrencySplitter(order.total)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
