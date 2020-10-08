import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function WindowWidthRow({
  children,
  pad = false,
  style,
  topPad,
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          width: theme.windowWidth,
          flexDirection: "row",
          alignItems: "center",
          padding: pad ? 10 : 0,
          backgroundColor: theme.wallbg,
          paddingTop: topPad && theme.topPad + 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
