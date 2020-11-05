import React from "react";
import useTheme from "../hooks/useTheme";
import { BlurView } from "expo-blur";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;

export default function AnimatedFooter({ y, dy, containerStyle, children }) {
  const cliff = 180;
  let yVal = !dy ? y : diffClamp(y, 0, cliff + dy);
  const theme = useTheme();

  return (
    <Animated.View
      style={[
        {
          bottom: 0,
          position: "absolute",
          zIndex: 1,
          transform: [
            {
              translateY: interpolate(yVal, {
                inputRange: [cliff, cliff + 1],
                outputRange: [0, 1],
                extrapolateLeft: "clamp",
              }),
            },
          ],
          width: theme.windowWidth,
        },
        containerStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}
