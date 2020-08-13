import React from "react";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import ListListItem from "../ListItems/ListListItem";
import useTheme from "../../hooks/useTheme";

//
import { listsService } from "../../services/feathersClient";
import { addLoadedLists } from "../../store/listsSlice";

export default function ListList({ userId }) {
  const listIds = useSelector((state) =>
    Object.keys(state.lists).filter((listId) =>
      state.lists[listId].participants.includes(userId)
    )
  );

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

  return (
    <FlatList
      data={listIds}
      renderItem={({ item }) => <ListListItem listId={item} />}
      ItemSeparatorComponent={FlatListItemSeparator}
      keyExtractor={(item) => item}
      ListFooterComponent={canCreate() && <CreateNewListFooter />}
      showsVerticalScrollIndicator={false}
    />
  );
}

function FlatListItemSeparator() {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: theme.bg,
        width: "85%",
        alignSelf: "flex-end",
      }}
    ></View>
  );
}

function CreateNewListFooter() {
  const navigation = useNavigation();
  const openCreateOrEditListScreen = () => {
    navigation.navigate("CreateOrEditList", { list: null });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <SubmitButton
        fullwidth={true}
        title="Create New List"
        onPress={openCreateOrEditListScreen}
      />
    </View>
  );
}
