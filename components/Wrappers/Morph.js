import React from "react";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function Morph({
  children,
  marginVertical = 5,
  marginHorizontal = 0,
  borderRadius = 8,
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.bg,
        shadowRadius: 1,
        shadowColor: theme.white,
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.5,
        borderRadius: borderRadius,
        marginVertical: marginVertical,
        marginHorizontal: marginHorizontal,
      }}
    >
      <View
        style={{
          backgroundColor: theme.bg,
          shadowRadius: 1,
          shadowColor: theme.black,
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          borderRadius: borderRadius,
        }}
      >
        {children}
      </View>
    </View>
  );
}
