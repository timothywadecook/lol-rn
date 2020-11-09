import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { Accessory } from "react-native-elements";

import { Title, H2G, H2, H4 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SquareIconButton from "./SwipableSquareIconButton";

import { Feather } from "@expo/vector-icons";

//
import { useNavigation } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { listsService } from "../../services/feathersClient";
import useUser from "../../hooks/useUser";
import Avatar from "../Atomic/Avatar";

import { removeDeletedList, updateList } from "../../store/listsSlice";

export default function ListListItem({
  showArrow = true,
  swipable = true,
  onPress = null,
  listId,
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants } = list;

  const onViewList = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("List", { listId });
    }
  };

  const onDeleteList = async () => {
    try {
      listsService.remove(listId);
      dispatch(removeDeletedList(listId));
    } catch (error) {
      console.log("Error onDeleteList for listId", listId, error);
    }
  };

  const onMakePrivate = async () => {
    try {
      const updatedList = await listsService.patch(listId, { isPrivate: true });
      dispatch(updateList(updatedList));
    } catch (error) {
      console.log("Error onMakePrivate for listId", listId, error);
    }
  };

  const onMakePublic = async () => {
    try {
      const updatedList = await listsService.patch(listId, {
        isPrivate: false,
      });
      dispatch(updateList(updatedList));
    } catch (error) {
      console.log("Error onMakePublic for listId", listId, error);
    }
  };

  const sessionUserId = useSelector((state) => state.user._id);
  const canView = () =>
    !list.isPrivate || list.participants.includes(sessionUserId);
  const canEdit = () => list.participants.includes(sessionUserId);

  if (!canView()) {
    return null;
  }
  return (
    <Swipeable
      style={{ alignSelf: "stretch" }}
      renderRightActions={() =>
        !canEdit() || !swipable ? null : (
          <View
            style={{ width: theme.windowWidth * 0.43, flexDirection: "row" }}
          >
            <SquareIconButton
              icon="delete"
              color="red"
              onPress={onDeleteList}
            />

            {isPrivate ? (
              <SquareIconButton
                color={theme.wallbg}
                text="Make Public"
                onPress={onMakePublic}
              />
            ) : (
              <SquareIconButton
                color={theme.wallbg}
                text="Make Private"
                onPress={onMakePrivate}
              />
            )}
          </View>
        )
      }
    >
      <TouchableWithoutFeedback
        onPress={onViewList}
        style={{
          // width: "100%",
          flex: 1,
          // alignSelf: "stretch",
          paddingHorizontal: 10,
          backgroundColor: theme.bg,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Title
            style={{
              marginVertical: 4,
              // fontSize: 14,
              // fontWeight: "normal",
            }}
          >
            {name}
          </Title>
          <H2G>{list.things.length} items</H2G>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ParticipantsRow participants={participants} />
          {showArrow && (
            <Feather
              name="chevron-right"
              size={30}
              color={theme.iconDefault}
              style={{ paddingHorizontal: 10 }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

export function ParticipantsIcon({ participants, size = 50 }) {
  const sessionUser = useSelector((state) => state.user);
  const otherUsers = participants.filter((uId) => uId !== sessionUser._id);
  const user = useUser(otherUsers[0]);
  //source={{ uri: sessionUser.avatar }}
  return (
    <View
      style={{
        width: size + 10 + otherUsers.length * 15 - 15,
        height: size + 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {otherUsers.map((user, i) => (
        <ParticipantAvatar
          key={user._id}
          size={size}
          participantId={user}
          style={{
            position: "absolute",
            left: i > 0 ? i * 15 : 5,
            margin: 0,
          }}
        />
      ))}
    </View>
  );
}

export function ParticipantsRow({ participants }) {
  return (
    <View style={{ flexGrow: 0, paddingRight: 5 }}>
      <FlatList
        horizontal={true}
        data={participants}
        renderItem={({ item }) => <ParticipantAvatar participantId={item} />}
        initialNumToRender={5}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export function ParticipantAvatar({ participantId, style, size, linkToProfile=false }) {
  const user = useUser(participantId);
  const navigation= useNavigation();
  const onPress = ()=> linkToProfile?navigation.navigate('Profile', {user}):null;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={style}>
      <Avatar
        size={size}
        style={{ marginHorizontal: 4, backgroundColor: "transparent" }}
        user={user}
      />
    </TouchableOpacity>
  );
}
