import React from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { H3, H2 } from "./StyledText";
import { useNavigation } from "@react-navigation/native";
import Avatar from "./Avatar";
import useTheme from "../../hooks/useTheme";

const UsernameNavToFriendDetails = ({
  friend,
  withAvatar = true,
  withName = false,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const activeUserId = useSelector((state) => state.user._id);

  const handleOnPress = () => {
    console.log("friendid, userid", friend._id, activeUserId);
    if (friend._id === activeUserId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("FriendDetails", { friend });
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
    >
      {withAvatar && <Avatar style={{ margin: 7 }} user={friend} />}
      <H2>{friend.username}</H2>
    </TouchableOpacity>
  );
};

export default UsernameNavToFriendDetails;
