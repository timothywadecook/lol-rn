import React from "react";
import { View } from "react-native";
import { Image, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import * as T from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";
import useListService from "../../hooks/useListService";
import { thingsService } from "../../services/feathersClient";
import { useNavigation } from "@react-navigation/native";
import { ParticipantsIcon } from "./ListListItem";

function SelectableCircle({ selected, onPress, size = 50, children }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        padding: 5,
        margin: 5,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: selected && theme.white,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: size / 5,
          overflow: "hidden",
          height: size,
          width: size,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

function MyList({ listId, canCreate, size = 50, onPress, selected, withName = false }) {
  const theme = useTheme();

  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants, things } = list;
  console.log('list name for avatar =', name)

  const { data } = useListService(thingsService, {
    _id: { $in: things },
  }, [things]);

  return (
    <View style={{alignItems: "center"}}>
    <SelectableCircle size={size} selected={selected} onPress={onPress}>
      {!data.length ? (
        <T.Title style={{ color: theme.purple }}>{name[0]}</T.Title>
      ) : (
        <Image
          placeholderStyle={{ backgroundColor: theme.iconBg }}
          source={{ uri: data[0].image}}
          style={{ width: size, height: size }}
        />
      )}
    </SelectableCircle>
     {withName && <T.H3 numberOfLines={1} ellipsizeMode="tail">{name}</T.H3>}
    </View>
  );
}

function SharedList({ size = 50, participants }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = () => navigation.navigate("CreateOrEditList");
  const sessionUser = useSelector((state) => state.user);
  const otherUsers = participants.filter((uId) => uId !== sessionUser._id);

  return (
    <SelectableCircle onPress={onPress}>
      {otherUsers.map((uId) => (
        <ParticipantsAvatar participantId={uId} />
      ))}
    </SelectableCircle>
  );
}
function ParticipantAvatar({ participantId }) {
  const user = useUser(participantId);
  return (
    <View style={{ justifyContent: "center" }}>
      <Avatar user={user} />
    </View>
  );
}

function AddNew({ size = 50 }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = () => navigation.navigate("CreateOrEditList");

  return (
    <SelectableCircle onPress={onPress}>
      <Icon name="plus" type="feather" color={theme.iconDefault} />
    </SelectableCircle>
  );
}

export default {
  MyList,
  AddNew,
};