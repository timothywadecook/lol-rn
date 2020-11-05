import React from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import { Image } from "react-native-elements";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import useListService from "../../hooks/useListService";
import { thingsService } from "../../services/feathersClient";
import { Feather } from "@expo/vector-icons";

export default function ListButton({ listId, canCreate }) {
  const theme = useTheme();
  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants, things } = list;
  const SIZE = 24;

  if (!things.length && !canCreate) {
    return null;
  }

  const { data } = useListService(thingsService, {
    _id: { $in: things.length && things },
  });

  return (
    <View
      style={{
        padding: 8,
        borderRadius: (SIZE + 4) / 2,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.iconBg,
        margin: 3,
      }}
    >
      <View
        style={{
          alignItems: "center",
          overflow: "hidden",
          borderRadius: SIZE / 2,
          marginRight: 7,
        }}
      >
        <Image
          source={{ uri: data.length ? data[0].image : "null" }}
          style={{ width: SIZE, height: SIZE }}
        />
      </View>
      <T.H3 numberOfLines={1} ellipsizeMode="tail">
        {name}
      </T.H3>
    </View>
  );
}

export function AddListButton() {
  const navigation = useNavigation();
  const theme = useTheme();
  const SIZE = 24;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CreateOrEditList")}
      style={{
        borderRadius: (SIZE + 4) / 2,
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.iconBg,
        margin: 2,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 5,
        }}
      >
        <Feather name="plus" size={SIZE - 4} color={theme.purple} />
      </View>
      <T.H3 numberOfLines={1} ellipsizeMode="tail">
        ADD LIST
      </T.H3>
    </TouchableOpacity>
  );
}
