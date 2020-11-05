import { Feather } from "@expo/vector-icons";
import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import Avatar from "./Avatar";

import useTheme from "../../hooks/useTheme";

export default function TabBarIcon({ name, focused }) {
  const theme = useTheme();
  const sessionUser = useSelector((state) => state.user);

  if (name === "profile") {
    return (
      <View
        // onPress={() => navigation.navigate("Profile", { user: sessionUser })}
        style={{
          // paddingHorizontal: 10,
          // height: 30,
          // width: 30,
          // padding: 5,
          backgroundColor: focused ? theme.primary : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar user={sessionUser} />
      </View>
    );
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
