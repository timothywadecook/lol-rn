import React, { useState, useEffect } from "react";
import { View } from "react-native";
import ProfileTabContent from "./ProfileTabContent";
import ProfileTabMenu from "./ProfileTabMenu";
import {
  recommendationsService,
  usersService,
  followsService,
} from "../services/feathersClient";

export default function FriendDetailsTabsContainer({ user }) {
  const [activeTab, setActiveTab] = useState("Posts");

  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchFollowers();
    fetchFollowing();
  }, [user._id]);

  const fetchFollowing = async () => {
    try {
      const followingIds = (
        await followsService.find({
          query: {
            follower: user._id,
            $limit: 1000,
          },
        })
      ).data.map((f) => f.following);

      if (followingIds.length > 0) {
        const following = await usersService.find({
          query: {
            _id: { $in: followingIds },
            $limit: 1000,
          },
        });
        setFollowing(following.data);
      }
    } catch (e) {
      console.log("error fetching following for friend", e);
    }
  };

  const fetchFollowers = async () => {
    try {
      const followerIds = (
        await followsService.find({
          query: {
            following: user._id,
            $limit: 1000,
          },
        })
      ).data.map((f) => f.follower);
      if (followersIds.length > 0) {
        const followers = await usersService.find({
          query: {
            _id: { $in: followerIds },
            $limit: 1000,
          },
        });
        setFollowers(followers.data);
      }
    } catch (e) {
      console.log("error fetching followers for friend", e);
    }
  };

  const fetchPosts = () => {
    recommendationsService
      .find({
        query: {
          creator: user._id,
          $limit: 1000,
          $sort: { createdAt: -1 },
        },
      })
      .then((response) => {
        setPosts(response.data);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ProfileTabMenu
        // count={{
        //   Posts: posts.length,
        //   Lists: lists.length
        //   Followers: followers.length,
        //   Following: following.length,
        // }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        options={["Posts", "Lists", "Followers", "Following"]}
      />

      <ProfileTabContent
        posts={posts}
        // lists={lists}
        following={following}
        followers={followers}
        activeTab={activeTab}
      />
    </View>
  );
}
