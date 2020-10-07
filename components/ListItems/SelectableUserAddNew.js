import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import * as T from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { setCreatorQueryAndRefresh } from "../../store/feedSlice";
import { AnimateExpandWidth } from "../Wrappers/AnimateExpand";

export default function SelectableUserAddNew({ size = 50 }) {
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
      <View
        style={{
          borderRadius: size / 2,
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name="user-plus" size={size / 1.7} color={theme.iconDefault} />
      </View>

      <T.H3 style={{ marginTop: 3 }}>Add User</T.H3>
    </TouchableOpacity>
  );
}

export function SelectableUserAll({ size = 50 }) {
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
        marginRight: 5,
        marginLeft: 15,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Ionicons
        iconStyle={{ padding: 0, margin: 0 }}
        name="md-globe"
        size={size / 1}
        color={active ? theme.purple : theme.iconDefault}
      />
      <T.H3 style={{ marginTop: 3 }}></T.H3>
    </TouchableOpacity>
  );
}

export function SelectableUserMe({ size = 50 }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const query = useSelector((state) => state.feed.query.creator["$in"]);
  const sessionUser = useSelector((state) => state.user);

  const onSelect = () => {
    dispatch(setCreatorQueryAndRefresh([sessionUser._id]));
  };

  const onUnselect = () => {
    dispatch(setCreatorQueryAndRefresh([]));
  };

  const active = query.length === 1 && query.includes(sessionUser._id);

  return (
    <TouchableOpacity
      onPress={active ? onUnselect : onSelect}
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
          margin: 0,
          padding: 0,
        }}
      >
        <Feather
          name="user"
          size={size / 1.7}
          color={active ? theme.purple : theme.iconDefault}
        />
      </View>

      <T.H3 style={{ marginTop: 3 }}>me</T.H3>
    </TouchableOpacity>
  );
}

export function SelectableUserFollowing({ size = 50 }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.follows.following);
  const query = useSelector((state) => state.feed.query.creator["$in"]);

  const active = following.length === query.length;

  const onSelect = () => {
    dispatch(setCreatorQueryAndRefresh(following));
  };

  const onUnselect = () => {
    dispatch(setCreatorQueryAndRefresh([]));
  };

  if (following.length < 2) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={active ? onUnselect : onSelect}
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
          margin: 0,
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather
          name="users"
          size={size / 1.7}
          color={active ? theme.purple : theme.iconDefault}
        />
      </View>

      <T.H3 style={{ marginTop: 3 }}>following</T.H3>
    </TouchableOpacity>
  );
}
