import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import FriendDetailsHeader from "../components/FriendDetailsHeader";
import FriendDetailsTabsContainer from "../components/FriendDetailsTabsContainer";
import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";
import { usersService } from "../services/feathersClient";

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
    <View
      style={{
        paddingTop: 32,
        backgroundColor: theme.wallbg,
        flex: 1,
        alignItems: "center",
      }}
    >
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
          color={theme.primary}
          // style={{ alignSelf: "flex-start" }}
        ></Button>
      </View>

      {friend ? (
        <React.Fragment>
          <FriendDetailsHeader user={friend} theme={theme} />
          <FriendDetailsTabsContainer user={friend} />
        </React.Fragment>
      ) : (
        <ActivityIndicatorCentered />
      )}
    </View>
  );
}
