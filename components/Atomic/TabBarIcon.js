import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import Avatar from "./Avatar";

import useTheme from "../../hooks/useTheme";

export default function TabBarIcon({ name, focused, type="feather" }) {
  const theme = useTheme();
  const sessionUser = useSelector((state) => state.user);

  if (name === "profile") {
    return (
      <View style={{height: 34, justifyContent: 'center', marginTop: 3}}>
      {/* <View
        style={{
          borderRadius: 12,
          backgroundColor: focused ? theme.primary : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      > */}
        <Avatar border={focused} user={sessionUser} />
      {/* </View> */}
      </View>
    );
  }

  if (type === "octicons") {
    return (
      <Octicons 
      name={name}
      size={24}
      style={{marginTop: 7}}
      color={focused ? theme.primary : theme.tabIconDefault}
      />
    )
  }

  return (
    <Feather
      name={name}
      size={24}
      style={{ marginTop: 7 }}
      color={focused ? theme.primary : theme.tabIconDefault}
    />
  );
}
