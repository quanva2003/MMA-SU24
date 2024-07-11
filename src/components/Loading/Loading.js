import React from "react";
import { Dimensions, View } from "react-native";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{
        width,
        height: height * 1.2,
        backgroundColor: "black",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <Progress.CircleSnail thickness={12} size={160} color={"#D2DA21"} />
    </View>
  );
}
