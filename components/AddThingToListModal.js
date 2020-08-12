import React from "react";
import { View, Modal, ScrollView, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import SubmitButton from "./Buttons/SubmitButton";
import useTheme from "../hooks/useTheme";
import { listsService } from "../services/feathersClient";
import ActivityIndicatorCentered from "./Atomic/ActivityIndicatorCentered";
//
import { updateList } from "../store/listsStore";

export default function AddThingToListModal({
  showModal,
  setShowModal,
  thingId,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.user._id);

  const listIds = useSelector((state) =>
    Object.keys(state.lists).filter((listId) =>
      state.lists[listId].participants.includes(sessionUserId)
    )
  );

  const onAddThingToList = async (listId) => {
    try {
      const updatedList = await listsService.patch(listId, {
        $addToSet: { things: thingId },
      });
      dispatch(updateList(updatedList));
    } catch (error) {
      console.log("Error adding thing to list", thingId, listId, error);
    }
    setShowModal(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
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
                      intent="secondary"
                      title={useSelector((state) => state.lists[listId].name)}
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
            <SubmitButton title="Dismiss" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
