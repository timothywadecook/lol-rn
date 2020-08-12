import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";

// Components
import ProfileTabsContainer from "../../components/ProfileTabsContainer";
import ProfileMainHeader from "../../components/ProfileMainHeader";
import ProfileSettings from "../../components/ProfileSettings";
import FollowUserByUsernameInput from "../../components/Inputs/FollowUserByUsernameInput";

// Actual Component
export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const [showSettings, setShowSettings] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const MainContent = showSettings ? (
    <ProfileSettings user={user} theme={theme} />
  ) : (
    <ProfileTabsContainer user={user} />
  );

  return (
    <View
      style={{
        paddingTop: 32,
        backgroundColor: theme.wallbg,
        flex: 1,
        alignItems: "center",
      }}
    >
      <FollowUserByUsernameInput
        inputFocus={inputFocus}
        setInputFocus={setInputFocus}
      />
      {!inputFocus && (
        <ProfileMainHeader
          user={user}
          theme={theme}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      )}
      {!inputFocus && MainContent}
    </View>
  );
}
