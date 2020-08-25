import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import ListListItem from "../ListItems/ListListItem";
import { Add } from "../Buttons/IconButtons";
import ProfileCard from "../Atomic/ProfileCard";
//
import useTheme from "../../hooks/useTheme";
//
import { listsService } from "../../services/feathersClient";
import { addLoadedLists } from "../../store/listsSlice";

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

  if (privateList) {
    const privateListIds = useSelector((state) =>
      Object.keys(state.lists).filter(
        (listId) =>
          state.lists[listId].participants.includes(userId) &&
          state.lists[listId].isPrivate
      )
    );

    return (
      <ProfileCard
        title="Secret Lists"
        renderRightChild={
          canCreate()
            ? () => (
                <Add
                  onPress={() =>
                    navigation.navigate("CreateOrEditList", {
                      list: { isPrivate: true },
                    })
                  }
                />
              )
            : null
        }
      >
        {privateListIds.map((listId) => (
          <ListListItem key={listId} listId={listId} />
        ))}
      </ProfileCard>
    );
  }

  const publicListIds = useSelector((state) =>
    Object.keys(state.lists).filter(
      (listId) =>
        state.lists[listId].participants.includes(userId) &&
        !state.lists[listId].isPrivate
    )
  );

  return (
    <ProfileCard
      title="Public Lists"
      renderRightChild={
        canCreate()
          ? () => (
              <Add
                onPress={() =>
                  navigation.navigate("CreateOrEditList", {
                    list: { isPrivate: false },
                  })
                }
              />
            )
          : null
      }
    >
      {publicListIds.map((listId) => (
        <ListListItem key={listId} listId={listId} />
      ))}
    </ProfileCard>
  );
}
