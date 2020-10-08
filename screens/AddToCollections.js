import React from "react";
import { View, Modal, ScrollView, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as T from "../components/Atomic/StyledText";
import SubmitButton from "../components/Buttons/SubmitButton";
import useTheme from "../hooks/useTheme";
import { listsService } from "../services/feathersClient";
import ActivityIndicatorCentered from "../components/Atomic/ActivityIndicatorCentered";
import ListListItem from "../components/ListItems/ListListItem";
import IconButtons from "../components/Buttons/IconButtons";
import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import ThingImage from "../components/Atomic/ThingImage";
//
import { updateList } from "../store/listsSlice";
import BackButton from "../components/Atomic/BackButton";

export default function AddThingToListModal({ navigation, route }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.user._id);

  const { thingId, thing } = route.params;

  const [selected, setSelected] = React.useState([]);

  const listIds = useSelector((state) =>
    Object.keys(state.lists).filter((listId) =>
      state.lists[listId].participants.includes(sessionUserId)
    )
  );

  const listIdsWithThing = useSelector((state) =>
    Object.keys(state.lists).filter((listId) =>
      state.lists[listId].things.includes(thingId)
    )
  );

  const lists = useSelector((state) => state.lists);

  React.useEffect(() => {
    setSelected(listIdsWithThing);
  }, [lists]);

  const onSave = async () => {
    if (selected.length > 0) {
      selected.forEach(async (listId) => {
        try {
          const updatedList = await listsService.patch(listId, {
            $addToSet: { things: thingId },
          });
          dispatch(updateList(updatedList));
          navigation.navigate("Home");
        } catch (error) {
          console.log("Error adding thing to list", thingId, listId, error);
        }
      });
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.bg, paddingTop: theme.topPad }}
    >
      <WindowWidthRow pad={true}>
        {/* <CloseModalButton dismissModal={() => navigation.goBack()} /> */}
        <BackButton />
        <ThingImage size={30} thing={thing} />
        <T.H1 style={{ marginLeft: 10 }}>Save to...</T.H1>
      </WindowWidthRow>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          flex: 1,
        }}
      >
        <ScrollView>
          {listIds.length < 0 ? (
            <View style={{ height: 100 }}>
              <ActivityIndicatorCentered size="small" />
            </View>
          ) : (
            listIds.map((listId) => (
              <View
                key={listId}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: theme.contentWidth,
                }}
              >
                {selected.includes(listId) ? (
                  <IconButtons.CheckmarkCircle
                    onPress={() =>
                      setSelected(selected.filter((id) => id !== listId))
                    }
                    active={true}
                  />
                ) : (
                  <IconButtons.Circle
                    onPress={() => setSelected([...selected, listId])}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <ListListItem
                    listId={listId}
                    swipable={false}
                    showArrow={false}
                    onPress={() =>
                      selected.includes(listId)
                        ? setSelected(selected.filter((id) => id !== listId))
                        : setSelected([...selected, listId])
                    }
                  />
                </View>
              </View>
            ))
          )}
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SubmitButton
            fullwidth={true}
            title="Save"
            intent="primary"
            onPress={onSave}
          />
          <SubmitButton
            fullwidth={true}
            title="Dismiss"
            intent="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}

AddThingToListModal.sharedElements = (navigation) => {
  const thingId = navigation.getParam("thingId");
  if (thingId) {
    return [
      `image-${thingId}`,
      // `title-${thing._id}`,
      // `subtitle-${thing._id}`,
    ];
  }
};
