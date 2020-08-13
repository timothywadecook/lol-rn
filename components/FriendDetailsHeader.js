import React from "react";
import { View } from "react-native";
import { Title, H2G } from "./Atomic/StyledText";

import UserAvatar from "react-native-user-avatar";
import FollowUnfollowButton from "./Buttons/FollowUnfollowButton";

const FriendDetailsHeader = ({ user, theme }) => {
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
              marginRight: 10,
              borderWidth: 1,
              borderColor: "white",
            }}
            size={50}
            name={user.name}
            bgColor={"black"}
            src={user.avatar}
          />
          <View>
            <Title>{user.username}</Title>
            <H2G>{user.name}</H2G>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FollowUnfollowButton userId={user._id} />
        </View>
      </View>
    </View>
  );
};

export default FriendDetailsHeader;
