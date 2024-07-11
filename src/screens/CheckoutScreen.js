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
import { Button, Icon } from "react-native-elements";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CurrencySplitter from "../assistants/currencySpliter";
import Loading from "../components/Loading/Loading";
import RNPickerSelect from "react-native-picker-select";

export default function CheckoutScreen() {
  const [personalInfo, setPersonalInfo] = useState({
    email: "",
    phone: "",
    address: {
      province: "",
      district: "",
      ward: "",
      details: "",
    },
  });
  const [isShipping, setIsShipping] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigate = useNavigation();

  const tempItems = [
    {
      _id: "668e2baa1d9ba0c851a29441",
      productName:
        "Anastasia Lab Diamond Halo Engagement Ring 18K White Gold 1.30ct F/VS1",
      diamondId: {
        _id: "668e2ac450d3ae9df2b1806b",
        type: "Lab Diamond",
      },
      shellId: {
        _id: "668e2a1f50d3ae9df2b18069",
        shellName: "Halo",
        category: "ring",
        size: [7, 8, 9, 10],
        createdAt: "2024-07-10T06:28:47.501Z",
        updatedAt: "2024-07-10T06:28:47.501Z",
        __v: 0,
      },
      materialId: {
        _id: "668e29c450d3ae9df2b18067",
        materialName: "White Gold",
        createdAt: "2024-07-10T06:27:16.519Z",
        updatedAt: "2024-07-10T06:27:16.519Z",
        __v: 0,
      },
      quantity: 300,
      price: 35650,
      image: [
        "https://thediamondstore.imgix.net/productimages/LBSR57-D50w-2.jpg",
      ],
      description:
        "To create breathtaking brilliance, this exquisite engagement ring brings together a stunning lab grown solitaire and a double halo of diamonds. Drawing the eye to the solitaire is a split shank band, which provides more surface area for dazzling accent diamonds. The handcrafted 18K white gold setting looks and feels luxurious on the hand.",
      createdAt: "2024-07-10T06:35:22.888Z",
      updatedAt: "2024-07-10T06:35:22.888Z",
      __v: 0,
    },
    {
      _id: "668e8d12eafcce4558630fc8",
      productName:
        "Aurora Yellow Lab Diamond Emerald Cut And Trillion 1.70ct Ring In 18K White Gold - Elara Collection",
      diamondId: {
        _id: "668e8c85eafcce4558630fc6",
        type: "Yellow Lab Diamond",
      },
      shellId: {
        _id: "668e848a531f048cfca1e734",
        shellName: "Vintage",
        category: "ring",
        size: [7, 8, 9, 10],
        createdAt: "2024-07-10T12:54:34.951Z",
        updatedAt: "2024-07-10T12:54:34.951Z",
        __v: 0,
      },
      materialId: {
        _id: "668e29c450d3ae9df2b18067",
        materialName: "White Gold",
        createdAt: "2024-07-10T06:27:16.519Z",
        updatedAt: "2024-07-10T06:27:16.519Z",
        __v: 0,
      },
      quantity: 57,
      price: 49158,
      image: [
        "https://thediamondstore.imgix.net/productimages/LBSR65-YD100w-2.jpg",
      ],
      description:
        "This exquisite Aurora ring is part of our new Elara Collection that showcases the breathtaking beauty of sustainable coloured lab diamonds. The magnificent yellow lab diamond solitaire looks elegant in a platinum setting, catching the eye with its unrivalled brilliance. An unforgettable, ethical gift your loved one will cherish forever.",
      createdAt: "2024-07-10T13:30:58.321Z",
      updatedAt: "2024-07-10T13:30:58.321Z",
      __v: 0,
    },
  ];

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

  useEffect(() => {
    fetchProvinces();
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
        amount: 12345678,
      })
      .then(async (res) => {
        console.log("Intent created: ", res.data.paymentIntent);
        const { error: paymentSheetError } = await initPaymentSheet({
          merchantDisplayName: "Example, Inc.",
          paymentIntentClientSecret: res.data.paymentIntent,
          defaultBillingDetails: {
            name: "iAmDou",
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
    if (
      !personalInfo.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      Alert.alert(
        "Invalid email",
        "Please try again with a valid email address!"
      );
    } else if (
      personalInfo.phone.length < 9 ||
      personalInfo.phone.length > 12
    ) {
      Alert.alert(
        "Invalid phone number",
        "Please try again with a valid phone number!"
      );
    } else if (isShipping && personalInfo.address.details.length === 0) {
      Alert.alert(
        "Empty address",
        "Please fulfill the entire address information!"
      );
    } else {
      await initOrder();
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        Alert.alert(`${paymentError.code}`, paymentError.message);
        return;
      } else {
        Alert.alert("Successfully paid", "Nice one");
        console.log("Completed order: ", personalInfo);
      }
    }
  };

  return (
    <View style={tw`flex-1`}>
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
                value={personalInfo.phone}
                onChangeText={(e) => {
                  setPersonalInfo({
                    ...personalInfo,
                    phone: e,
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

              <View style={tw`w-full flex gap-4 ${!isShipping && "hidden"}`}>
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
                {tempItems.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      style={tw`w-full flex-row gap-2 py-2 border-b border-gray-500`}
                    >
                      <Image
                        source={{ uri: item.image[0] }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          marginLeft: 5,
                        }}
                      />
                      <View style={tw`max-w-1/2 flex gap-2`}>
                        <Text style={tw`text-white text-xs`} numberOfLines={2}>
                          {item.productName}
                        </Text>
                        <Text
                          style={tw`text-white text-[0.6rem] text-gray-500`}
                        >
                          Size: 10
                        </Text>
                      </View>
                      <View style={tw`flex items-center gap-1 ml-auto mr-2`}>
                        <Text style={tw`text-gray-400 text-[0.7rem]`}>
                          Quantity: 1
                        </Text>
                        <Text style={tw`text-red-300`}>
                          $ {CurrencySplitter(item.price)}
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
          <TouchableOpacity
            onPress={() => showPayOrder()}
            style={tw`w-full flex-row items-center justify-center gap-2 rounded-xl bg-sky-700 p-2 mb-4`}
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

const styles = StyleSheet.create({});
