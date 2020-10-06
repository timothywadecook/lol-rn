import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import ListList from "./Lists/ListList";
import * as T from "./Atomic/StyledText";

import Animated from "react-native-reanimated";

import useFollowers from "../hooks/useFollowers";
import useFollowing from "../hooks/useFollowing";
import FriendsList from "./Lists/FriendsList";

export default function ProfileTabContent({ userId }) {
  const y = React.useMemo(() => new Animated.Value(0), []);
  const [
    following,
    refreshFollowing,
    refreshingFollowing,
    fetchmoreFollowing,
    loadingFollowing,
  ] = useFollowing(userId);
  const [
    followers,
    refreshFollowers,
    refreshingFollowers,
    fetchmoreFollowers,
    loadingFollowers,
  ] = useFollowers(userId);

  return refreshingFollowers || refreshingFollowing ? (
    <ActivityIndicator />
  ) : (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <T.H4 style={{ paddingTop: 20 }}>Friends</T.H4>

        <FriendsList
          data={following}
          title="Following"
          refresh={refreshFollowing}
          refreshing={refreshingFollowing}
          fetchMore={fetchmoreFollowing}
          loading={loadingFollowing}
        />

        <FriendsList
          data={followers}
          title="Followers"
          refresh={refreshFollowers}
          refreshing={refreshingFollowers}
          fetchMore={fetchmoreFollowers}
          loading={loadingFollowers}
        />

        <T.H4 style={{ paddingTop: 10 }}>Lists</T.H4>

        <ListList userId={userId} />
      </View>
    </ScrollView>
  );
}
