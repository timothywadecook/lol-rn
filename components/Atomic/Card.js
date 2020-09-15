import React from "react";
import { View } from "react-native";

import useTheme from "../../hooks/useTheme";

export default Card = (props) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: theme.borderColor,
          marginBottom: props.bottomMargin ? 40 : 0,
          borderRadius: 25,
          padding: 10,
          width: theme.windowWidth * 0.97,
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
