import React from "react";
import { Button, ActivityIndicator, View } from "react-native";
import AnimateExpand from "../Wrappers/AnimateExpand";

import useTheme from "../../hooks/useTheme";

export default SubmitButton = ({
  bg,
  show,
  onPress,
  title,
  isProcessing,
  height = 50,
}) => {
  const theme = useTheme();
  return (
    <AnimateExpand doAnimation={show} height={height}>
      {isProcessing ? (
        <ActivityIndicator size="small" />
      ) : (
        <View
          style={{
            marginVertical: 5,
            borderRadius: 5,
            paddingHorizontal: 10,
            backgroundColor: bg && theme.primary,
          }}
        >
          <Button onPress={onPress} title={title} color={theme.purple} />
        </View>
      )}
    </AnimateExpand>
  );
};
