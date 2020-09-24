import React from "react";
import SearchUsersByUsername from "../components/Inputs/SearchUsersByUsername";
import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import * as T from "../components/Atomic/StyledText";
import Screen from "../components/Wrappers/Screen";

export default function SearchUsers() {
  return (
    <Screen center={true}>
      <WindowWidthRow pad={true}>
        <T.H1>Search Users</T.H1>
      </WindowWidthRow>
      <SearchUsersByUsername />
    </Screen>
  );
}
