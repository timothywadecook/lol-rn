import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";

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
import { usersService, listsService } from "../../services/feathersClient";
import Avatar from "../Atomic/Avatar";

import { removeDeletedList, updateList } from "../../store/listsSlice";

export default function ListListItem({ privateList, listId }) {
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.lists[listId]);
  const { name, isPrivate, participants } = list;

  const onViewList = () => {
    navigation.navigate("List", { listId });
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
      renderLeftActions={() =>
        !canEdit() ? null : (
          <View
            style={{ width: theme.windowWidth * 0.43, flexDirection: "row" }}
          >
            {isPrivate ? (
              <SquareIconButton
                color={theme.bg}
                text="Make Public"
                onPress={onMakePublic}
              />
            ) : (
              <SquareIconButton
                color={theme.bg}
                text="Make Private"
                onPress={onMakePrivate}
              />
            )}

            <SquareIconButton
              icon="delete"
              color="red"
              onPress={onDeleteList}
            />
          </View>
        )
      }
    >
      <TouchableWithoutFeedback
        onPress={onViewList}
        style={{
          width: "100%",
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
            // alignItems: "center",
          }}
        >
          <H2 style={{ marginVertical: 4 }}>{name}</H2>
          <H4>14 items</H4>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ParticipantsRow participants={participants} />
          <Feather
            name="chevron-right"
            size={30}
            color={theme.iconDefault}
            style={{ paddingHorizontal: 10 }}
          />
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

function ParticipantsRow({ participants }) {
  // return a horizontal list, flex 1, scrollable

  return (
    <View style={{ flexGrow: 0 }}>
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

function ParticipantAvatar({ participantId }) {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    usersService
      .get(participantId)
      .then((res) => setUser(res))
      .catch((e) =>
        console.log(
          "Error getting participant for participant avatar",
          participantId,
          e.message
        )
      );
  }, []);

  if (!user._id) {
    return <ActivityIndicator size="small" />;
  }

  return <Avatar style={{ marginHorizontal: 4 }} user={user} />;
}
