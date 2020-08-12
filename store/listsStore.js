import { createSlice } from "@reduxjs/toolkit";
import * as Haptics from "expo-haptics";

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const listsSlice = createSlice({
  name: "lists",
  initialState: {},
  reducers: {
    addLoadedLists(state, action) {
      const listObject = convertArrayToObject(action.payload, "_id");
      return { ...state, ...listObject };
    },
    clearData(state, action) {
      return {};
    },
    updateList(state, action) {
      state[action.payload._id] = action.payload;
    },
    addCreatedList(state, action) {
      state[action.payload._id] = action.payload;
    },
    removeDeletedList(state, action) {
      delete state[action.payload];
    },
  },
});

export default listsSlice.reducer;

export const {
  addLoadedLists,
  clearData,
  updateList,
  addCreatedList,
  removeDeletedList,
} = listsSlice.actions;
