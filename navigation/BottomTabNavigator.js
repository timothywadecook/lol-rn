import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { connect } from "react-redux";

import TabBarIcon from "../components/Atomic/TabBarIcon";
import Home from "../screens/Tabs/Home";
// import ConversationsScreen from "../screens/Tabs/Conversations";
import CreateScreen from "../screens/Tabs/Create";
import ProfileScreen from "../screens/Tabs/Profile";

import useTheme from "../hooks/useTheme";

const BottomTab = createBottomTabNavigator();

const mapState = (state) => ({
  isFocusing: state.user.isFocusing,
});

function BottomTabNavigator({ navigation, isFocusing }) {
  navigation.setOptions({
    headerShown: false,
    tabBarVisible: false,
  });

  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme.primary,
        inactiveTintColor: theme.tabIconDefault,
        style: {
          backgroundColor: theme.wallbg,
          borderTopWidth: 0,
          paddingHorizontal: 20,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "",
          tabBarVisible: isFocusing,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-thumbs-up" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Messages"
        component={ConversationsScreen}
        options={{
          title: "Messages",
          // tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-chatbubbles" />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: "Create",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-add-circle" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default connect(mapState, null)(BottomTabNavigator);
