import React from "react";
import { View } from "react-native";
import Morph from "../Wrappers/Morph";
import useTheme from "../../hooks/useTheme";

export default Card = (props) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          marginBottom: props.bottomMargin ? 60 : 10,
          padding: 10,
          width: theme.windowWidth,
          backgroundColor: theme.bg,
          overflow: "hidden",
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};
