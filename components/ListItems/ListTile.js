import React from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import { ParticipantsRow } from "./ListListItem";
import { Image } from "react-native-elements";
import useTheme from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import useListService from "../../hooks/useListService";
import { thingsService } from "../../services/feathersClient";
import { Feather } from "@expo/vector-icons";

export default function ListTile({ listId, canCreate }) {
  const theme = useTheme();
  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants, things } = list;
  const SIZE = theme.windowWidth / 2.5;

  if (!things.length && !canCreate) {
    return null;
  }

  const { data } = useListService(thingsService, {
    _id: { $in: things.length && things },
  });
  return (
    <View style={{ padding: 15 }}>
      <View
        style={{
          height: SIZE / 2,
          width: SIZE,
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 5,
          marginBottom: 7,
        }}
      >
        <Image
          placeholderStyle={{ backgroundColor: theme.iconBg }}
          source={{ uri: data.length ? data[0].image : "null" }}
          style={{ width: SIZE, height: SIZE }}
        />
        <View
          style={{
            position: "absolute",
            left: 5,
            bottom: 5,
            backgroundColor: theme.wallbg,
            borderRadius: 10,
            padding: 5,
            zIndex: 2,
          }}
        >
          <T.H2>{things.length}</T.H2>
        </View>
        <View style={{ position: "absolute", right: 0, bottom: 5 }}>
          <ParticipantsRow participants={participants} />
        </View>
      </View>

      <T.H2 numberOfLines={1} ellipsizeMode="tail">
        {name}
      </T.H2>
    </View>
  );
}

export function AddListTile() {
  const navigation = useNavigation();
  const theme = useTheme();
  const SIZE = theme.windowWidth / 2.5;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CreateOrEditList")}
      style={{ padding: 15 }}
    >
      <View
        style={{
          width: SIZE,
          height: SIZE / 1.5,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 5,
          marginBottom: 7,
          backgroundColor: theme.iconBg,
        }}
      >
        <Feather name="plus" size={SIZE / 2} color={theme.purple} />
      </View>
      <T.H2 numberOfLines={1} ellipsizeMode="tail"></T.H2>
    </TouchableOpacity>
  );
}
