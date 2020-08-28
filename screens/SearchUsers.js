import React from "react";
import SearchUsersByUsername from "../components/Inputs/SearchUsersByUsername";
import Screen from "../components/Wrappers/Screen";

export default function SearchUsers({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });

  return (
    <Screen center={true}>
      <SearchUsersByUsername />
    </Screen>
  );
}
