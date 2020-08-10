import React, { useState, useEffect } from "react";
import { View } from "react-native";
import ProfileTabContent from "./ProfileTabContent";
import ProfileTabMenu from "./ProfileTabMenu";
import { usersService } from "../services/feathersClient";

import { refreshPostsAsync, fetchMorePostsAsync } from "../store/postsSlice";

import { useSelector, useDispatch } from "react-redux";

export default function ProfileTabsContainer({ user }) {
  const [activeTab, setActiveTab] = useState("Posts");

  const posts = useSelector((state) => state.posts.list);
  const followingIds = useSelector((state) => state.follows.following);
  const followerIds = useSelector((state) => state.follows.followers);

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const fetchFollowing = () => {
    if (followingIds.length > 0) {
      usersService
        .find({
          query: {
            _id: { $in: followingIds },
            $limit: 1000,
          },
        })
        .then((res) => {
          setFollowing(res.data);
        })
        .catch((e) => console.log("error getting friend details", e));
    }
  };
  const fetchFollowers = () => {
    if (followerIds.length > 0) {
      usersService
        .find({
          query: {
            _id: { $in: followerIds },
            $limit: 1000,
          },
        })
        .then((res) => {
          setFollowers(res.data);
        })
        .catch((e) => console.log("error getting followers", e));
    }
  };

  useEffect(() => {
    fetchFollowers();
    fetchFollowing();
  }, [followingIds]);

  const dispatch = useDispatch();
  const fetchMorePosts = () => dispatch(fetchMorePostsAsync());
  const refreshPosts = () => dispatch(refreshPostsAsync());

  const loadingPosts = useSelector((state) => state.posts.loading);
  const refreshingPosts = useSelector((state) => state.posts.refreshing);

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ProfileTabMenu
        // count={{
        //   Posts: postsCount,
        //   Lists: lists.length,
        //   Followers: followers.length,
        //   Following: following.length,
        // }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        options={["Posts", "Lists", "Followers", "Following"]}
      />

      <ProfileTabContent
        userId={user._id}
        fetchMorePosts={fetchMorePosts}
        refreshPosts={refreshPosts}
        loadingPosts={loadingPosts}
        refreshingPosts={refreshingPosts}
        posts={posts}
        following={following}
        followers={followers}
        activeTab={activeTab}
      />
    </View>
  );
}
