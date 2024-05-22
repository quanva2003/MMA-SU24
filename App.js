import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import HomeScreen from "./src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import ProductScreen from "./src/screens/ProductScreen";
import PricesScreen from "./src/screens/PricesScreen";
import NewsScreen from "./src/screens/NewsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#cccccc",
            tabBarStyle: { backgroundColor: "#000000" },
          }}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Product"
            component={ProductScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type="Ionicons" name="diamond" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Prices"
            component={PricesScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type="MaterialIcons" name="price-change" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type="MaterialIcons" name="home" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="News"
            component={NewsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type="MaterialIcons" name="newspaper" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type="antdesign" name="user" color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
