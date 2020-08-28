import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, ScrollView, FlatList } from "react-native";
import { Title, H4, H2 } from "../components/Atomic/StyledText";

import { listsService, thingsService } from "../services/feathersClient";

import Swipeable from "react-native-gesture-handler/Swipeable";
import SquareIconButton from "../components/ListItems/SwipableSquareIconButton";

import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";
import FlatListItemSeparator from "../components/Atomic/FlatListItemSeparator";

import useTheme from "../hooks/useTheme";

import Screen from "../components/Wrappers/Screen";

import { updateList } from "../store/listsSlice";

//
export default function List({ route, navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
  const theme = useTheme();
  const dispatch = useDispatch();
  const { listId } = route.params;

  const list = useSelector((state) => state.lists[listId]);
  const sessionUserId = useSelector((state) => state.user._id);
  const canEdit = list.participants.includes(sessionUserId);

  const onDeleteThing = async (thingId) => {
    try {
      const updatedList = await listsService.patch(listId, {
        $pull: { things: thingId },
      });
      dispatch(updateList(updatedList));
    } catch (error) {
      console.log(
        "Error onDeleteThing for listId and thingId",
        listId,
        thingId,
        error
      );
    }
  };

  const onOpenEditList = () => {
    navigation.navigate("CreateOrEditList", { list, isEdit: true });
  };

  const onNavBack = () => {
    navigation.goBack();
  };

  return (
    <Screen>
      <ListHeader
        name={list.name}
        onNavBack={onNavBack}
        onOpenEditList={onOpenEditList}
        canEdit={canEdit}
      />
      {list.things ? (
        <ThingList thingIds={list.things} onDeleteThing={onDeleteThing} />
      ) : (
        <ActivityIndicatorCentered size="small" />
      )}
    </Screen>
  );
}

function ListHeader({ name, onNavBack, onOpenEditList, canEdit }) {
  const theme = useTheme();
  return (
    <View
      style={{
        // paddingTop: 50,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: theme.bg,
        width: theme.windowWidth,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button title="Back" onPress={onNavBack} color={theme.purple}></Button>
      <H2>{name}</H2>

      {canEdit ? (
        <Button
          title="Edit"
          onPress={onOpenEditList}
          color={theme.purple}
        ></Button>
      ) : (
        <View style={{ width: 56 }}></View>
      )}
    </View>
  );
}

function ThingList({ thingIds, onDeleteThing }) {
  const [things, setThings] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    const fetchThings = async () => {
      try {
        const res = await thingsService.find({
          query: {
            _id: { $in: thingIds },
            $limit: 1000,
          },
        });
        setThings(res.data);
      } catch (error) {
        console.log("Error fetching things with thingIds", thingIds, error);
      }
    };
    fetchThings();
  }, [thingIds]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.wallbg,
        width: theme.windowWidth,
      }}
    >
      <FlatList
        data={things}
        renderItem={({ item }) => (
          <ThingListItem
            thing={item}
            onDeleteThing={() => onDeleteThing(item._id)}
          />
        )}
        initialNumToRender={20}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </View>
  );
}

function ThingListItem({ thing, onDeleteThing }) {
  const theme = useTheme();
  return (
    <Swipeable
      renderLeftActions={() => (
        <View style={{ width: "25%" }}>
          <SquareIconButton icon="delete" color="red" onPress={onDeleteThing} />
        </View>
      )}
    >
      <View
        style={{
          backgroundColor: theme.wallbg,
          width: theme.windowWidth,
          flex: 1,
          flexDirection: "row",
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}
      >
        {thing.image && (
          <Image
            source={{ uri: thing.image }}
            style={{
              resizeMode: "cover",
              width: "10%",
              height: 40,
              borderRadius: 5,
              marginRight: 8,
              marginTop: 2,
            }}
          />
        )}

        <View style={{ flexDirection: "column", flex: 1 }}>
          <Title style={{ paddingBottom: 0 }}>{thing.title}</Title>
          <H4 style={{ fontWeight: "bold" }}>{thing.subtitle}</H4>
        </View>
      </View>
    </Swipeable>
  );
}
