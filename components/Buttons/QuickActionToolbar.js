import React from "react";
import { TouchableOpacity } from "react-native";
// Components
import { Feather, Ionicons } from "@expo/vector-icons";
import * as T from "../Atomic/StyledText";
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

  const [showModal, setShowModal] = React.useState(false);

  const SIZE = 54;
  const BOTTOM = 45;

  const diffClampY = diffClamp(y, 0, 500);

  return (
    <Animated.View
      style={{
        width: 240,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        padding: 10,
        borderRadius: (SIZE + 20) / 2,
        backgroundColor: theme.wallbg,
        right: theme.windowWidth / 2 - 120,
        bottom: BOTTOM,
        zIndex: 3,
        elevation: 3,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
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
          // backgroundColor: theme.iconBg,
          alignItems: "center",
          justifyContent: "center",
          height: SIZE,
          width: SIZE,
          borderRadius: SIZE / 2,
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Feather
          name="home" // users
          size={24}
          color={!showModal ? theme.purple : theme.primary}
        />
        <T.Label style={{ color: theme.purple }}>Discover</T.Label>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          // backgroundColor: theme.iconBg,
          height: SIZE,
          width: SIZE,
          borderRadius: SIZE / 2,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("SearchThings")}
      >
        <Feather name="search" size={24} color={theme.primary} />
        <T.Label>Things</T.Label>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: SIZE,
          width: SIZE,
          // backgroundColor: theme.iconBg,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: SIZE / 2,
        }}
        onPress={() => navigation.navigate("Collections")}
      >
        <Feather
          name="bookmark"
          size={24}
          color={showModal ? theme.purple : theme.primary}
        />
        <T.Label>Saved</T.Label>
      </TouchableOpacity>
    </Animated.View>
  );
}
