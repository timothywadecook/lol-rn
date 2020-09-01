import React from "react";
import SearchUsersByUsername from "../components/Inputs/SearchUsersByUsername";
import Screen from "../components/Wrappers/Screen";

export default function SearchUsers() {
  return (
    <Screen center={true}>
      <SearchUsersByUsername />
    </Screen>
  );
}
