import { Ionicons, Feather } from "@expo/vector-icons";
import React from "react";

import useTheme from "../../hooks/useTheme";

export default function TabBarIcon(props) {
  const theme = useTheme();

  if (props.name === "search") {
    return (
      <Feather
        name={props.name}
        size={24}
        style={{ marginTop: 7 }}
        color={props.focused ? theme.primary : theme.tabIconDefault}
      />
    );
  }
  return (
    <Ionicons
      name={props.name}
      size={24}
      style={{ marginTop: 7 }}
      color={props.focused ? theme.primary : theme.tabIconDefault}
    />
  );
}
