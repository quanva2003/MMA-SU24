import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import {
  PaymentSheetError,
  StripeProvider,
  usePaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }

    const confirmHandler = async (
      paymentMethod,
      shouldSavePaymentMethod,
      intentCreationCallback
    ) => {
      // Make a request to your own server.
      // const myServerResponse = await fetch(...);
      // Call the `intentCreationCallback` with your server response's client secret or error
      console.log("ConfirmHandler");
      const { clientSecret, error } = await response.json();
      if (clientSecret) {
        intentCreationCallback({ clientSecret });
      } else {
        intentCreationCallback({ error });
      }
    };
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  async function payOrder() {
    console.log("PAY PRESSED");

    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        // Customer canceled - you should probably do nothing.
        console.log("Error 1: ", error);
      } else {
        // PaymentSheet encountered an unrecoverable error. You can display the error to the user, log it, etc.
        console.log("Error 2: ", error);
      }
    } else {
      // Payment completed - show a confirmation screen.
      Alert.alert("SUCCESS");
    }
  }

  return (
    <ScrollView>
      <StripeProvider publishableKey="pk_test_51Pauny2MJLkHoWTV61f7jo4zZfEmbYTcku5rt3YKc0zi1dqHxpjVsBAhgcZ8yxIhjNf7QxAGe36rbUFrxsmYUXF200WUB044Tw">
        <KeyboardAvoidingView style={styles.container}>
          <Button title="Pay order" type="outline" onPress={() => payOrder()} />
        </KeyboardAvoidingView>
      </StripeProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  welcomeHead: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  inputText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
  },
});
