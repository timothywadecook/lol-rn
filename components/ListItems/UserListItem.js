import React from "react";
import { View, Image } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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
      console.log("user ?", user);
      navigation.navigate("FriendDetails", { friend: user });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
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
          <Image
            source={{
              uri: user.avatar,
            }}
            style={{
              width: lean ? 24 : 36,
              height: lean ? 24 : 36,
              borderRadius: 18,
              marginRight: 10,
            }}
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
