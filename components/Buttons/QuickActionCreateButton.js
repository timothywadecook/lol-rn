import React from "react";
import { TouchableOpacity } from "react-native";
// Components
import { Ionicons, Entypo } from "@expo/vector-icons";
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

  const BOTTOM = 40;
  const SIZE = 60;

  const diffClampY = diffClamp(y, 0, 500);

  return (
    <Animated.View
      style={{
        height: SIZE,
        width: SIZE,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 40,
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
        style={{
          padding: 10,
          elevation: 3,
          backgroundColor: theme.purple,
          shadowColor: theme.wallbg,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          height: SIZE,
          width: SIZE,
          borderRadius: 30,
        }}
        onPress={() => navigation.navigate("Create")}
      >
        <Ionicons name="md-create" size={30} color={theme.white} />
        {/* <Entypo name="new-message" size={30} color={theme.white} /> */}
      </TouchableOpacity>
    </Animated.View>
  );
}
