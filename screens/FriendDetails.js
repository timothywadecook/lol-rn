import React from "react";
import { View } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import FollowUnfollowButton from "../components/Buttons/FollowUnfollowButton";
import FriendDetailsHeader from "../components/FriendDetailsHeader";
import ProfileTabContent from "../components/ProfileTabContent";
import BackButton from "../components/Atomic/BackButton";

import Screen from "../components/Wrappers/Screen";

export default function FriendDetailsScreen({ navigation, route }) {
  navigation.setOptions({
    gestureResponseDistance: {
      horizontal: 80,
      vertical: 100,
    },
  });
  const { friend } = route.params;

  const theme = useTheme();
  return (
    <Screen fullscreen={true} center={true}>
      <View
        style={{
          backgroundColor: theme.bg,
          paddingTop: theme.topPad + 10,
        }}
      >
        <View
          style={{
            width: theme.windowWidth,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <BackButton />

          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FollowUnfollowButton userId={friend._id} />
          </View>
        </View>

        <FriendDetailsHeader user={friend} />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <ProfileTabContent userId={friend._id} />
      </View>
    </Screen>
  );
}

FriendDetailsScreen.sharedElements = (navigation) => {
  const user = navigation.getParam("friend");
  if (user._id) {
    return [`avatar-${user._id}`];
  }
};
