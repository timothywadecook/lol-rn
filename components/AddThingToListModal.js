import React from "react";
import { View, Modal, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import SubmitButton from "./Buttons/SubmitButton";
import useTheme from "../hooks/useTheme";
import { listsService } from "../services/feathersClient";

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
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      onDismiss={() => setShowModal(false)}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          backgroundColor: theme.wallbg,
          paddingBottom: 20,
          borderWidth: 1,
          borderColor: theme.bg,
          borderRadius: 40,
          //   borderTopStartRadius: 15,
          //   borderTopEndRadius: 15,
          overflow: "hidden",
        }}
      >
        <ScrollView>
          {lists.map((list) => (
            <View
              style={{
                flex: 1,
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
          ))}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderTopWidth: 1,
              borderTopColor: theme.bg,
            }}
          >
            <SubmitButton title="Dismiss" onPress={() => setShowModal(false)} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
