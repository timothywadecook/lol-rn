import React from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, FlatList } from "react-native";
import UserListItem from "./ListItems/UserListItem";
import ListList from "./Lists/ListList";

import * as T from "./Atomic/StyledText";

import ProfileCard from "./Atomic/ProfileCard";

import useTheme from "../hooks/useTheme";

import SelectableUserAddNew from "./ListItems/SelectableUserAddNew";
import SelectableUser from "./ListItems/SelectableUser";
import FollowUnfollowButton from "./Buttons/FollowUnfollowButton";
import { useNavigation } from "@react-navigation/native";

export default function ProfileTabContent({ userId, followers, following }) {
  const theme = useTheme();
  const navigation = useNavigation();

  const sessionUserId = useSelector((state) => state.user._id);
  const isSessionUser = sessionUserId === userId;

  const openFriendDetails = (user) => {
    if (user._id === sessionUserId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("FriendDetails", { friend: user });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: theme.windowWidth,
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 60,
      }}
    >
      <ListList userId={userId} privateList={true} />

      <ListList userId={userId} privateList={false} />

      <ProfileCard title="Following">
        <View>
          <FlatList
            data={following}
            renderItem={({ item: user }) => (
              <SelectableUser
                selectable={false}
                user={user}
                onSelect={() => openFriendDetails(user)}
                onUnselect={() => console.log("unselect")}
              />
            )}
            ListFooterComponent={() =>
              isSessionUser && <SelectableUserAddNew />
            }
            ListEmptyComponent={() =>
              !isSessionUser && (
                <T.H2 style={{ fontWeight: "normal", padding: 10 }}>
                  Following 0 Users
                </T.H2>
              )
            }
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ProfileCard>

      <ProfileCard title="Followers">
        <View>
          <FlatList
            data={followers}
            renderItem={({ item: user }) => (
              <SelectableUser
                selectable={false}
                user={user}
                onSelect={() => openFriendDetails(user)}
              />
            )}
            ListEmptyComponent={() => (
              <T.H2 style={{ fontWeight: "normal", padding: 10 }}>
                0 Followers
              </T.H2>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ProfileCard>
    </ScrollView>
  );
}
