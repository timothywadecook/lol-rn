import React from "react";
import { Text, ScrollView, View } from "react-native";
import UserListItem from "./ListItems/UserListItem";
import ListList from "./Lists/ListList";
import FilteredRecommendationsList from "./Lists/FilteredRecommendationsList";

import useTheme from "../hooks/useTheme";

import ActivityIndicatorCentered from "./Atomic/ActivityIndicatorCentered";
import FollowUnfollowButton from "./Buttons/FollowUnfollowButton";

export default function ProfileTabContent({
  userId,
  activeTab,
  fetchMorePosts,
  refreshPosts,
  loadingPosts,
  refreshingPosts,
  posts,
  followers,
  following,
}) {
  const theme = useTheme();

  switch (activeTab) {
    case "Posts":
      return !posts ? (
        <ActivityIndicatorCentered />
      ) : (
        <FilteredRecommendationsList
          loading={loadingPosts}
          refresh={refreshPosts}
          refreshing={refreshingPosts}
          fetchMore={fetchMorePosts}
          recommendations={posts}
        />
      );

    case "Lists":
      return <ListList userId={userId} />;
    case "Followers":
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: theme.windowWidth,
          }}
        >
          {followers.map((u) => (
            <UserListItem key={u._id} user={u}>
              <FollowUnfollowButton userId={u._id} />
            </UserListItem>
          ))}
        </ScrollView>
      );
    case "Following":
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: theme.windowWidth,
          }}
        >
          {following.map((u) => (
            <UserListItem key={u._id} user={u}>
              <FollowUnfollowButton userId={u._id} />
            </UserListItem>
          ))}
        </ScrollView>
      );
    default:
      return <Text>Nada</Text>;
  }
}
