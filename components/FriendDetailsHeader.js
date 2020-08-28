import React from "react";
import { View } from "react-native";
import { Title, H2G } from "./Atomic/StyledText";

import Avatar from "./Atomic/Avatar";
import FollowUnfollowButton from "./Buttons/FollowUnfollowButton";

import useTheme from "../hooks/useTheme";

export default function FriendDetailsHeader({ user }) {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          width: theme.contentWidth,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
          borderBottomColor: theme.bg,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 2,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Avatar style={{ marginHorizontal: 10 }} size={50} user={user} />
          <View>
            <Title>{user.username}</Title>
            <H2G>{user.name}</H2G>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FollowUnfollowButton userId={user._id} />
        </View>
      </View>
    </View>
  );
}
