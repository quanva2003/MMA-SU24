import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { Image } from "react-native";

export default function SuccessOrderScreen({ route }) {
  const { transactionId } = route.params;
  const navigate = useNavigation();
  const [countdown, setCountdown] = useState(10);

  const autoReturnHome = (value) => {
    if (value === -1) {
      navigate.navigate("Home");
    } else {
      setTimeout(() => {
        setCountdown(value - 1);
        autoReturnHome(value - 1);
      }, 1500);
    }
  };

  useEffect(() => {
    autoReturnHome(countdown);
  }, []);

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw`flex-1 mt-7.5 bg-stone-950`}>
        <View style={tw`flex-1 items-center justify-center mt-40`}>
          <Image
            source={{
              uri: "https://kimcuongdaquy.info/wp-content/uploads/2021/04/kim-cuong-den-front-abc-1700x956.jpg",
            }}
            style={{ width: 400, height: 200, borderRadius: 30 }}
          />
          <Text style={tw`text-white font-bold text-[2.5rem] text-center py-2`}>
            THANK YOU FOR YOUR PURCHASE
          </Text>
          <Text style={tw`text-white`}>
            Order #{transactionId} has been placed.
          </Text>
          <TouchableOpacity
            onPress={() => navigate.navigate("Home")}
            style={tw`bg-white px-8 py-2 rounded-xl my-4`}
          >
            <Text style={tw`font-semibold`}>Back home</Text>
          </TouchableOpacity>
          <Text style={tw`text-white text-xs italic`}>
            returning home in {countdown}...
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
