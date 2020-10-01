import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import * as T from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { setCreatorQueryAndRefresh } from "../../store/feedSlice";

export default function SelectableUserAddNew({ size = 40 }) {
  const theme = useTheme();
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Search Users");
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 5,
        margin: 5,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Feather
        style={{ height: size }}
        name="search"
        size={size}
        color={theme.iconDefault}
      />

      <T.H3 style={{ marginTop: 3 }}>Add User</T.H3>
    </TouchableOpacity>
  );
}

export function SelectableUserAll({ size = 40 }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const query = useSelector((state) => state.feed.query.creator["$in"]);

  const onPress = () => {
    dispatch(setCreatorQueryAndRefresh([]));
  };

  const active = query.length === 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 5,
        margin: 5,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: active ? theme.white : theme.iconBg,
          borderRadius: size / 2,
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Entypo
          // style={{ height: size }}
          name="globe"
          size={size / 1.5}
          color={active ? theme.purple : theme.iconDefault}
        />
      </View>

      <T.H3 style={{ marginTop: 3 }}>World</T.H3>
    </TouchableOpacity>
  );
}

export function SelectableUserFollowing({ size = 40 }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.follows.following);
  const query = useSelector((state) => state.feed.query.creator["$in"]);

  const active = following.length === query.length;

  const onPress = () => {
    dispatch(setCreatorQueryAndRefresh(following));
  };

  if (following.length < 2) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 5,
        margin: 5,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: active ? theme.white : theme.iconBg,
          borderRadius: size / 2,
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather
          name="users"
          size={size / 2}
          color={active ? theme.purple : theme.iconDefault}
        />
      </View>

      <T.H3 style={{ marginTop: 3 }}>Following</T.H3>
    </TouchableOpacity>
  );
}
