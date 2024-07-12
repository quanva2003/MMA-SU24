import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CurrencySplitter from "../assistants/currencySpliter";
import Loading from "../components/Loading/Loading";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateNumericCode } from "../assistants/generators";

const tempItems = [
  {
    _id: "66904ffdccd6f078842d0d87",
    productId: {
      _id: "668e8e861cabf69dfeb62e13",
      productName:
        "Aurora Yellow Lab Diamond Emerald Cut And Trillion 1.70ct Ring In 18K Yellow Gold - Elara Collection",
      diamondId: "668e8c85eafcce4558630fc6",
      shellId: "668e848a531f048cfca1e734",
      materialId: "668e8dd9eadfc3da84dd27a0",
      quantity: 2,
      price: 1720,
      image: [
        "https://thediamondstore.imgix.net/productimages/LBSR65-YD100y-2.jpg",
      ],
      description:
        "This exquisite Aurora ring is part of our new Elara Collection that showcases the breathtaking beauty of sustainable coloured lab diamonds. The magnificent yellow lab diamond solitaire looks elegant in a yellow gold setting, catching the eye with its unrivalled brilliance. An unforgettable, ethical gift your loved one will cherish forever.",
      createdAt: "2024-07-10T13:37:10.070Z",
      updatedAt: "2024-07-10T13:37:10.070Z",
      __v: 0,
    },
    user: {
      cart: [],
      _id: "668f8f84a8254ececb42c1aa",
      name: "Q",
      email: "qsao2212@gmail.com",
      password: "123123",
      phoneNumber: null,
      address: null,
      createdAt: "2024-07-11T07:53:40.133Z",
      updatedAt: "2024-07-11T07:53:40.133Z",
      __v: 0,
    },
    quantity: 1,
    size: 8,
    createdAt: "2024-07-11T21:34:53.813Z",
    updatedAt: "2024-07-11T21:34:53.813Z",
    __v: 0,
  },
  {
    _id: "66905443ccd6f078842d0e05",
    productId: {
      _id: "668e90c8e48ee764421381b7",
      productName: "1.73ct Garnet Cluster Ring In 9K White Gold",
      diamondId: "668e901f1cabf69dfeb62e16",
      shellId: "668e9082e48ee764421381b4",
      materialId: "668e29c450d3ae9df2b18067",
      quantity: 3,
      price: 330,
      image: ["https://thediamondstore.imgix.net/productimages/E5064-h.jpg"],
      description:
        "An eye-catching Garnet Ring in 9K White Gold. Claw setting. Free UK delivery and a 5 year guarantee.",
      createdAt: "2024-07-10T13:46:48.344Z",
      updatedAt: "2024-07-10T13:46:48.344Z",
      __v: 0,
    },
    user: {
      cart: [],
      _id: "668f8f84a8254ececb42c1aa",
      name: "Q",
      email: "qsao2212@gmail.com",
      password: "123123",
      phoneNumber: null,
      address: null,
      createdAt: "2024-07-11T07:53:40.133Z",
      updatedAt: "2024-07-11T07:53:40.133Z",
      __v: 0,
    },
    quantity: 1,
    size: 10,
    createdAt: "2024-07-11T21:53:07.462Z",
    updatedAt: "2024-07-11T21:53:07.462Z",
    __v: 0,
  },
  {
    _id: "6690c1587c93d5fd956e76b8",
    productId: {
      _id: "668e935de48ee764421381c0",
      productName:
        "Erika Lab Diamond 1.70ct Emerald Cut Ring In 18K Yellow Gold F/VS1",
      diamondId: "668e9209e48ee764421381ba",
      shellId: "668e8599531f048cfca1e738",
      materialId: "668e8dd9eadfc3da84dd27a0",
      quantity: 5,
      price: 1975,
      image: [
        "https://thediamondstore.imgix.net/productimages/LBSR66-D100y-2.jpg",
        "https://thediamondstore.imgix.net/productimages/LBSR66-D100y-1.jpg",
        "https://thediamondstore.imgix.net/productimages/LBSR66-D100y-3.jpg",
      ],
      description:
        "A brilliant certified Erika Engagement Ring in 18K Yellow Gold. Claw setting. 1.70CT of F/VS1 quality diamonds. Free UK delivery and a 5 year guarantee.",
      createdAt: "2024-07-10T13:57:49.299Z",
      updatedAt: "2024-07-10T13:57:49.299Z",
      __v: 0,
    },
    user: {
      cart: [],
      _id: "668f8f84a8254ececb42c1aa",
      name: "Q",
      email: "qsao2212@gmail.com",
      password: "123123",
      phoneNumber: null,
      address: null,
      createdAt: "2024-07-11T07:53:40.133Z",
      updatedAt: "2024-07-11T07:53:40.133Z",
      __v: 0,
    },
    quantity: 1,
    size: 9,
    createdAt: "2024-07-12T05:38:32.815Z",
    updatedAt: "2024-07-12T05:38:32.815Z",
    __v: 0,
  },
];

export default function CheckoutScreen({ route }) {
  const { products } = route.params;

  const productList = products && products.length > 0 ? products : tempItems;
  const [personalInfo, setPersonalInfo] = useState({
    email: "",
    phoneNumber: "",
    address: {
      province: "",
      district: "",
      ward: "",
      details: "",
    },
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isShipping, setIsShipping] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigate = useNavigation();

  const fetchProvinces = async () => {
    await axios
      .get("http://10.0.2.2:8000/api/address/provinces")
      .then((res) => {
        const provincesList = res.data.map((item) => ({
          key: item.province_id,
          label: item.province_name,
          value: {
            id: item.province_id,
            name: item.province_name,
          },
          color: "#888",
        }));
        setProvinceList(provincesList);
      })
      .catch((err) => console.log(err));
  };

  const getUserData = async () => {
    await AsyncStorage.getItem("user").then((value) => {
      const userData = JSON.parse(value);
      setCurrentUser(userData);
      setPersonalInfo({
        ...personalInfo,
        email: userData.email,
        phoneNumber: userData.phoneNumber ? userData.phoneNumber : "",
      });

      if (userData.address && userData.address.length > 0) {
        const addressArray = userData.address.split(", ");
        setPersonalInfo({
          email: userData.email,
          phoneNumber: userData.phoneNumber ? userData.phoneNumber : "",
          address: {
            province: addressArray[3],
            district: addressArray[2],
            ward: addressArray[1],
            details: addressArray[0],
          },
        });
      }
    });
  };

  const getTotal = () => {
    setTotal(0);
    productList.map((item) => {
      setTotal(
        (current) =>
          current + parseFloat(item.productId.price) * parseInt(item.quantity)
      );
    });
  };

  useEffect(() => {
    getUserData();
    fetchProvinces();
    getTotal();
  }, []);

  const handleSelectProvince = async (value) => {
    if (!value) {
      setPersonalInfo({
        ...personalInfo,
        address: {
          province: "",
          district: "",
          ward: "",
          details: "",
        },
      });
    } else {
      setPersonalInfo({
        ...personalInfo,
        address: {
          province: value.name,
          district: "",
          ward: "",
          details: "",
        },
      });
      await axios
        .get(`http://10.0.2.2:8000/api/address/districts/${value.id}`)
        .then((res) => {
          const districts = res.data.map((item) => ({
            key: item.district_id,
            label: item.district_name,
            value: {
              id: item.district_id,
              name: item.district_name,
            },
            color: "#888",
          }));
          setDistrictList(districts);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSelectDistrict = async (value) => {
    if (!value) {
      setPersonalInfo({
        ...personalInfo,
        address: {
          ...personalInfo.address,
          district: "",
          ward: "",
          details: "",
        },
      });
    } else {
      setPersonalInfo({
        ...personalInfo,
        address: {
          ...personalInfo.address,
          district: value.name,
          ward: "",
          details: "",
        },
      });
      await axios
        .get(`http://10.0.2.2:8000/api/address/wards/${value.id}`)
        .then((res) => {
          const wards = res.data.map((item) => ({
            key: item.ward_id,
            label: item.ward_name,
            value: {
              id: item.ward_id,
              name: item.ward_name,
            },
            color: "#888",
          }));
          setWardList(wards);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSelectWard = async (value) => {
    if (!value) {
      setPersonalInfo({
        ...personalInfo,
        address: {
          ...personalInfo.address,
          ward: "",
          details: "",
        },
      });
    } else {
      setPersonalInfo({
        ...personalInfo,
        address: {
          ...personalInfo.address,
          ward: value.name,
          details: "",
        },
      });
    }
  };

  const initOrder = async () => {
    setIsLoading(true);
    await axios
      .post("http://10.0.2.2:8000/api/stripe/intents", {
        amount: total * 100,
      })
      .then(async (res) => {
        console.log("Intent created: ", res.data.paymentIntent);
        const { error: paymentSheetError } = await initPaymentSheet({
          merchantDisplayName: "Kicusho Inc.",
          paymentIntentClientSecret: res.data.paymentIntent,
          defaultBillingDetails: {
            name: currentUser.name,
          },
        });
        if (paymentSheetError) {
          Alert.alert("Something went wrong", paymentSheetError.message);
          return;
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const showPayOrder = async () => {
    console.log("PERSONAL INFO: ", personalInfo);

    if (
      !personalInfo.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      Alert.alert(
        "Invalid email!",
        "Please try again with a valid email address!"
      );
    } else if (
      personalInfo.phoneNumber.length < 9 ||
      personalInfo.phoneNumber.length > 12
    ) {
      Alert.alert(
        "Invalid phone number!",
        "Please try again with a valid phone number!"
      );
    } else if (isShipping === null) {
      Alert.alert(
        "Unselected delivery method!",
        "Please select either a delivery or a direct pick up!"
      );
    } else if (
      isShipping &&
      currentUser.address.length === 0 &&
      personalInfo.address.details.length === 0
    ) {
      Alert.alert(
        "Empty address!",
        "Please fulfill the entire address information!"
      );
    } else {
      await initOrder();
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        Alert.alert(`${paymentError.code}`, paymentError.message);
        return;
      } else {
        setIsLoading(true);
        //Save personal information if empty or update latest information
        await axios
          .patch(`http://10.0.2.2:8000/api/users/${currentUser.email}`, {
            phoneNumber: personalInfo.phoneNumber,
            address: isShipping
              ? personalInfo.address.details +
                ", " +
                personalInfo.address.ward +
                ", " +
                personalInfo.address.district +
                ", " +
                personalInfo.address.province
              : currentUser.address,
          })
          .then(async (res) => {
            console.log("Updated personal info: ", res.data);
            await AsyncStorage.setItem("user", JSON.stringify(res.data.result));
          })
          .catch((err) => console.log(err));

        //Create order
        const newOrderCode = generateNumericCode(10);
        await axios
          .post("http://10.0.2.2:8000/api/orders", {
            user: currentUser._id,
            transactionId: newOrderCode,
            total: parseFloat(total),
            deliveryRequired: isShipping,
            deliveryInfo: {
              email: personalInfo.email,
              phoneNumber: personalInfo.phoneNumber,
              address: isShipping
                ? personalInfo.address.details +
                  ", " +
                  personalInfo.address.ward +
                  ", " +
                  personalInfo.address.district +
                  ", " +
                  personalInfo.address.province
                : "",
            },
          })
          .then((res) => {
            console.log("Order created: ", res.data);
            const orderId = res.data._id;
            const transactionId = res.data.transactionId;
            productList.map(async (item) => {
              await axios
                .post("http://10.0.2.2:8000/api/orderItems", {
                  order: orderId,
                  product: item.productId._id,
                  quantity: item.quantity,
                  price: item.productId.price,
                  size: item.size,
                })
                .then((res) => {
                  console.log("Created OrderItem: ", res.data);
                })
                .catch((err) => console.log(err));
            });
            setIsLoading(false);
            navigate.navigate("SuccessOrder", { transactionId: transactionId });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <View style={tw`flex-1`}>
      {isLoading ? <Loading /> : null}
      <StripeProvider publishableKey="pk_test_51Pauny2MJLkHoWTV61f7jo4zZfEmbYTcku5rt3YKc0zi1dqHxpjVsBAhgcZ8yxIhjNf7QxAGe36rbUFrxsmYUXF200WUB044Tw">
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
          <View style={tw`w-full flex items-center pt-12`}>
            <Text style={tw`text-white text-[1.5rem] font-bold pb-2`}>
              CHECKOUT
            </Text>
          </View>

          <View style={tw`w-full flex items-start gap-2 py-2`}>
            <Text style={tw`text-gray-400 font-semibold px-4 py-2`}>
              Personal information
            </Text>
            <View style={tw`w-full flex gap-2 px-16 py-2`}>
              <TextInput
                placeholder="Email address..."
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                value={personalInfo.email}
                onChangeText={(e) => {
                  setPersonalInfo({
                    ...personalInfo,
                    email: e,
                  });
                }}
                style={tw`w-full bg-gray-800 text-white rounded-xl px-4 py-1`}
              />

              <TextInput
                placeholder="Phone number..."
                placeholderTextColor="#ccc"
                keyboardType="number-pad"
                value={personalInfo.phoneNumber}
                onChangeText={(e) => {
                  setPersonalInfo({
                    ...personalInfo,
                    phoneNumber: e,
                  });
                }}
                style={tw`w-full bg-gray-800 text-white rounded-xl px-4 py-1`}
              />

              <View
                style={tw`w-full flex-row items-center justify-center py-2`}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsShipping(true);
                  }}
                  style={tw`w-1/2 grow flex items-center border border-white rounded-l-xl py-2 ${
                    isShipping && "bg-sky-800 text-white"
                  }`}
                >
                  <Text style={tw`text-white font-semibold`}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsShipping(false);
                  }}
                  style={tw`w-1/2 grow flex items-center border border-white rounded-r-xl py-2 ${
                    isShipping === false && "bg-sky-800 text-white"
                  }`}
                >
                  <Text style={tw`text-white font-semibold`}>
                    Direct pick up
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={tw`flex-1 ${
                  (!isShipping || isUpdatingAddress) && "hidden"
                }`}
              >
                <Text style={tw`text-gray-600 text-xs`}>Address</Text>
                <Text style={tw`text-white`}>
                  {currentUser && currentUser.address}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsUpdatingAddress(true);
                  }}
                  style={tw`w-32 flex items-center p-2 bg-sky-800 rounded-xl mt-2`}
                >
                  <Text style={tw`text-white font-semibold`}>
                    + Update address
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={tw`w-full flex gap-4 ${
                  (!isShipping ||
                    (currentUser &&
                      currentUser.address.length > 0 &&
                      !isUpdatingAddress)) &&
                  "hidden"
                }`}
              >
                <View style={tw`bg-gray-800 rounded-xl overflow-hidden`}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select a city or province...",
                      color: "#ccc",
                    }}
                    onValueChange={handleSelectProvince}
                    items={provinceList}
                  />
                </View>
                <View
                  style={tw`bg-gray-800 rounded-xl overflow-hidden ${
                    personalInfo.address.province.length === 0 && "hidden"
                  }`}
                >
                  <RNPickerSelect
                    placeholder={{
                      label: "Select a district...",
                      color: "#ccc",
                    }}
                    onValueChange={handleSelectDistrict}
                    items={districtList}
                  />
                </View>
                <View
                  style={tw`bg-gray-800 rounded-xl overflow-hidden ${
                    personalInfo.address.district.length === 0 && "hidden"
                  }`}
                >
                  <RNPickerSelect
                    placeholder={{
                      label: "Select a ward...",
                      color: "#ccc",
                    }}
                    onValueChange={handleSelectWard}
                    items={wardList}
                  />
                </View>
                <View
                  style={tw`bg-gray-800 rounded-xl overflow-hidden ${
                    personalInfo.address.ward.length === 0 && "hidden"
                  }`}
                >
                  <TextInput
                    placeholder="Detailed address..."
                    placeholderTextColor="#888"
                    keyboardType="default"
                    value={personalInfo.address.details}
                    onChangeText={(e) => {
                      setPersonalInfo({
                        ...personalInfo,
                        address: {
                          ...personalInfo.address,
                          details: e,
                        },
                      });
                    }}
                    style={tw`w-full bg-gray-800 text-[#ccc] rounded-xl px-4 py-3`}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={tw`w-full flex items-start gap-2 py-4`}>
            <Text style={tw`text-gray-400 font-semibold px-4`}>Items</Text>
            <ScrollView style={tw`w-full py-2 max-h-64`}>
              <View style={tw`w-full flex border-t border-white gap-2`}>
                {productList.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      style={tw`w-full flex-row gap-2 py-2 border-b border-gray-500`}
                    >
                      <Image
                        source={{ uri: item.productId.image[0] }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          marginLeft: 5,
                        }}
                      />
                      <View style={tw`max-w-1/2 flex gap-2`}>
                        <Text style={tw`text-white text-xs`} numberOfLines={2}>
                          {item.productId.productName}
                        </Text>
                        <Text
                          style={tw`text-white text-[0.6rem] text-gray-500`}
                        >
                          Size: {item.size}
                        </Text>
                      </View>
                      <View style={tw`flex items-center gap-1 ml-auto mr-2`}>
                        <Text style={tw`text-gray-400 text-[0.7rem]`}>
                          Quantity: {item.quantity}
                        </Text>
                        <Text style={tw`text-red-300`}>
                          $ {CurrencySplitter(item.productId.price)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        <View style={tw`w-full flex-row items-center bg-black`}>
          <View style={tw`flex self-start gap-1 pl-1 pr-4`}>
            <Text style={tw`text-gray-300 text-[0.6rem]`}>Total</Text>
            <Text style={tw`text-white font-bold text-[1.2rem]`}>
              $ {CurrencySplitter(total)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => showPayOrder()}
            style={tw`grow flex-row items-center justify-center gap-2 rounded-xl bg-sky-700 p-2 mb-4`}
          >
            <Text style={tw`text-white font-bold text-lg`}>
              Proceed paying via
            </Text>
            <Icon type="font-awesome" name="cc-stripe" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </StripeProvider>
    </View>
  );
}
