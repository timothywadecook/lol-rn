import React from "react";
import { View } from "react-native";

import useTheme from "../hooks/useTheme";
import ProfileTabsButton from "./Buttons/ProfileTabsButton";

export default function ProfileTabMenu({
  options,
  count,
  setActiveTab,
  activeTab,
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        width: theme.windowWidth,
        borderBottomColor: theme.bg,
        borderBottomWidth: 1,
        zIndex: 3,
        elevation: 3,
      }}
    >
      {options.map((text) => (
        <ProfileTabsButton
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabName={text}
          key={text + Math.random()}
          // count={count && count[text]}
          theme={theme}
        />
      ))}
    </View>
  );
}
