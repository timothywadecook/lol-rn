import React, { useState, useEffect } from "react";
import { View } from "react-native";
import ProfileTabContent from "./ProfileTabContent";
import { usersService } from "../services/feathersClient";

import { useSelector } from "react-redux";

export default function ProfileTabsContainer({ user }) {
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
