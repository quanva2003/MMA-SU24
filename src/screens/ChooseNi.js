import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Icon } from "react-native-elements";
import StepIndicator from "react-native-step-indicator";
import ChooseJewelry from "../components/ChooseNi/ChooseJewerly";
import tw from "twrnc";

const ChooseType = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Choose Type</Text>
  </View>
);

const Confirm = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Confirm</Text>
  </View>
);

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fff",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fff",
  stepStrokeUnFinishedColor: "#D0D0D0",
  separatorFinishedColor: "#f1f1f1",
  separatorUnFinishedColor: "#D0D0D0",
  stepIndicatorFinishedColor: "#000",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#222",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#ffffff",
  labelSize: 13,
  currentStepLabelColor: "#ccc",
};

const stepLabels = ["Choose Jewelry", "Choose Type", "Confirm"];

const ChooseNi = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigation();

  const handleSelectJewelry = (itemId) => {
    setSelectedJewelry(itemId);
  };

  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
        return <ChooseJewelry onSelectItem={handleSelectJewelry} />;
      case 1:
        return <ChooseType />;
      case 2:
        return <Confirm />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentPosition === 0 && !selectedJewelry) {
      setModalVisible(true);
    } else {
      setCurrentPosition((prev) => Math.min(prev + 1, 2));
    }
    console.log(selectedJewelry);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Please select a jewelry item to proceed.
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.btnModal}>
              <Text style={styles.textBtnModal}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={tw`items-start pb-5`}
        onPress={() => navigate.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <StepIndicator
        customStyles={stepIndicatorStyles}
        currentPosition={currentPosition}
        labels={stepLabels}
        stepCount={3}
      />
      <View style={styles.contentContainer}>{renderStepContent()}</View>
      <View style={styles.buttonContainer}>
        {currentPosition !== 0 && (
          <TouchableOpacity
            onPress={() => {
              setCurrentPosition((prev) => Math.max(prev - 1, 0));
              //   {currentPosition === 2 }
              setSelectedJewelry(null);
            }}
            style={styles.btnControl}
          >
            <Text style={styles.textBtnControl}>PREVIOUS</Text>
          </TouchableOpacity>
        )}
        {currentPosition !== 2 && (
          <TouchableOpacity onPress={handleNext} style={styles.btnControl}>
            <Text style={styles.textBtnControl}>NEXT</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChooseNi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    marginTop: 30,
  },
  contentContainer: {
    flex: 1,
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#222",
    borderRadius: 10,
  },
  stepText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
    justifyContent: "center",
  },
  btnControl: {
    backgroundColor: "#212121",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  textBtnControl: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  btnModal: {
    backgroundColor: "#212121",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  textBtnModal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
