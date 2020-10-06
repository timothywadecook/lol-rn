import React from "react";
import { useSelector } from "react-redux";
import { View, FlatList, ActivityIndicator } from "react-native";
import ProfileCard from "../Atomic/ProfileCard";

import SelectableUser from "../ListItems/SelectableUser";
import { useNavigation } from "@react-navigation/native";
import UserListItem from "../ListItems/UserListItem";
import FollowUnfollowButton from "../Buttons/FollowUnfollowButton";
import WindowWidthRow from "../Wrappers/WindowWidthRow";
import RoundButton from "../Buttons/RoundButton";

export default function FriendsList({
  data,
  title,
  vertical = false,
  refresh,
  refreshing,
  fetchMore,
  loading,
  moreAvailable = false,
}) {
  const sessionUserId = useSelector((state) => state.user._id);
  const navigation = useNavigation();

  const openFriendDetails = (user) => {
    if (user._id === sessionUserId) {
      navigation.navigate("Network");
    } else {
      navigation.push("FriendDetails", { friend: user });
    }
  };

  renderHorizontalItem = ({ item: user }) => (
    <SelectableUser
      selectable={false}
      user={user}
      onSelect={() => openFriendDetails(user)}
      onUnselect={() => console.log("unselect")}
    />
  );

  renderVerticalItem = (user) => (
    <UserListItem key={user._id + title} user={user}>
      <FollowUnfollowButton userId={user._id} />
    </UserListItem>
  );

  if (!data || data.length < 1) {
    return null;
  }

  if (vertical) {
    return (
      <ProfileCard title={title}>
        {data.map(renderVerticalItem)}
        <WindowWidthRow style={{ justifyContent: "center" }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            moreAvailable && (
              <RoundButton
                title="Show More"
                onPress={fetchMore}
                lessVerticalPad={true}
              />
            )
          )}
        </WindowWidthRow>
      </ProfileCard>
    );
  }

  return (
    <ProfileCard title={title}>
      <FlatList
        data={data}
        initialNumToRender={vertical ? 10 : 6}
        renderItem={vertical ? renderVerticalItem : renderHorizontalItem}
        horizontal={!vertical}
        showVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        refresh={refresh}
        refreshing={refreshing}
        fetchMore={fetchMore}
        loading={loading}
      />
    </ProfileCard>
  );
}
