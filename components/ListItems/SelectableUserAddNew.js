import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export default function SelectableUserAddNew({ size = 40 }) {
  const theme = useTheme();
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Search Users");
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 5,
        margin: 5,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Ionicons
        style={{ height: size }}
        name="md-add-circle"
        size={size}
        color={theme.iconDefault}
      />
      <T.H3 style={{ marginTop: 3 }}>Add New</T.H3>
    </TouchableOpacity>
  );
}
