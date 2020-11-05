import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";
import { BlurView } from "expo-blur";

export default function WindowWidthRow({
  children,
  pad = false,
  style,
  topPad,
  blur = false,
}) {
  const theme = useTheme();
  const Component = blur ? BlurView : View;
  return (
    <Component
      intensity={blur && 94}
      tint={blur && theme.theme}
      style={[
        {
          width: theme.windowWidth,
          flexDirection: "row",
          alignItems: "center",
          padding: pad ? 10 : 0,
          backgroundColor: blur ? "transparent" : theme.wallbg,
          paddingTop: topPad && theme.topPad + 10,
        },
        style,
      ]}
    >
      {children}
    </Component>
  );
}
