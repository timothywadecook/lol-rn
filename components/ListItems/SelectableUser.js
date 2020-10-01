import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import Avatar from "../Atomic/Avatar";
import useTheme from "../../hooks/useTheme";

export default function SelectableUser({ user, size = 40, onSelect }) {
  const theme = useTheme();
  const query = useSelector((state) => state.feed.query.creator["$in"]);
  const selected = query.length === 1 && query.includes(user._id);

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        padding: 5,
        margin: 5,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {selected ? (
        <View
          style={{
            overflow: "hidden",
            backgroundColor: theme.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: size / 2,
            height: size,
            width: size,
          }}
        >
          <Ionicons name="md-checkmark" size={size - 10} color={theme.purple} />
        </View>
      ) : (
        <Avatar user={user} size={size} />
      )}
      <T.H3 style={{ marginTop: 3 }}>{user.username}</T.H3>
    </TouchableOpacity>
  );
}
