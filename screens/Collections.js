import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import ListList from "../components/Lists/ListList";
import useTheme from "../hooks/useTheme";

export default function Collections({ navigation }) {
  const theme = useTheme();

  const onNewList = () => navigation.navigate("CreateOrEditList");

  const sessionUser = useSelector((state) => state.user);
  const sessionUserId = sessionUser._id;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.wallbg,
        alignItems: "center",
      }}
    >
      <ListList userId={sessionUserId} vertical={true} />
    </View>
  );
}
