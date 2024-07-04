import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const ProductScreen = () => {
  const { params } = useRoute();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex justify-between items-center px-4">
          <TouchableOpacity>
            <Text>&gt;</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <Text className="text-xl">ProductScreen</Text>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
