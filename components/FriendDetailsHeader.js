import React from "react";
import { View } from "react-native";
import * as T from "./Atomic/StyledText";
import Avatar from "./Atomic/Avatar";

import useTheme from "../hooks/useTheme";
import useTotal from '../hooks/useTotal';
import { followsService } from "../services/feathersClient";

export default function FriendDetailsHeader({ user }) {
  const theme = useTheme();

  const followingCount = useTotal(followsService, {follower: user._id});
  const followerCount = useTotal(followsService, {following: user._id});

  return (
    <View
      style={{
        width: theme.windowWidth,
        paddingVertical: 20,
        // backgroundColor: 'pink'
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar style={{ marginHorizontal: 10 }} size={80} user={user} />
        <View style={{ alignItems: "center" }}>
          <T.Title>{user.username}</T.Title>
          <T.H2G>{user.name}</T.H2G>
        </View>
      </View>

      <View style={{paddingTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <T.H2>Following {followingCount}</T.H2>
            <T.H2>Followers {followerCount}</T.H2>
      </View>
    </View>
  );
}
