import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import useTheme from "../../hooks/useTheme";

export default function CloseModalButton({ dismissModal }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 20,
        backgroundColor: theme.iconBg,
      }}
      onPress={dismissModal}
    >
      <Feather name="chevron-down" size={30} color={theme.purple} />
    </TouchableOpacity>
  );
}
