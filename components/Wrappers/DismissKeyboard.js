import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const DismissKeyboard = ({ callback, children }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        callback ? callback() : null;
        Keyboard.dismiss();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
