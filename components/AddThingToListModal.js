import React from "react";
import { View, Modal, ScrollView, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as T from "./Atomic/StyledText";
import SubmitButton from "./Buttons/SubmitButton";
import useTheme from "../hooks/useTheme";
import { listsService } from "../services/feathersClient";
import ActivityIndicatorCentered from "./Atomic/ActivityIndicatorCentered";
import MyModal from "./Modal";
import ListListItem from "./ListItems/ListListItem";
import IconButtons from "./Buttons/IconButtons";
//
import { updateList } from "../store/listsSlice";

export default function AddThingToListModal({
  showModal,
  setShowModal,
  thingId,
  onComplete,
}) {
  const [modalMessage, setModalMessage] = React.useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.user._id);

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
    console.log("listidswiththing", listIdsWithThing);
    setSelected(listIdsWithThing);
  }, [lists]);

  const onSave = async () => {
    let modalMessage = "You got it dude.";
    if (selected.length > 0) {
      selected.forEach(async (listId) => {
        try {
          const updatedList = await listsService.patch(listId, {
            $addToSet: { things: thingId },
          });
          dispatch(updateList(updatedList));
          console.log("updated list", updatedList);
        } catch (error) {
          modalMessage = "Houston, we had a problem :/";
          console.log("Error adding thing to list", thingId, listId, error);
        }
      });
    }
    setModalMessage(modalMessage);
    if (onComplete) {
      onComplete();
    }
  };

  return !!modalMessage ? (
    <MyModal
      showModal={!!modalMessage}
      setShowModal={setShowModal}
      message={modalMessage}
    />
  ) : (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal && !modalMessage}
      onRequestClose={() => setShowModal(false)}
      onDismiss={() => setShowModal(false)}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
        <View style={{ flex: 1 }}></View>

        <View
          style={{
            paddingBottom: 25,
            backgroundColor: theme.bg,
            shadowRadius: 25,
            shadowColor: "rgba(0,0,0)",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
          }}
        >
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <View style={{ alignSelf: "center", paddingBottom: 10 }}>
              <T.Title>Add to List</T.Title>
            </View>
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
                        onPress={() => console.log("what to do now dad")}
                      />
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
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
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
