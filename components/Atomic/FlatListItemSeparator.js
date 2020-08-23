import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function FlatListItemSeparator({ bgColor }) {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: bgColor || theme.bg,
        width: "85%",
        alignSelf: "flex-end",
      }}
    ></View>
  );
}
