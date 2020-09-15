import React from "react";
import UserAvatar from "react-native-user-avatar";

import useTheme from "../../hooks/useTheme";

export default function Avatar({ user, size = 24, style }) {
  const theme = useTheme();
  return (
    <UserAvatar
      style={{ borderWidth: 0.2, borderColor: theme.white, ...style }}
      size={size}
      name={user.name}
      bgColor={theme.iconDefault}
      src={user.avatar}
    />
  );
}
