import React from "react";
import { Avatar, Accessory } from "react-native-elements";
import { SharedElement } from "react-navigation-shared-element";

import useTheme from "../../hooks/useTheme";

export default function AvatarComponent({ user, size = 24, style, children, border = true, onPress=null }) {
  const theme = useTheme();

  return (
    <Avatar
      onPress={onPress}
      rounded
      containerStyle={{ borderWidth: border? 0.5:0, borderColor: theme.white, ...style }}
      size={size}
      title={user.name && user.name[0].toUpperCase()}
      source={{ uri: user.avatar }}
    >
      {children}
    </Avatar>
  );
}
