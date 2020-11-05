import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList } from "react-native";
//
import { listsService } from "../../services/feathersClient";
import { addLoadedLists } from "../../store/listsSlice";
import HorizontalThingList from "./HorizontalThingList";
import HorizontalRecommendedList from "./HorizontalRecommendedList";
import ListTile, { AddListTile } from "../ListItems/ListTile";

export default function ListList({
  userId,
  vertical = false,
  byCategory = false,
}) {
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

  if (byCategory) {
    // return all things from all lists
  }

  if (vertical) {
    return (
      <View>
        <FlatList
          data={[...privateListIds, ...publicListIds]}
          numColumns={2}
          renderItem={({ item }) => (
            <ListTile listId={item} canCreate={canCreate()} />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{}}
          // ListFooterComponent={<AddListTile />}
        />
      </View>
    );
  }

  return (
    <View style={{ paddingBottom: 200 }}>
      <HorizontalRecommendedList
        userId={userId}
        key={"recommendedList" + userId}
        canCreate={canCreate()}
      />
      {privateListIds.map((listId, i) => (
        <HorizontalThingList
          key={listId}
          listId={listId}
          canCreate={canCreate()}
        />
      ))}
      {publicListIds.map((listId, i) => (
        <HorizontalThingList
          key={listId}
          listId={listId}
          canCreate={canCreate()}
        />
      ))}
    </View>
  );
}
