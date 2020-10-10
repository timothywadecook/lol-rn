import React from "react";
import useTheme from "../hooks/useTheme";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;

// component that floats at top and
export default function AnimatedHeader({
  y,
  dY,
  bufferY = 130,
  noBottomBounce = true,
  top,
  containerStyle,
  children,
}) {
  let yVal = !dY ? y : diffClamp(y, 0, dY);
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
                inputRange: [0, 1],
                outputRange: [0, -1],
              }),
            },
          ],
          backgroundColor: theme.wallbg,
          width: theme.windowWidth,
          //   borderBottomColor: theme.iconBg,
          //   borderBottomWidth: 1,
        },
        containerStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}
