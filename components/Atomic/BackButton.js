import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../../hooks/useTheme";

export default function BackButton({ noLeftMargin = false }) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        marginLeft: noLeftMargin ? 0 : 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 20,
        backgroundColor: theme.iconBg,
      }}
      onPress={() => navigation.goBack()}
    >
      <Feather name="chevron-left" size={30} color={theme.purple} />
    </TouchableOpacity>
  );
}
