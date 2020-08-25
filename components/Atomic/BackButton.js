import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";

export default function BackButton() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Feather
        name="chevron-left"
        size={30}
        color={theme.iconDefault}
        style={{ paddingHorizontal: 10 }}
      />
    </TouchableOpacity>
  );
}
