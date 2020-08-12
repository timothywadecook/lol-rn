import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Text, ScrollView, View } from "react-native";
import UserListItem2 from "./ListItems/UserListItem2";
import ListList from "./Lists/ListList";
import FilteredRecommendationsList from "./Lists/FilteredRecommendationsList";

import { toggleFollowingAsync } from "../store/followsSlice";
import useTheme from "../hooks/useTheme";

import { H1 } from "../components/Atomic/StyledText";
import SubmitButton from "./Buttons/SubmitButton";

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
  console.log("posts?", posts);

  const dispatch = useDispatch();
  const toggleFollowing = (userId) => dispatch(toggleFollowingAsync(userId));

  const sessionUserFollowing = useSelector((state) => state.follows.following);

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
      return <ListList userId={userId} />;
    case "Followers":
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: theme.contentWidth,
          }}
        >
          {followers.map((u) => (
            <UserListItem2 key={u._id} user={u}>
              <SubmitButton
                onPress={() => toggleFollowing(u._id)}
                intent={
                  sessionUserFollowing.includes(u._id) ? "info" : "primary"
                }
                title={
                  sessionUserFollowing.includes(u._id) ? "Unfollow" : "Follow"
                }
              />
            </UserListItem2>
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
            <UserListItem2 key={u._id} user={u}>
              <SubmitButton
                onPress={() => toggleFollowing(u._id)}
                intent={
                  sessionUserFollowing.includes(u._id) ? "info" : "primary"
                }
                title={
                  sessionUserFollowing.includes(u._id) ? "Unfollow" : "Follow"
                }
              />
            </UserListItem2>
          ))}
        </ScrollView>
      );
    default:
      return <Text>Nada</Text>;
  }
}
