import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ListListItem from "../ListItems/ListListItem";
import { Add } from "../Buttons/IconButtons";
import ProfileCard from "../Atomic/ProfileCard";
import * as T from "../Atomic/StyledText";
//
import useTheme from "../../hooks/useTheme";
//
import { listsService } from "../../services/feathersClient";
import { addLoadedLists } from "../../store/listsSlice";
import HorizontalThingList from "./HorizontalThingList";

export default function ListList({ userId, privateList }) {
  const theme = useTheme();
  const navigation = useNavigation();

  const sessionUserId = useSelector((state) => state.user._id);
  const canCreate = () => sessionUserId === userId;
  const dispatch = useDispatch();
  const fetchLists = async () => {
    try {
      const res = await listsService.find({
        query: { participants: userId, $limit: 1000 },
      });
      dispatch(addLoadedLists(res.data));
    } catch (error) {
      console.log("Error trying to fetch lists for user", userId, error);
    }
  };
  React.useEffect(() => {
    fetchLists();
  }, []);

  const privateListIds = useSelector((state) =>
    Object.keys(state.lists).filter(
      (listId) =>
        state.lists[listId].participants.includes(userId) &&
        state.lists[listId].participants.includes(sessionUserId) &&
        state.lists[listId].isPrivate
    )
  );
  const publicListIds = useSelector((state) =>
    Object.keys(state.lists).filter(
      (listId) =>
        state.lists[listId].participants.includes(userId) &&
        !state.lists[listId].isPrivate
    )
  );

  return (
    <View>
      {privateListIds.map((listId) => (
        <HorizontalThingList
          key={listId}
          listId={listId}
          canCreate={canCreate()}
        />
      ))}
      {publicListIds.map((listId) => (
        <HorizontalThingList
          key={listId}
          listId={listId}
          canCreate={canCreate()}
        />
      ))}
      {canCreate() && (
        <TouchableOpacity
          style={{
            width: theme.contentWidth,
            height: 80,
            backgroundColor: theme.wallbg,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            alignSelf: "center",
          }}
          onPress={() =>
            navigation.navigate("CreateOrEditList", {
              list: { isPrivate: false },
            })
          }
        >
          <Add active={true} />
        </TouchableOpacity>
      )}
    </View>
  );
}
