import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import useTheme from "../../hooks/useTheme";

import TabBarIcon from "../../components/Atomic/TabBarIcon";
import Home from "./Home/Home";
import Browse from "./Browse/Browse";
import OurLibrary from "./OurLibrary/OurLibrary";
import Library from "./Library/Library";


const Tabs = createMaterialTopTabNavigator();

export default function _Tabs() {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        showLabel: true,
        showIcon: true,
        indicatorStyle: { backgroundColor: "transparent" },
        activeTintColor: theme.primary,
        inactiveTintColor: theme.tabIconDefault,
        labelStyle: { fontSize: 9 },
        iconStyle: { height: 30 },
        tabStyle: { paddingTop: 0, paddingBottom: theme.topPad > 15 ? 30 : 15 },
        style: {
          backgroundColor: theme.wallbg,
          borderTopWidth: 1,
          borderTopColor: theme.iconBg,
          paddingHorizontal: 40,
        },
      }}
      initialRouteName="Library"
    >
      
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Browse"
        component={Browse}
        options={{
          title: "Browse",
          tabBarLabel: "Browse",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="search" />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="Network"
        component={OurLibrary}
        options={{
          title: "Network",
          tabBarLabel: "Network",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="users" />
          ),
        }}
      />
      <Tabs.Screen
        name="Library"
        component={Library}
        options={{
          title: "Library",
          tabBarLabel: "Library",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
