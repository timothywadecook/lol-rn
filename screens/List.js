import React from "react";
import { View, Button, Image, ScrollView } from "react-native";
import { Title, H4 } from "../components/Atomic/StyledText";

import { listsService, thingsService } from "../services/feathersClient";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SquareIconButton from "../components/ListItems/SwipableSquareIconButton";

import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";

import useTheme from "../hooks/useTheme";

//
export default function List({ route }) {
  const navigation = useNavigation();
  navigation.setOptions({
    headerShown: false,
  });
  const theme = useTheme();

  const { listId } = route.params;

  const [list, setList] = React.useState({});
  const fetchList = async () => {
    try {
      const list = await listsService.get(listId);
      setList(list);
    } catch (error) {
      console.log("Error trying to fetch list with id", listId);
    }
  };
  React.useEffect(() => {
    fetchList();
  }, []);

  const onDeleteThing = async (thingId) => {
    setList({ ...list, things: list.things.filter((l) => l._id !== thingId) });

    try {
      listsService.patch(listId, {
        things: { $pull: thingId },
      });
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
      <Title>{name}</Title>

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
              marginRight: 5,
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
