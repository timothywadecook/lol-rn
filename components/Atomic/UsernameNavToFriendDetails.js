import React from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { H3, H2 } from "./StyledText";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";

const UsernameNavToFriendDetails = ({ friend, withAvatar = true }) => {
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
      {withAvatar && (
        <UserAvatar
          style={{ margin: 6, borderWidth: 1, borderColor: "white" }}
          bgColor="black"
          size={24}
          name={friend.first_name + " " + friend.last_name}
          src={friend.avatar}
        />
      )}
      {/* <H3>{friend.first_name + " " + friend.last_name}</H3> */}
      <H2>{friend.username}</H2>
    </TouchableOpacity>
  );
};

export default UsernameNavToFriendDetails;
