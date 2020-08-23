import React from "react";
import { View } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import SearchUsersByUsername from "../components/Inputs/SearchUsersByUsername";
import Screen from "../components/Wrappers/Screen";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

// Actual Component
export default function SearchUsers({ navigation }) {
  const theme = useTheme();
  navigation.setOptions({
    headerShown: false,
  });

  return (
    <Screen center={true}>
      <View
        style={{
          width: theme.windowWidth,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={30}
            color={theme.iconDefault}
            style={{ paddingHorizontal: 10 }}
          />
        </TouchableOpacity>

        <SearchUsersByUsername />
      </View>
    </Screen>
  );
}
