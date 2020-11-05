import React from "react";
import { followsService } from "../services/feathersClient";
import useListService from "./useListService";

export default function useFollowing(userId) {
  return ({
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
  } = useListService(followsService, { follower: userId }));
  // return {
  //   data.map((follow) => follow.following),
  //   refresh,
  //   refreshing,
  //   fetchMore,
  //   loading,
  //   moreAvailable,
  // };
}
