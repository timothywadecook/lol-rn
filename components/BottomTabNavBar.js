import React from "react";
import { TouchableOpacity, View } from "react-native";
// Components
import { Feather } from "@expo/vector-icons";
import * as T from "./Atomic/StyledText";
import { BlurView } from "expo-blur";
// Hooks
import useTheme from "../hooks/useTheme";

export default function BottomTabNavBar({ navigation, state }) {
  const theme = useTheme();
  const SIZE = 50;
  const BOTTOM = 0;

  const icons = {
    Home: "home",
    SearchThings: "search",
    MyLists: "bookmark",
  };

  const displayNames = {
    Home: "Discover",
    SearchThings: "Things",
    MyLists: "Lists",
  };

  return (
    <BlurView
      tint={theme.theme}
      intensity={94}
      style={{
        width: theme.windowWidth,
        // backgroundColor: theme.tabBar,
        // width: 240,
        // borderTopLeftRadius: (SIZE + 20) / 2,
        // borderTopRightRadius: (SIZE + 20) / 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        padding: 10,
        paddingBottom: 20,

        // right: theme.windowWidth / 2 - 120,
        bottom: BOTTOM,
        zIndex: 3,
        elevation: 8,
        // shadowColor: theme.primary,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
        // // borderWidth: 0.5,
        // borderColor: theme.iconDefault,
      }}
    >
      {state.routeNames.map((r) => (
        <TabBarButton
          key={r + "tabBar"}
          SIZE={SIZE}
          routeName={r}
          icon={icons[r]}
          routeDisplayName={displayNames[r]}
          activeRouteName={state.routeNames[state.index]}
        />
      ))}
    </BlurView>
  );
}

function TabBarButton({
  SIZE,
  routeName,
  icon,
  routeDisplayName,
  activeRouteName,
}) {
  const theme = useTheme();
  const isFocused = activeRouteName === routeName;
  const color = isFocused ? theme.primary : theme.iconDefault;
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE / 2,
      }}
      onPress={() => navigation.navigate(routeName)}
    >
      <Feather name={icon} size={isFocused ? 30 : 24} color={color} />

      {/* <T.Label
          style={{
            color: color,
          }}
        >
          {routeDisplayName}
        </T.Label> */}
    </TouchableOpacity>
  );
}
