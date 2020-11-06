import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView, ActivityIndicator } from "react-native";
import {Icon} from 'react-native-elements';
import useTheme from "../hooks/useTheme";

// Components
import BackButton from '../components/Atomic/BackButton';
import Screen from "../components/Wrappers/Screen";
import FriendDetailsHeader from "../components/FriendDetailsHeader";
import {LibraryContent} from "./Tabs/Library/Library";
import FollowUnfollowButton from "../components/Buttons/FollowUnfollowButton";


export default function Profile({ navigation, route }) {
  const { user } = route.params;
  const sessionUser = useSelector((state) => state.user);
  const theme = useTheme();
  const isSessionUser = sessionUser._id === user._id;

  const renderHeaderRight = () => isSessionUser?<Icon containerStyle={{paddingHorizontal:15}} name="settings" type="feather" onPress={()=>navigation.navigate("Settings")} color={theme.iconDefault} />:<FollowUnfollowButton userId={user._id} />

  navigation.setOptions({
    headerTintColor: theme.primary,
    headerRight:renderHeaderRight,
    headerLeft:()=><BackButton />,
  });
  return (
    <Screen fullscreen={true} center={true}>
        <FriendDetailsHeader user={user} />
        <LibraryContent user={user} />
    </Screen>
  );
}

Profile.sharedElements = (navigation) => {
  const user = navigation.getParam("user");
  if (user._id) {
    return [`avatar-${user._id}`];
  }
};
