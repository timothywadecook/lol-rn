import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function WindowWidthRow({ children, pad = false, style }) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          width: theme.windowWidth,
          flexDirection: "row",
          alignItems: "center",
          padding: pad ? 10 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
