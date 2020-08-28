import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function WindowWidthRow({ children }) {
  const theme = useTheme();
  return (
    <View
      style={{
        width: theme.windowWidth,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
}
