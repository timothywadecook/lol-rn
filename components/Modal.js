import React from "react";
import { View, Modal, Image } from "react-native";
import { FancyH1 } from "./Atomic/StyledText";
import logo from "../assets/logo.png";

import SubmitButton from "./Buttons/SubmitButton";
import useTheme from "../hooks/useTheme";

const Text = {
  create: "Great post! \nYou are muy interesante",
  follow: "DOPE. Following is dope.",
};

export default function MyModal({ showModal, setShowModal, type, message }) {
  const theme = useTheme();

  const text = message || Text[type];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      onDismiss={() => setShowModal(false)}
    >
      <View
        style={{
          flex: 1,

          backgroundColor: theme.bg,
        }}
      >
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={logo} style={{ width: 200, height: 200 }} />
          <FancyH1 style={{ textAlign: "center" }}>{text}</FancyH1>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SubmitButton title="Dismiss" onPress={() => setShowModal(false)} />
        </View>
      </View>
    </Modal>
  );
}
