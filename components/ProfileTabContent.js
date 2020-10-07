import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import ListList from "./Lists/ListList";
import * as T from "./Atomic/StyledText";

import useFollowers from "../hooks/useFollowers";
import useFollowing from "../hooks/useFollowing";
import useSuggested from "../hooks/useSuggested";
import FriendsList from "./Lists/FriendsList";

export default function ProfileTabContent({ userId, isSessionUser }) {
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
  const [
    suggested,
    refreshSuggested,
    refreshingSuggested,
    fetchmoreSuggested,
    loadingSuggested,
    moreAvailableSuggested,
  ] = useSuggested();

  return refreshingFollowers || refreshingFollowing || refreshingSuggested ? (
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

        {isSessionUser && (
          <FriendsList
            data={suggested}
            title="Suggested"
            refresh={refreshSuggested}
            refreshing={refreshingSuggested}
            fetchMore={fetchmoreSuggested}
            loading={loadingSuggested}
          />
        )}

        <T.H4 style={{ paddingTop: 10 }}>Lists</T.H4>

        <ListList userId={userId} />
      </View>
    </ScrollView>
  );
}
