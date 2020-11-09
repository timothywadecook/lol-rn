import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import useTheme from "../../hooks/useTheme";

import TabBarIcon from "../../components/Atomic/TabBarIcon";
import Home from "./Home/Home";
import Browse from "./Browse/Browse";
import Library from "./Library/Library";


const Tabs = createMaterialTopTabNavigator();

export default function _Tabs() {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        indicatorStyle: { backgroundColor: theme.iconBg },
        activeTintColor: theme.primary,
        inactiveTintColor: theme.tabIconDefault,
        labelStyle: { fontSize: 8 },
        iconStyle: { height: 34 },
        tabStyle: { paddingTop: 0, marginBottom: theme.topPad?20:10 },
        style: {
          backgroundColor: theme.menubg,
          // borderTopWidth: 1,
          borderTopColor: theme.iconBg,
          paddingHorizontal: 40,
        },
      }}
      initialRouteName="Home"
    >
      
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="flame" type="octicons" />
          ),
        }}
      />
      <Tabs.Screen
        name="Browse"
        component={Browse}
        options={{
          title: "Browse",
          tabBarLabel: "Browse",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="search" />
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
            <TabBarIcon focused={focused} name="bookmark" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
