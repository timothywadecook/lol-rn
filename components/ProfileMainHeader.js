import React from "react";
import { View } from "react-native";
import WindowWidthRow from "./Wrappers/WindowWidthRow";
import FollowUserByUsernameInput from "./Inputs/FollowUserByUsernameInput";
import BackButton from "./Atomic/BackButton";
import IconButtons from "./Buttons/IconButtons";

import useTheme from "../hooks/useTheme";

export default function ProfileMainHeader({ showSettings, setShowSettings }) {
  const theme = useTheme();
  return (
    <WindowWidthRow>
      <BackButton />

      <FollowUserByUsernameInput />

      <ToggleableSettingsButton
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </WindowWidthRow>
  );
}

function ToggleableSettingsButton({ showSettings, setShowSettings }) {
  return (
    <View
      style={{
        flex: 0.25,
        paddingTop: 2,
      }}
    >
      {showSettings ? (
        <IconButtons.Close
          onPress={() => setShowSettings(false)}
          active={true}
          size={30}
        />
      ) : (
        <IconButtons.Settings size={30} onPress={() => setShowSettings(true)} />
      )}
    </View>
  );
}
