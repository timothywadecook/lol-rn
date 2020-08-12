import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, ScrollView } from "react-native";
import { Title, H4, H2 } from "../components/Atomic/StyledText";

import { listsService, thingsService } from "../services/feathersClient";

import Swipeable from "react-native-gesture-handler/Swipeable";
import SquareIconButton from "../components/ListItems/SwipableSquareIconButton";

import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";

import useTheme from "../hooks/useTheme";

import { updateList } from "../store/listsStore";

//
export default function List({ route, navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
  const theme = useTheme();
  const dispatch = useDispatch();
  const { listId } = route.params;

  const list = useSelector((state) => state.lists[listId]);

  const onDeleteThing = async (thingId) => {
    try {
      const updatedList = await listsService.patch(listId, {
        things: { $pull: thingId },
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
    navigation.navigate("CreateOrEditList", { list });
  };

  const onNavBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.wallbg }}>
      <ListHeader
        name={list.name}
        onNavBack={onNavBack}
        onOpenEditList={onOpenEditList}
      />
      {list.things ? (
        <ThingList thingIds={list.things} onDeleteThing={onDeleteThing} />
      ) : (
        <ActivityIndicatorCentered size="small" />
      )}
    </View>
  );
}

function ListHeader({ name, onNavBack, onOpenEditList }) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingTop: 50,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button title="Back" onPress={onNavBack} color={theme.primary}></Button>
      <H2>{name}</H2>

      <Button
        title="Edit"
        onPress={onOpenEditList}
        color={theme.primary}
      ></Button>
    </View>
  );
}

function ThingList({ thingIds, onDeleteThing }) {
  const [things, setThings] = React.useState([]);

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
    <View style={{ flex: 1 }}>
      <ScrollView>
        {things.map((t) => (
          <ThingListItem
            key={t._id}
            thing={t}
            onDeleteThing={() => onDeleteThing(t._id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function ThingListItem({ thing, onDeleteThing }) {
  const theme = useTheme();
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={{ width: "25%" }}>
          <SquareIconButton icon="Delete" color="red" onPress={onDeleteThing} />
        </View>
      )}
    >
      <View
        style={{
          width: theme.contentWidth,
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
