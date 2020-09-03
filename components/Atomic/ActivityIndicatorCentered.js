import React from "react";
import { ActivityIndicator, View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function ActivityIndicatorCentered({ size = "large" }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={size} color={theme.primary} />
    </View>
  );
}
