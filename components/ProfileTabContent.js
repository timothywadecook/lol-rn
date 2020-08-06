import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Text, ScrollView } from "react-native";
import UserListItem from "./ListItems/UserListItem";
import FilteredRecommendationsList from "./Lists/FilteredRecommendationsList";

import { toggleFollowingAsync } from "../store/userSlice";
import useTheme from "../hooks/useTheme";

export default function ProfileTabContent({
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

  const dispatch = useDispatch();
  const toggleFollowing = (userId) => dispatch(toggleFollowingAsync(userId));

  const sessionUserFollowing = useSelector((state) => state.user.following);

  switch (activeTab) {
    case "Posts":
      return (
        <FilteredRecommendationsList
          loading={loadingPosts}
          refresh={refreshPosts}
          refreshing={refreshingPosts}
          fetchMore={fetchMorePosts}
          recommendations={posts}
        />
      );

    case "Lists":
      return (
        <ScrollView>
          <Text>My Public List</Text>
          <Text>My Private List</Text>
        </ScrollView>
      );
    case "Followers":
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: theme.contentWidth,
          }}
        >
          {followers.map((u) => (
            <UserListItem
              username={u.username}
              first_name={u.first_name}
              last_name={u.last_name}
              action={
                sessionUserFollowing.includes(u._id) ? "unfollow" : "follow"
              }
              handleAction={() => {
                toggleFollowing(u._id);
              }}
              key={u.username}
            />
          ))}
        </ScrollView>
      );
    case "Following":
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: theme.contentWidth,
          }}
        >
          {following.map((u) => (
            <UserListItem
              username={u.username}
              first_name={u.first_name}
              last_name={u.last_name}
              action={
                sessionUserFollowing.includes(u._id) ? "unfollow" : "follow"
              }
              handleAction={() => {
                toggleFollowing(u._id);
              }}
              key={u.username}
            />
          ))}
        </ScrollView>
      );
    default:
      return <Text>Nada</Text>;
  }
}
