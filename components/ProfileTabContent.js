import React from "react";
import { Text, ScrollView, View } from "react-native";
import UserListItem from "./ListItems/UserListItem";
import ListList from "./Lists/ListList";

import { AddUser } from "./Buttons/IconButtons";

import ProfileCard from "./Atomic/ProfileCard";

import useTheme from "../hooks/useTheme";

import FollowUnfollowButton from "./Buttons/FollowUnfollowButton";
import { useNavigation } from "@react-navigation/native";

export default function ProfileTabContent({ userId, followers, following }) {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: theme.windowWidth,
      }}
    >
      <ListList userId={userId} privateList={true} />

      <ListList userId={userId} privateList={false} />

      <ProfileCard
        title="Following"
        renderRightChild={() => (
          <AddUser onPress={() => navigation.navigate("Search Users")} />
        )}
      >
        <View>
          {following.map((u) => (
            <UserListItem key={u._id} user={u}>
              <FollowUnfollowButton userId={u._id} />
            </UserListItem>
          ))}
        </View>
      </ProfileCard>

      <ProfileCard title="Followers">
        <View>
          {followers.map((u) => (
            <UserListItem key={u._id} user={u}>
              <FollowUnfollowButton userId={u._id} />
            </UserListItem>
          ))}
        </View>
      </ProfileCard>
    </ScrollView>
  );
}
