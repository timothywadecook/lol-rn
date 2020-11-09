import React from "react";
import { useSelector } from "react-redux";
import { listsService } from "../services/feathersClient";
import { addLoadedLists } from "../store/listsSlice";
import useListService from '../hooks/useListService';

export default function useVisibleLists() {
  const following = useSelector(state=>state.follows.following);
  return useListService(listsService, {participants: {$in: following},isPrivate: false }, [following], false, addLoadedLists) 
}
