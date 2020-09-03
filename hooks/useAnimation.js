import { Animated } from "react-native";
import React, { useState, useEffect } from "react";

export const useAnimation = ({ doAnimation, duration }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: doAnimation ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [doAnimation]);

  return animation;
};
