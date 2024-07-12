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
import CartScreen from "./src/screens/CartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TopProduct from "./src/screens/TopProduct";
import ProductDetail from "./src/screens/ProductDetail";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import SaleScreen from "./src/screens/SaleScreen";
import CheckOrderScreen from "./src/screens/CheckOrderScreen";
import CustomerPointsScreen from "./src/screens/CustomerPointsScreen";
import ChooseNi from "./src/screens/ChooseNi";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="CartScreen" component={CartScreen} /> */}
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#212121",
        tabBarStyle: { backgroundColor: "#000000" },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="MaterialIcons"
              name="newspaper"
              color={color}
              size={focused ? 30 : 24} // Increase size if focused
            />
          ),
        }}
      />

      <Tab.Screen
        name="Prices"
        component={PricesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="MaterialIcons"
              name="price-change"
              color={color}
              size={focused ? 30 : 24} // Increase size if focused
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="MaterialIcons"
              name="home"
              color={color}
              size={focused ? 30 : 24} // Increase size if focused
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="MaterialIcons"
              name="shopping-cart"
              color={color}
              size={focused ? 30 : 24} // Increase size if focused
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sale"
        component={SaleScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="MaterialIcons"
              name="point-of-sale"
              color={color}
              size={focused ? 30 : 24} // Increase size if focused
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              type="antdesign"
              name="user"
              color={color}
              size={focused ? 30 : 24} // Increase size if focused
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="TopProduct" component={TopProduct} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="CheckOrder" component={CheckOrderScreen} />
          <Stack.Screen name="ChooseNi" component={ChooseNi} />
          <Stack.Screen
            name="CustomerPoints"
            component={CustomerPointsScreen}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
