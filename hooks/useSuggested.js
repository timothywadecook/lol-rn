import React from "react";
import { useSelector } from "react-redux";
import { usersService } from "../services/feathersClient";
import useListService from "./useListService";

export default function useSuggested() {
  const following = useSelector((state) => state.follows.following);
  const sessionUserId = useSelector((state) => state.user._id);

  // show all users not in following
  return useListService(usersService, {
    _id: { $nin: [sessionUserId, ...following] },
  });
}
