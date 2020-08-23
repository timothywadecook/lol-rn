import React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Title } from "../Atomic/StyledText";

import useTheme from "../../hooks/useTheme";

export default SubmitButton = ({
  style,
  intent = "info",
  onPress,
  title,
  isProcessing,
  fullwidth = false,
}) => {
  const theme = useTheme();
  const bgColor = {
    secondary: "transparent",
    primary: theme.purple,
    info: theme.bg,
  };
  const fontWeight = {
    primary: "normal",
    secondary: "normal",
    info: "normal",
  };
  const fontColor = {
    secondary: theme.purple,
    primary: theme.white,
    info: theme.iconDefault,
  };
  return (
    <View>
      {isProcessing ? (
        <ActivityIndicator size="small" />
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[
            {
              marginVertical: 10,
              borderRadius: 5,
              paddingVertical: 7.5,
              paddingHorizontal: 20,
              width: fullwidth ? theme.contentWidth : null,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: bgColor[intent],
            },
            style,
          ]}
        >
          <Title
            style={{
              color: fontColor[intent],
              fontWeight: fontWeight[intent],
              fontSize: 20,
            }}
          >
            {title}
          </Title>
        </TouchableOpacity>
      )}
    </View>
  );
};
