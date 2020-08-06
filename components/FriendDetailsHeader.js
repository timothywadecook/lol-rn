import React from "react";
import { View, Image, Text } from "react-native";
import { Title, H2, H2G, P } from "./Atomic/StyledText";

import SubmitButton from "./Buttons/SubmitButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleFollowingAsync } from "../store/userSlice";

import UserAvatar from "react-native-user-avatar";

const FriendDetailsHeader = ({ user, theme }) => {
  const sessionUserFollowing = useSelector((state) => state.user.following);
  const dispatch = useDispatch();
  const isFollowing = sessionUserFollowing.includes(user._id);
  const title = isFollowing ? "Unfollow" : "Follow";

  return (
    <View>
      <View
        style={{
          width: theme.contentWidth,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 2,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <UserAvatar
            style={{
              margin: 10,
              borderWidth: 0.5,
              borderColor: "white",
            }}
            size={80}
            name={user.first_name + " " + user.last_name}
            bgColor={"black"}
            src={user.avatar}
          />
          <View>
            <Title>{user.username}</Title>
            <H2G>{user.first_name + " " + user.last_name}</H2G>
            <P>Atlanta, GA</P>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SubmitButton
            bg={true}
            show={true}
            title={title}
            onPress={() => dispatch(toggleFollowingAsync(user._id))}
          />
        </View>
      </View>
    </View>
  );
};

export default FriendDetailsHeader;
