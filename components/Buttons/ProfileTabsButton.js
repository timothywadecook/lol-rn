import React from "react";
import { TouchableOpacity } from "react-native";
import { H2 } from "../Atomic/StyledText";

export default TabButton = ({
  activeTab,
  tabName,
  setActiveTab,
  count,
  theme,
}) => (
  <TouchableOpacity
    style={{
      flexDirection: "column",
      alignItems: "center",
      padding: 15,
    }}
    onPress={() => setActiveTab(tabName)}
  >
    <H2
      style={{
        color: activeTab === tabName ? theme.purple : theme.iconDefault,
      }}
    >
      {count}
    </H2>
    <H2
      style={{
        color: activeTab === tabName ? theme.purple : theme.iconDefault,
      }}
    >
      {tabName}
    </H2>
  </TouchableOpacity>
);
