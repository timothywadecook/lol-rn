import React from "react";
import { View, Modal, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import * as T from "../components/Atomic/StyledText";

import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import CloseModalButton from "../components/Atomic/CloseModalButton";

import ListList from "../components/Lists/ListList";

import useTheme from "../hooks/useTheme";

export default function Collections({ navigation }) {
  const theme = useTheme();

  const dismissModal = () => navigation.goBack(); // setShowModal(false);

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
        <CloseModalButton dismissModal={dismissModal} />
        <T.H1 style={{ marginLeft: 10 }}>My Collections</T.H1>
      </WindowWidthRow>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 40 }}
      >
        <ListList userId={sessionUserId} />
      </ScrollView>
    </View>
  );
}
