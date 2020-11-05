import React from "react";
import useTheme from "../hooks/useTheme";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;

export default function AnimatedHeader({
  y,
  dy,
  top,
  containerStyle,
  children,
}) {
  const speedFactor = 2;
  const cliff = 200;
  let yVal = !dy ? y : diffClamp(y, 0, cliff + dy * speedFactor);
  const theme = useTheme();

  return (
    <Animated.View
      style={[
        {
          top: top,
          position: "absolute",
          zIndex: 1,
          transform: [
            {
              translateY: interpolate(yVal, {
                inputRange: [cliff, cliff + 1],
                outputRange: [0, -1 / speedFactor],
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
