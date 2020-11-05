import React from "react";
import { TouchableOpacity } from "react-native";
// Components
import { Feather } from "@expo/vector-icons";
import * as T from "../Atomic/StyledText";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;
import { SharedElement } from "react-navigation-shared-element";
// Hooks
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export default function QuickActionProfileButton({ y, tab }) {
  const theme = useTheme();
  const navigation = useNavigation();

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
        elevation: 8,
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
        borderWidth: 0.5,
        borderColor: theme.iconDefault,
      }}
    >
      <TouchableOpacity
        style={{
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
          color={tab === "Home" ? theme.purple : theme.primary}
        />
        <T.Label
          style={{ color: tab === "Home" ? theme.purple : theme.primary }}
        >
          Discover
        </T.Label>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: SIZE,
          width: SIZE,
          borderRadius: SIZE / 2,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("SearchThings")}
      >
        <Feather
          name="search"
          size={24}
          color={tab === "SearchThings" ? theme.purple : theme.primary}
        />
        <T.Label
          style={{
            color: tab === "SearchThings" ? theme.purple : theme.primary,
          }}
        >
          Things
        </T.Label>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: SIZE,
          width: SIZE,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: SIZE / 2,
        }}
        onPress={() => navigation.navigate("Collections")}
      >
        <Feather
          name="bookmark"
          size={24}
          color={tab === "Collections" ? theme.purple : theme.primary}
        />
        <T.Label
          style={{
            color: tab === "Collections" ? theme.purple : theme.primary,
          }}
        >
          Lists
        </T.Label>
      </TouchableOpacity>
    </Animated.View>
  );
}
