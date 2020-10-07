import React from "react";
import { View, Modal, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import * as T from "../components/Atomic/StyledText";
import { Feather } from "@expo/vector-icons";

import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import BackButton from "../components/Atomic/BackButton";
import CloseModalButton from "../components/Atomic/CloseModalButton";

import ListList from "../components/Lists/ListList";

import useTheme from "../hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Collections({ navigation }) {
  const theme = useTheme();

  const onNewList = () => navigation.navigate("CreateOrEditList"); // setShowModal(false);

  const sessionUserId = useSelector((state) => state.user._id);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.wallbg,
        paddingTop: theme.topPad,
        alignItems: "center",
      }}
    >
      <WindowWidthRow pad={true}>
        <BackButton />
        <T.H1 style={{ marginLeft: 10 }}>My Lists</T.H1>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 20,
              // backgroundColor: theme.iconBg,
            }}
            onPress={onNewList}
          >
            <Feather name="plus" color={theme.purple} size={30} />
          </TouchableOpacity>
        </View>
      </WindowWidthRow>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 40 }}
      >
        <ListList userId={sessionUserId} autoOpen={true} />
      </ScrollView>
    </View>
  );
}
