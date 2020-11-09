import React from "react";
import { followsService } from "../services/feathersClient";
import useListService from "./useListService";

export default function useFollowers(userId) {
  return useListService(followsService, { following: userId });
}
