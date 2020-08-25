import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";

// Components
import ProfileTabsContainer from "../../components/ProfileTabsContainer";
import ProfileMainHeader from "../../components/ProfileMainHeader";
import ProfileSettings from "../../components/ProfileSettings";
import Screen from "../../components/Wrappers/Screen";

// Actual Component
export default function ProfileScreen({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
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
    <Screen center={true}>
      <ProfileMainHeader
        user={user}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        setInputFocus={setInputFocus}
        inputFocus={inputFocus}
      />
      {!inputFocus && MainContent}
    </Screen>
  );
}
