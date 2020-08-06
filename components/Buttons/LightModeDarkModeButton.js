import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

import useTheme from "../../hooks/useTheme";

export default function LightModeDarkModeButton({ size }) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        alignItem: "center",
        justifyContent: "center",
      }}
      onPress={() => theme.toggle()}
    >
      <Ionicons
        style={{ padding: 8 }}
        name={theme.theme === "light" ? "md-moon" : "md-sunny"}
        size={size}
        color={theme.purple}
      />
    </TouchableOpacity>
  );
}
