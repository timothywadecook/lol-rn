import React from "react";
import { View, Modal, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import * as T from "../components/Atomic/StyledText";
import { Feather } from "@expo/vector-icons";
import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import ListList from "../components/Lists/ListList";
import useTheme from "../hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
//
import Animated from "react-native-reanimated";
import Avatar from "../components/Atomic/Avatar";
import FollowUserByUsernameInput from "../components/Inputs/FollowUserByUsernameInput";

export default function Collections({ navigation }) {
  const theme = useTheme();

  const sessionUser = useSelector((state) => state.user);
  const sessionUserId = sessionUser._id;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.wallbg,
        alignItems: "center",
      }}
    >
      <ListList userId={sessionUserId} vertical={true} />
    </View>
  );
}
