import React from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { H3, H2 } from "./StyledText";
import { useNavigation } from "@react-navigation/native";
import Avatar from "./Avatar";

const UsernameNavToFriendDetails = ({
  friend,
  withAvatar = true,
  withName = true,
}) => {
  const navigation = useNavigation();
  const activeUserId = useSelector((state) => state.user._id);

  const handleOnPress = () => {
    if (friend._id === activeUserId) {
      navigation.navigate("Network");
    } else {
      navigation.navigate("FriendDetails", { friend });
    }
  };
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
    >
      {withAvatar &&
        (!!friend.username ? (
          <Avatar style={{ margin: 7 }} user={friend} />
        ) : (
          <View style={{ width: 38.3, height: 38.3 }}></View>
        ))}
      {withName && <H2>{friend.username}</H2>}
    </TouchableOpacity>
  );
};

export default UsernameNavToFriendDetails;
