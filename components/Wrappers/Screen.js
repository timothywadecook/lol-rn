import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function Screen(props) {
  const theme = useTheme();
  return (
    <View
      style={[
        { marginVertical: 30, backgroundColor: theme.wallbg, flex: 1 },
        props.style,
      ]}
      {...props}
    >
      {props.children}
    </View>
  );
}
