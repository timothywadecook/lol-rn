import React, { useState, useEffect } from "react";
import { View } from "react-native";
import ProfileTabContent from "./ProfileTabContent";
import { usersService, followsService } from "../services/feathersClient";

export default function FriendDetailsTabsContainer({ user }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
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
      if (followerIds.length > 0) {
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

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ProfileTabContent
        userId={user._id}
        following={following}
        followers={followers}
      />
    </View>
  );
}
