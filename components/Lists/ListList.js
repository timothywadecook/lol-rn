import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
//
import { listsService } from "../../services/feathersClient";
import { addLoadedLists } from "../../store/listsSlice";
import HorizontalThingList from "./HorizontalThingList";
import HorizontalRecommendedList from "./HorizontalRecommendedList";

export default function ListList({ userId }) {
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
          openDelay={i * 500}
        />
      ))}
      {publicListIds.map((listId, i) => (
        <HorizontalThingList
          key={listId}
          listId={listId}
          canCreate={canCreate()}
          openDelay={(i + privateListIds.length) * 500}
        />
      ))}
    </View>
  );
}
