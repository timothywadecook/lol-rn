import React from "react";
import { View, Button, Image } from "react-native";
// components
import * as T from "../Atomic/StyledText";
import IconButtons from "../Buttons/IconButtons";
import AddThingToListModal from "../AddThingToListModal";
// hooks
import useTheme from "../../hooks/useTheme";

export default function ThingItem({ thing, children }) {
  const theme = useTheme();
  const { image, title, subtitle } = thing;

  return (
    <View
      style={{
        width: theme.contentWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        {image && (
          <Image
            source={{ uri: image }}
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
          <T.Title style={{ paddingBottom: 0 }}>{title}</T.Title>
          <T.H4 style={{ fontWeight: "bold" }}>{subtitle}</T.H4>
        </View>
      </View>

      <View>{children}</View>
    </View>
  );
}

export function ThingItemWithAddToList({ thing }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <ThingItem thing={thing}>
      {showModal && (
        <AddThingToListModal
          showModal={showModal}
          setShowModal={setShowModal}
          thingId={thing._id}
        />
      )}
      <IconButtons.AddCircle
        active={showModal}
        onPress={() => setShowModal(true)}
      />
    </ThingItem>
  );
}
