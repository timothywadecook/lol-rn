import React from "react";
import { View } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import SearchUsersByUsername from "../components/Inputs/SearchUsersByUsername";
import Screen from "../components/Wrappers/Screen";

import BackButton from "../components/Atomic/BackButton";

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
        <BackButton />
        <SearchUsersByUsername />
      </View>
    </Screen>
  );
}
