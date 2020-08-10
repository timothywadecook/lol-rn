import React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Title } from "../Atomic/StyledText";

import useTheme from "../../hooks/useTheme";

export default SubmitButton = ({
  intent = "info",
  onPress,
  title,
  isProcessing,
}) => {
  const theme = useTheme();
  const bgColor = {
    secondary: "transparent",
    primary: theme.purple,
    info: "transparent",
  };
  const fontWeight = {
    primary: "normal",
    secondary: "normal",
    info: "normal",
  };
  const fontColor = {
    secondary: theme.purple,
    primary: theme.primary,
    info: theme.iconDefault,
  };
  return (
    <View>
      {isProcessing ? (
        <ActivityIndicator size="small" />
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={{
            marginVertical: 15,
            borderRadius: 5,
            paddingVertical: 6,
            width: theme.contentWidth,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor[intent],
          }}
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
