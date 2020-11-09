import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { listsService } from "../services/feathersClient";
import { addLoadedLists } from "../store/listsSlice";

export default function useVisibleLists(userId) {
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.user._id);

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
        state.lists[listId].isPrivate && (sessionUserId === userId || !!state.lists[listId].things.length)
    )
  );

  const publicListIds = useSelector((state) =>
    Object.keys(state.lists).filter(
      (listId) =>
        state.lists[listId].participants.includes(userId) &&
        !state.lists[listId].isPrivate && (sessionUserId === userId || !!state.lists[listId].things.length)
    )
  );

  return [privateListIds, publicListIds];
}
