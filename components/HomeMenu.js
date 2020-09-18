import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { Feather, Ionicons } from "@expo/vector-icons";
// Animations
import Animated from "react-native-reanimated";
import { diffClamp } from "react-native-redash";
const { interpolate } = Animated;
// Components
import Avatar from "./Atomic/Avatar";
import logo from "../assets/logo.png";
// Hooks
import useTheme from "../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

export const HEIGHT = 110;

export default function HomeMenu({ y }) {
  const theme = useTheme();
  const navigation = useNavigation();

  const MIN = 200;

  const sessionUser = useSelector((state) => state.user);

  const diffClampY = diffClamp(y, 0, MIN + 2 * HEIGHT);

  return (
    <Animated.View
      style={{
        // paddingTop: theme.topPad + 20,
        top: theme.topPad + 10,
        // height: HEIGHT,
        position: "absolute",
        zIndex: 2,
        transform: [
          {
            translateY: interpolate(diffClampY, {
              inputRange: [MIN, MIN + 2 * HEIGHT],
              outputRange: [0, -HEIGHT],
              extrapolateLeft: "clamp",
            }),
          },
        ],
        backgroundColor: "transparent",
        // paddingVertical: 10,
        width: theme.windowWidth,
        opacity: interpolate(diffClampY, {
          inputRange: [250, 300],
          outputRange: [1, 0],
        }),
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",

          padding: 5,
          borderRadius: 15,
          margin: 5,
          elevation: 5,
          backgroundColor: theme.wallbg,
          shadowRadius: 3,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        {/* <View
          style={{
            width: 36,
            height: 36,
            margin: 5,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: theme.iconBg,
            borderRadius: 18,
            // borderWidth: 1,
            // borderColor: theme.purple,
          }}
        >
          <Image source={logo} style={{ width: 30, height: 30 }} />
        </View> */}
        <TouchableOpacity
          style={{ padding: 7 }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Avatar user={sessionUser} size={30} />
        </TouchableOpacity>

        <FakeTextInput />
        <TouchableOpacity
          style={{ padding: 7 }}
          onPress={() => navigation.navigate("Collections")}
        >
          <Ionicons
            name="md-bookmarks"
            size={30}
            color={theme.iconDefault}
            // style={{ paddingHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function FakeTextInput({}) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Create");
      }}
      style={{
        // width: "100%",
        flex: 1,
        // alignSelf: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 7,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderRadius: 20,
        backgroundColor: theme.iconBg,
        // borderWidth: 1,
        // borderColor: theme.iconBg,
        // height: 38,
      }}
    >
      {/* <Feather
        name="search"
        size={20}
        color={theme.iconDefault}
        style={{ paddingRight: 5 }}
      /> */}
      <TextInput
        onFocus={() => {
          navigation.navigate("Create");
        }}
        style={{
          flex: 1,
          color: theme.primary,
        }}
        keyboardAppearance={theme.theme}
        placeholderTextColor={theme.iconDefault}
        placeholder="What do you like?"
      />
    </TouchableOpacity>
  );
}
