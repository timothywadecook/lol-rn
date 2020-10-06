import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import ProfileMainHeader from "../components/ProfileMainHeader";
import ProfileSettings from "../components/ProfileSettings";
import Screen from "../components/Wrappers/Screen";
import FriendDetailsHeader from "../components/FriendDetailsHeader";
//
import * as T from "../components/Atomic/StyledText";
import FriendsList from "../components/Lists/FriendsList";
import useFollowers from "../hooks/useFollowers";
import useFollowing from "../hooks/useFollowing";
import useSuggested from "../hooks/useSuggested";

// Actual Component
export default function NetworkScreen({ navigation }) {
  navigation.setOptions({
    gestureResponseDistance: {
      horizontal: 80,
      vertical: 100,
    },
  });
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [showSettings, setShowSettings] = useState(false);

  const [
    following,
    refreshFollowing,
    refreshingFollowing,
    fetchmoreFollowing,
    loadingFollowing,
  ] = useFollowing(user._id);
  const [
    followers,
    refreshFollowers,
    refreshingFollowers,
    fetchmoreFollowers,
    loadingFollowers,
  ] = useFollowers(user._id);
  const [
    suggested,
    refreshSuggested,
    refreshingSuggested,
    fetchmoreSuggested,
    loadingSuggested,
    moreAvailableSuggested,
  ] = useSuggested();

  return (
    <Screen fullscreen={true} center={true}>
      <View
        style={{
          backgroundColor: theme.bg,
          paddingTop: theme.topPad + 10,
        }}
      >
        <ProfileMainHeader
          user={user}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />

        <FriendDetailsHeader user={user} />
      </View>

      {showSettings ? (
        <ProfileSettings user={user} theme={theme} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
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

          <T.H4 style={{ paddingTop: 20 }}>Discover</T.H4>
          <FriendsList
            vertical={true}
            data={suggested}
            title="Suggested"
            refresh={refreshSuggested}
            refreshing={refreshingSuggested}
            fetchMore={fetchmoreSuggested}
            loading={loadingSuggested}
            moreAvailable={moreAvailableSuggested}
          />
        </ScrollView>
      )}
    </Screen>
  );
}
