import React from "react";
import { TouchableOpacity } from "react-native";
// Components
import { Ionicons } from "@expo/vector-icons";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;
// Hooks
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export default function QuickActionCreateButton({ y }) {
  const theme = useTheme();
  const navigation = useNavigation();

  const diffClampY = diffClamp(y, 0, 500);

  return (
    <Animated.View
      style={{
        height: 140,
        width: 70,
        backgroundColor: theme.wallbg,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderRadius: 30,
        position: "absolute",
        right: 5,
        bottom: 30,
        zIndex: 2,
        elevation: 2,
        opacity: interpolate(diffClampY, {
          inputRange: [250, 300],
          outputRange: [1, 0],
        }),
        transform: [
          {
            translateY: interpolate(diffClampY, {
              inputRange: [200, 400],
              outputRange: [0, 300],
              extrapolateLeft: "clamp",
            }),
          },
        ],
      }}
    ></Animated.View>
  );
}
