import React from "react";
import { View } from "react-native";

import useTheme from "../../hooks/useTheme";

export default Card = (props) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          borderWidth: 4,
          borderColor: theme.wallbg,
          marginBottom: 40,
          borderRadius: 25,
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
