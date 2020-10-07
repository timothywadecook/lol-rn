import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView, ActivityIndicator } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import ProfileMainHeader from "../components/ProfileMainHeader";
import ProfileSettings from "../components/ProfileSettings";
import Screen from "../components/Wrappers/Screen";
import FriendDetailsHeader from "../components/FriendDetailsHeader";
import ProfileTabContent from "../components/ProfileTabContent";

// Actual Component
export default function Profile({ navigation }) {
  navigation.setOptions({
    gestureResponseDistance: {
      horizontal: 80,
      vertical: 100,
    },
  });
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [showSettings, setShowSettings] = useState(false);
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
        <ProfileTabContent userId={user._id} isSessionUser={true} />
      )}
    </Screen>
  );
}
