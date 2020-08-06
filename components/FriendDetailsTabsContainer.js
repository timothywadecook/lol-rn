import React, { useState, useEffect } from "react";
import { View } from "react-native";
import ProfileTabContent from "./ProfileTabContent";
import ProfileTabMenu from "./ProfileTabMenu";
import {
  recommendationsService,
  usersService,
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

  const fetchFollowing = () => {
    usersService
      .find({
        query: {
          _id: { $in: user.following },
          $limit: 1000,
        },
      })
      .then((res) => {
        setFollowing(res.data);
      })
      .catch((e) => console.log("error getting friend details", e));
  };
  const fetchFollowers = () => {
    usersService
      .find({
        query: {
          following: user._id,
          $limit: 1000,
        },
      })
      .then((res) => setFollowers(res.data))
      .catch((e) => console.log("error getting followers", e));
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
