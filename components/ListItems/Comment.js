import React from "react";
import { View } from "react-native";
// Components
import UsernameNavToFriendDetails from "../Atomic/UsernameNavToFriendDetails";
import * as T from "../Atomic/StyledText";
// Hook
import useUser from "../../hooks/useUser";

export default function Comment({ text, creator, large = false }) {
  const friend = useUser(creator);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
      }}
    >
      <UsernameNavToFriendDetails
        withAvatar={true}
        withName={false}
        friend={friend}
      />
      <View style={{ flex: 1, flexDirection: "column", paddingTop: 5 }}>
        <T.FancyH1 style={{ fontSize: large ? 20 : 14 }}>{text}</T.FancyH1>
      </View>
    </View>
  );
}
