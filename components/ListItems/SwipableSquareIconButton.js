import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useTheme from "../../hooks/useTheme";

import { H2 } from "../Atomic/StyledText";

export default function SwipableSquareIconButton({
  icon,
  text,
  color,
  onPress,
}) {
  const theme = useTheme();
  if (icon === "delete") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          backgroundColor: color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          style={{ padding: 8 }}
          name="md-trash"
          size={24}
          color={theme.primary}
        />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text && <H2 style={{ textAlign: "center" }}>{text}</H2>}
    </TouchableOpacity>
  );
}
