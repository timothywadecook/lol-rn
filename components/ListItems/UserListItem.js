import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../Atomic/Avatar";
import * as T from "../Atomic/StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function UserListItem({
  user,
  children,
  lean = false,
  adjacentText,
}) {
  const { username, name } = user;

  const navigation = useNavigation();
  const sessionUserId = useSelector((state) => state.user._id);

  const openFriendDetails = () => {
    if (user._id === sessionUserId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("FriendDetails", { friend: user });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: lean ? 7 : 15,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={openFriendDetails}
        >
          <Avatar
            user={user}
            size={lean ? 24 : 36}
            style={{ marginRight: 10 }}
          />
          <View
            style={{
              flexDirection: "column",
              paddingRight: 7,
            }}
          >
            <T.H2>{username}</T.H2>
            {!lean && <T.H2G>{name}</T.H2G>}
          </View>
        </TouchableOpacity>
        {!!adjacentText && adjacentText()}
      </View>
      {children}
    </View>
  );
}
