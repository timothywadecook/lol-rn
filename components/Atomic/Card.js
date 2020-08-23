import React from "react";
import { View } from "react-native";

import useTheme from "../../hooks/useTheme";

export default Card = (props) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          borderWidth: 3,
          borderColor: theme.wallbg,
          paddingVertical: 10,
          marginBottom: 40,
          width: theme.windowWidth,
          backgroundColor: theme.bg,
          borderRadius: 25,
          overflow: "hidden",
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};
