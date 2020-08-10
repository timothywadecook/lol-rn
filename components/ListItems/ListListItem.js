import React from "react";
import { View } from "react-native";

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
} from "react-native-gesture-handler";

export default function ListListItem({
  list,
  canView,
  canEdit,
  onMakePrivate,
  onMakePublic,
  onDeleteList,
}) {
  console.log("list ? ", list);
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
          <Ionicons
            style={{ paddingRight: 20, paddingLeft: 5 }}
            name={isPrivate ? "md-eye-off" : "md-globe"}
            size={24}
            color={isPrivate ? theme.iconDefault : theme.purple}
          />
          <H2 style={{ fontSize: 20, fontWeight: "normal" }}>{name}</H2>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* {isPrivate && <H2G>Private</H2G>} */}
          {participants.length > 1 && <IconButtons.IsShared active={true} />}
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}
