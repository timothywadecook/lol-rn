import React from "react";
import { View, Button, Image } from "react-native";

import { H2, H2G } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

const UserListItem = ({ username, name, action, handleAction }) => {
  const title = {
    follow: "Follow",
    unfollow: "Unfollow",
    directMessage: "Send",
  }[action];

  const theme = useTheme();

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
            uri:
              "https://www.libreriasanjorge.com.ar/core/vendors/v24/wf/clean/images/usuario-avatar-circular.fw-p-500.png",
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            margin: 5,
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

      <Button onPress={handleAction} title={title} color={theme.iconDefault} />
    </View>
  );
};

export default UserListItem;
