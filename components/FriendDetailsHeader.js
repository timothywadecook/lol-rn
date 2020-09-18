import React from "react";
import { View } from "react-native";
import { Title, H2G } from "./Atomic/StyledText";
import Avatar from "./Atomic/Avatar";

import useTheme from "../hooks/useTheme";

export default function FriendDetailsHeader({ user }) {
  const theme = useTheme();

  return (
    <View>
      <View
        style={{
          width: theme.contentWidth,
          paddingVertical: 20,
          borderBottomColor: theme.bg,
          borderBottomWidth: 0,
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
            <Title>{user.username}</Title>
            <H2G>{user.name}</H2G>
          </View>
        </View>
      </View>
    </View>
  );
}
