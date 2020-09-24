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
          marginBottom: props.bottomMargin ? 80 : 0,
          borderRadius: 25,
          padding: 10,
          width: theme.windowWidth * 0.97,
          backgroundColor: theme.bg,
          // backgroundColor: theme.iconBg,

          overflow: "hidden",
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};
