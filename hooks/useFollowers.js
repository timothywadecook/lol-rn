import React from "react";
import { followsService } from "../services/feathersClient";
import useListService from "./useListService";

export default function useFollowers(userId) {
  const [
    data,
    refresh,
    refreshing,
    fetchmore,
    loading,
    moreAvailable,
  ] = useListService(followsService, { following: userId });
  return [
    data.map((follow) => follow.follower),
    refresh,
    refreshing,
    fetchmore,
    loading,
    moreAvailable,
  ];
}
