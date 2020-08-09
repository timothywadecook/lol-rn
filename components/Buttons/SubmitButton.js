import React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import AnimateExpand from "../Wrappers/AnimateExpand";
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
    primary: theme.purple,
    info: "transparent",
  };
  const fontWeight = {
    primary: "normal",
    info: "normal",
  };
  const fontColor = {
    primary: theme.primary,
    info: theme.purple,
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
            paddingVertical: 3,
            width: theme.contentWidth,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor[intent],
          }}
        >
          <Title
            style={{ color: fontColor[intent], fontWeight: fontWeight[intent] }}
          >
            {title}
          </Title>
        </TouchableOpacity>
      )}
    </View>
  );
};
