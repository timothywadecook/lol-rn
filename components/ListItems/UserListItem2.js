import React from "react";
import { View, Button, Image } from "react-native";

import { H2, H2G } from "../Atomic/StyledText";

export default function UserListItem2({ user, children }) {
  const { username, name } = user;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: user.avatar,
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 10,
          }}
        />
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <H2>{username}</H2>
          <H2G>{name}</H2G>
        </View>
      </View>
      {children}
    </View>
  );
}
