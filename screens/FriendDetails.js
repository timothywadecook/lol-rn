import React from "react";
import { View, Button } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import FriendDetailsHeader from "../components/FriendDetailsHeader";
import FriendDetailsTabsContainer from "../components/FriendDetailsTabsContainer";
import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";
import BackButton from "../components/Atomic/BackButton";

import Screen from "../components/Wrappers/Screen";

export default function FriendDetailsScreen({ route }) {
  const { friend } = route.params;

  const theme = useTheme();
  return (
    <Screen center={true}>
      <View
        style={{
          width: theme.windowWidth,
          alignItems: "flex-start",
        }}
      >
        <BackButton />
      </View>

      {friend ? (
        <React.Fragment>
          <FriendDetailsHeader user={friend} />
          <FriendDetailsTabsContainer user={friend} />
        </React.Fragment>
      ) : (
        <ActivityIndicatorCentered />
      )}
    </Screen>
  );
}
