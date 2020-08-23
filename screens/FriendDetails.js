import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import FriendDetailsHeader from "../components/FriendDetailsHeader";
import FriendDetailsTabsContainer from "../components/FriendDetailsTabsContainer";
import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";

import Screen from "../components/Wrappers/Screen";

////////////////////////////////////////////////////////////////////////////////
// navigation.navigate("FriendDetails", { friendId });
////////////////////////////////////////////////////////////////////////////////

export default function FriendDetailsScreen({ navigation, route }) {
  navigation.setOptions({
    headerShown: false,
  });

  const { friend } = route.params;

  const theme = useTheme();
  return (
    <Screen center={true}>
      <View
        style={{
          width: theme.windowWidth,
          alignItems: "flex-start",
          paddingHorizontal: 10,
        }}
      >
        <Button
          title="Back"
          onPress={() => {
            navigation.goBack();
          }}
          color={theme.purple}
        ></Button>
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
