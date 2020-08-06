import React from "react";
import { Animated } from "react-native";
import { useAnimation } from "../../hooks/useAnimation";

const AnimateExpand = ({
  doAnimation,
  height,
  children,
  fast = false,
  style,
}) => {
  const animation = useAnimation({ doAnimation, duration: fast ? 200 : 700 });

  return (
    <Animated.View
      style={[
        {
          height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, height ? height : 100],
          }),
          overflow: "hidden",
          alignItems: "center",
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimateExpand;
