import React, { useState } from "react";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";

// Components
import ProfileTabsContainer from "../../components/ProfileTabsContainer";
import ProfileMainHeader from "../../components/ProfileMainHeader";
import ProfileSettings from "../../components/ProfileSettings";
import Screen from "../../components/Wrappers/Screen";
import FriendDetailsHeader from "../../components/FriendDetailsHeader";

// Actual Component
export default function ProfileScreen({ navigation }) {
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
    <Screen center={true}>
      <ProfileMainHeader
        user={user}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      <FriendDetailsHeader user={user} />

      {showSettings ? (
        <ProfileSettings user={user} theme={theme} />
      ) : (
        <ProfileTabsContainer user={user} />
      )}
    </Screen>
  );
}
