import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Image, ScrollView, FlatList } from "react-native";
import { Title, H4, H2 } from "../components/Atomic/StyledText";

import { listsService, thingsService } from "../services/feathersClient";

import Swipeable from "react-native-gesture-handler/Swipeable";
import SquareIconButton from "../components/ListItems/SwipableSquareIconButton";

import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";
import FlatListItemSeparator from "../components/Atomic/FlatListItemSeparator";
import BackButton from "../components/Atomic/BackButton";
import IconButtons from "../components/Buttons/IconButtons";

import useTheme from "../hooks/useTheme";

import Screen from "../components/Wrappers/Screen";

import { updateList } from "../store/listsSlice";

//
export default function List({ route, navigation }) {
  navigation.setOptions({
    gestureResponseDistance: {
      horizontal: 80,
      vertical: 100,
    },
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
      {list.things && list.things.length ? (
        <ThingList thingIds={list.things} onDeleteThing={onDeleteThing} />
      ) : null}
    </Screen>
  );
}

function ListHeader({ name, onNavBack, onOpenEditList, canEdit }) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: theme.bg,
        width: theme.windowWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <BackButton />
      <H2>{name}</H2>

      {canEdit ? (
        <IconButtons.ThreeDots onPress={onOpenEditList} active={true} />
      ) : (
        <View style={{ width: 22 }}></View>
      )}
    </View>
  );
}

function ThingList({ thingIds, onDeleteThing }) {
  const [things, setThings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  React.useEffect(() => {
    setLoading(true);
    const fetchThings = async () => {
      try {
        const res = await thingsService.find({
          query: {
            _id: { $in: thingIds },
            $limit: 1000,
          },
        });
        setThings(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching things with thingIds", thingIds, error);
        setLoading(false);
      }
    };
    fetchThings();
  }, [thingIds]);

  if (loading) {
    return <ActivityIndicatorCentered size="small" />;
  }

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
      renderRightActions={() => (
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
