import React from "react";
import { View, Modal, TextInput } from "react-native";
import { useSelector } from "react-redux";
import * as T from "../components/Atomic/StyledText";

import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import CloseModalButton from "../components/Atomic/CloseModalButton";

import ListList from "../components/Lists/ListList";

import useTheme from "../hooks/useTheme";

export default function NewCollectionModal({ showModal, setShowModal }) {
  const theme = useTheme();

  const dismissModal = () => setShowModal(false);

  const sessionUserId = useSelector((state) => state.user._id);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={dismissModal}
      onDismiss={dismissModal}
    >
      <View style={{ flex: 1 }}></View>
      <CloseModalButton dismissModal={dismissModal} />
      <View
        style={{
          alignSelf: "center",
          width: theme.contentWidth,
          backgroundColor: theme.wallbg,
          padding: 10,
          height: 100,
          borderRadius: 20,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <T.Title>Collection Name</T.Title>
        <TextInput />
      </View>

      <View style={{ flex: 2 }}></View>
    </Modal>
  );
}
