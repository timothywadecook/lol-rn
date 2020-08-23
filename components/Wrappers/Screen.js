import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function Screen(props) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          paddingTop: props.fullscreen ? 0 : 40,
          backgroundColor: theme.wallbg,
          flex: 1,
          alignItems: props.center ? "center" : "flex-start",
        },
        props.style,
      ]}
      {...props}
    >
      {props.children}
    </View>
  );
}
