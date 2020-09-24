import React from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
// Components
import { Feather } from "@expo/vector-icons";
import Avatar from "../Atomic/Avatar";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate, abs } = Animated;
// Hooks
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export default function QuickActionProfileButton({ y }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const sessionUser = useSelector((state) => state.user);

  const SIZE = 46;
  const BOTTOM = 115;

  const diffClampY = diffClamp(y, 0, 500);

  return (
    <Animated.View
      style={{
        height: SIZE,
        width: SIZE,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        // right: 47,
        right: 32,
        bottom: BOTTOM,
        zIndex: 3,

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
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          elevation: 3,
          backgroundColor: theme.wallbg,
          alignItems: "center",
          justifyContent: "center",
          height: SIZE,
          width: SIZE,
          borderRadius: 23,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        {/* <Feather name="user" size={28} color={theme.white} /> */}
        <Avatar user={sessionUser} size={SIZE} />
      </TouchableOpacity>
    </Animated.View>
  );
}
