import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import Avatar from "../Atomic/Avatar";
import useTheme from "../../hooks/useTheme";

export default function SelectableUser({
  user,
  size = 50,
  onSelect,
  onUnselect,
  selected,
}) {
  const theme = useTheme();
  onPress = selected ? onUnselect : onSelect;

  return (
    <TouchableOpacity
      onPress={onPress}
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
            backgroundColor: theme.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: size / 2,
            height: size,
            width: size,
          }}
        >
          <T.Title style={{ color: theme.purple }}>{user.name[0]}</T.Title>
        </View>
      ) : (
        <Avatar user={user} size={size} />
      )}

      <T.H3 style={{ marginTop: 3 }}>{user.username}</T.H3>
    </TouchableOpacity>
  );
}
