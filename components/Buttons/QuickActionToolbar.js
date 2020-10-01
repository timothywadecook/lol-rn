import React from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
// Components
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import Avatar from "../Atomic/Avatar";
import Collections from "../../screens/Collections";
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
  const sessionUser = useSelector((state) => state.user);

  const [showModal, setShowModal] = React.useState(false);

  const SIZE = 46;
  const BOTTOM = 45;

  const diffClampY = diffClamp(y, 0, 500);

  return (
    <Animated.View
      style={{
        width: 220,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        padding: 10,
        borderRadius: (SIZE + 20) / 2,
        backgroundColor: theme.wallbg,
        right: theme.windowWidth / 2 - 110,
        bottom: BOTTOM,
        zIndex: 3,
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
          elevation: 3,
          backgroundColor: theme.iconBg,
          alignItems: "center",
          justifyContent: "center",
          height: SIZE,
          width: SIZE,
          borderRadius: 23,
        }}
        onPress={() => navigation.navigate("Collections")}
        // onPress={() => setShowModal(true)}
      >
        <Ionicons
          name="md-bookmarks" // "md-list"
          size={28}
          color={showModal ? theme.purple : theme.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          elevation: 3,
          backgroundColor: theme.iconBg,
          height: SIZE,
          width: SIZE,
          borderRadius: 23,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
        }}
        onPress={() => navigation.navigate("SearchThings")}
      >
        <Feather name="plus" size={28} color={theme.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: SIZE,
          width: SIZE,
          elevation: 3,
          backgroundColor: theme.iconBg,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 23,
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Avatar user={sessionUser} size={40} />
      </TouchableOpacity>
    </Animated.View>
  );
}
