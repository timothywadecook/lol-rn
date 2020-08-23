import React from "react";
import { View, Button, Image } from "react-native";
// components
import * as T from "../Atomic/StyledText";
import IconButtons from "../Buttons/IconButtons";
import AddThingToListModal from "../AddThingToListModal";
// hooks
import useTheme from "../../hooks/useTheme";
import { thingsService } from "../../services/feathersClient";

export default function ThingItem({ thing, children, border }) {
  const theme = useTheme();
  const { image, title, subtitle } = thing;

  return (
    <View
      style={{
        width: theme.contentWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: border ? 1 : 0,
        borderColor: theme.wallbg,
        borderRadius: 8,
        padding: 6,
        alignSelf: "center",
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

export function ThingItemWithAddToList({ thing, onComplete, border }) {
  const [showModal, setShowModal] = React.useState(false);
  const [thingId, setThingId] = React.useState(null);
  // if no thingId then fetch thing Id when thing is loaded
  React.useEffect(() => {
    if (thing._id) {
      setThingId(thing._id);
    } else {
      getThingId(thing)
        .then((id) => setThingId(id))
        .catch((e) =>
          console.log(
            "Error getting thingId for ThingItemWithAddToList",
            e.message
          )
        );
    }
  }, [thing]);

  return (
    <ThingItem border={border} thing={thing}>
      {showModal && (
        <AddThingToListModal
          onComplete={onComplete}
          showModal={showModal}
          setShowModal={setShowModal}
          thingId={thingId}
        />
      )}
      <IconButtons.AddCircle
        active={showModal}
        onPress={() => setShowModal(true)}
      />
    </ThingItem>
  );
}

const getThingId = async (thing) => {
  console.log("get thingId for", thing);
  const { category, api, api_id } = thing;
  const params = { category, api_id, api };

  const res = await thingsService.find({ query: params });
  if (res.total === 1) {
    console.log("thing found", res.data[0]._id);
    return res.data[0]._id;
  } else if (res.total === 0) {
    const newThing = await thingsService.create(thing);
    console.log("thing made", newThing);
    return newThing._id;
  }
};
