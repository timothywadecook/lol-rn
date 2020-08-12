import React from "react";
import { View, Modal, ScrollView, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import SubmitButton from "./Buttons/SubmitButton";
import useTheme from "../hooks/useTheme";
import { listsService } from "../services/feathersClient";
import ActivityIndicatorCentered from "./Atomic/ActivityIndicatorCentered";

export default function AddThingToListModal({
  showModal,
  setShowModal,
  thingId,
}) {
  const theme = useTheme();
  const sessionUserId = useSelector((state) => state.user._id);

  const [lists, setLists] = React.useState([]);

  const fetchLists = async () => {
    try {
      const res = await listsService.find({
        query: {
          participants: sessionUserId,
          $limit: 1000,
        },
      });
      setLists(res.data);
    } catch (error) {
      console.log("Error fetching lists");
    }
  };

  React.useEffect(() => {
    fetchLists();
  }, []);

  const onAddThingToList = async (listId) => {
    try {
      listsService.patch(listId, {
        $addToSet: { things: thingId },
      });
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
              {lists.length < 0 ? (
                <View style={{ height: 100 }}>
                  <ActivityIndicatorCentered size="small" />
                </View>
              ) : (
                lists.map((list) => (
                  <View
                    key={list._id}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SubmitButton
                      intent="secondary"
                      title={list.name}
                      onPress={() => onAddThingToList(list._id)}
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
