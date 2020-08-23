import React from "react";
import { View, Modal, ScrollView, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import SubmitButton from "./Buttons/SubmitButton";
import useTheme from "../hooks/useTheme";
import { listsService } from "../services/feathersClient";
import ActivityIndicatorCentered from "./Atomic/ActivityIndicatorCentered";
import MyModal from "./Modal";
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
      animationType="fade"
      transparent={true}
      visible={showModal && !modalMessage}
      onRequestClose={() => setShowModal(false)}
      onDismiss={() => setShowModal(false)}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ flex: 1 }}></View>

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.bg,
              paddingVertical: 10,
              marginBottom: 8,
              borderRadius: 40,
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
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SubmitButton
                      fullwidth={true}
                      intent="secondary"
                      title={lists[listId].name}
                      onPress={() => onAddThingToList(listId)}
                    />
                  </View>
                ))
              )}
            </ScrollView>
          </View>
          <View
            style={{
              borderRadius: 40,
              backgroundColor: theme.bg,
              // flex: 1,
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
