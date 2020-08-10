import React from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import { listsService } from "../../services/feathersClient";

import ListListItem from "../ListItems/ListListItem";

export default function ListList({ userId }) {
  const [lists, setLists] = React.useState([]);
  const fetchLists = async () => {
    try {
      const res = await listsService.find({
        query: { participants: userId, $limit: 1000 },
      });
      setLists(res.data);
    } catch (error) {
      console.log("Error trying to fetch lists for user", userId, error);
    }
  };
  React.useEffect(() => {
    fetchLists();
    function createListener(l) {
      setLists((lists) => [...lists, l]);
    }
    listsService.on("created", createListener);
    return () => listsService.removeListener("created", createListener);
  }, []);

  const onDeleteList = async (listId) => {
    setLists(lists.filter((l) => l._id !== listId));
    try {
      listsService.remove(listId);
    } catch (error) {
      console.log("Error onDeleteList for listId", listId, error);
    }
  };

  const onMakePrivate = async (listId) => {
    setLists(
      lists.map((l) => {
        if (l._id === listId) {
          return { ...l, isPrivate: true };
        }
        return l;
      })
    );
    try {
      listsService.patch(listId, { isPrivate: true });
    } catch (error) {
      console.log("Error onMakePrivate for listId", listId, error);
    }
  };

  const onMakePublic = (listId) => {
    setLists(
      lists.map((l) => {
        if (l._id === listId) {
          return { ...l, isPrivate: false };
        }
        return l;
      })
    );
    try {
      listsService.patch(listId, { isPrivate: false });
    } catch (error) {
      console.log("Error onMakePublic for listId", listId, error);
    }
  };

  const sessionUserId = useSelector((state) => state.user._id);
  const canView = (list) =>
    !list.isPrivate || list.participants.includes(sessionUserId);
  const canEdit = (list) => list.participants.includes(sessionUserId);
  const canCreate = () => sessionUserId === userId;
  return (
    <FlatList
      data={lists}
      renderItem={({ item }) => (
        <ListListItem
          list={item}
          canView={() => canView(item)}
          canEdit={() => canEdit(item)}
          onDeleteList={() => onDeleteList(item._id)}
          onMakePrivate={() => onMakePrivate(item._id)}
          onMakePublic={() => onMakePublic(item._id)}
        />
      )}
      keyExtractor={(item) => item._id}
      ListFooterComponent={canCreate() && <CreateNewListFooter />}
      showsVerticalScrollIndicator={false}
    />
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
        title="+ Create New List"
        onPress={openCreateOrEditListScreen}
      />
    </View>
  );
}
