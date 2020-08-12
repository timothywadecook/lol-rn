import React from "react";
import { View, ActivityIndicator } from "react-native";

import { Title, H2G, H2 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SquareIconButton from "./SwipableSquareIconButton";
import IconButtons from "../Buttons/IconButtons";

import { Ionicons } from "@expo/vector-icons";

//
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native-gesture-handler";
import { usersService } from "../../services/feathersClient";
import UserAvatar from "react-native-user-avatar";

export default function ListListItem({
  list,
  canView,
  canEdit,
  onMakePrivate,
  onMakePublic,
  onDeleteList,
}) {
  const { _id, name, isPrivate, participants } = list;
  const theme = useTheme();

  const navigation = useNavigation();
  const onViewList = () => {
    navigation.navigate("List", { listId: list._id });
  };

  if (!canView()) {
    return null;
  }
  return (
    <Swipeable
      renderRightActions={() =>
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
          width: theme.windowWidth,
          paddingHorizontal: 10,
          backgroundColor: theme.wallbg,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* <Ionicons
            style={{ paddingRight: 20, paddingLeft: 5 }}
            name={participants.length > 1 ? "md-people" : "md-person"}
            size={24}
            color={theme.iconDefault}
          /> */}
          {isPrivate && (
            <Ionicons
              style={{ paddingRight: 20, paddingLeft: 5 }}
              name="md-eye-off"
              size={24}
              color={theme.iconDefault}
            />
          )}
          <H2 style={{ fontSize: 20, fontWeight: "normal" }}>{name}</H2>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ParticipantsRow participants={participants} />
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
        // inverted={true}
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

  return (
    <UserAvatar
      style={{ marginHorizontal: 7, borderWidth: 0, borderColor: "white" }}
      bgColor="transparent"
      size={24}
      name={user.name}
      src={user.avatar}
    />
  );
}
