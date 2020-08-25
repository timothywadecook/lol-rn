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

  const listIds = useSelector((state) =>
    Object.keys(state.lists).filter((listId) =>
      state.lists[listId].participants.includes(sessionUserId)
    )
  );

  const lists = useSelector((state) => state.lists);

  const onAddThingToList = async (listId) => {
    try {
      const updatedList = await listsService.patch(listId, {
        $addToSet: { things: thingId },
      });
      setModalMessage(`Added to\n${lists[listId].name}`);
      dispatch(updateList(updatedList));
    } catch (error) {
      setModalMessage("Houston, we had a problem :/");
      console.log("Error adding thing to list", thingId, listId, error);
    }
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
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ flex: 1 }}></View>

        <View
          style={{
            paddingBottom: 25,
            backgroundColor: theme.wallbg,
          }}
        >
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <View style={{ alignSelf: "center" }}>
              <T.Title>Add to List</T.Title>
            </View>
            <ScrollView>
              {listIds.length < 0 ? (
                <View style={{ height: 100 }}>
                  <ActivityIndicatorCentered size="small" />
                </View>
              ) : (
                listIds.map((listId) => (
                  <ListListItem
                    key={listId}
                    listId={listId}
                    swipable={false}
                    showArrow={false}
                    onPress={() => onAddThingToList(listId)}
                  />
                ))
              )}
            </ScrollView>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderTopWidth: 1,
              borderTopColor: theme.bg,
            }}
          >
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
