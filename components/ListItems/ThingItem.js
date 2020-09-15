import React from "react";
import { View, Button, Image } from "react-native";
// components
import * as T from "../Atomic/StyledText";
import IconButtons from "../Buttons/IconButtons";
import AddThingToListModal from "../AddThingToListModal";
import { Entypo } from "@expo/vector-icons";
// hooks
import useTheme from "../../hooks/useTheme";
import { thingsService } from "../../services/feathersClient";

export default function ThingItem({ thing, children, border, pad }) {
  const theme = useTheme();
  const { image, title, subtitle } = thing;

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
        borderWidth: border ? 1 : 0,
        borderColor: theme.wallbg,
        borderRadius: 8,
        padding: pad ? 10 : 0,
        alignSelf: "center",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              resizeMode: "cover",
              width: 30, //  100,
              height: 40, // 140,
              borderRadius: 5,
              marginRight: 6,
              marginTop: 2,
            }}
          />
        ) : thing.category === "Place" ? (
          <PlaceIcon />
        ) : null}

        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <T.Title style={{ paddingBottom: 0 }}>{title}</T.Title>
          <T.H4 style={{ fontWeight: "bold" }}>{subtitle}</T.H4>
        </View>
      </View>

      <View>{children}</View>
    </View>
  );
}

export function ThingItemWithAddToList({ thing, onComplete, border, pad }) {
  const [showModal, setShowModal] = React.useState(false);
  const [thingId, setThingId] = React.useState(null);
  const [loading, setLoading] = React.useState(false); // so we cant create while creating
  // if no thingId then fetch thing Id when thing is loaded
  React.useEffect(() => {
    if (!thingId) {
      if (thing._id) {
        setThingId(thing._id);
      } else if (thing.category && !loading) {
        setLoading(true);
        getThingId(thing)
          .then((id) => {
            setThingId(id);
            setLoading(false);
          })
          .catch((e) => {
            console.log(
              "Error getting thingId for ThingItemWithAddToList",
              e.message
            );
            setLoading(false);
          });
      }
    }
  }, [thing]);

  return (
    <ThingItem pad={pad} border={border} thing={thing}>
      {showModal && (
        <AddThingToListModal
          onComplete={onComplete}
          showModal={showModal}
          setShowModal={setShowModal}
          thingId={thingId}
        />
      )}
      <IconButtons.AddToList
        active={showModal}
        onPress={() => setShowModal(true)}
      />
    </ThingItem>
  );
}

const getThingId = async (thing) => {
  const { category, api, api_id } = thing;
  const params = { category, api_id, api };

  const res = await thingsService.find({ query: params });
  if (res.total) {
    return res.data[0]._id;
  } else {
    const newThing = await thingsService.create(thing);
    return newThing._id;
  }
};

function PlaceIcon() {
  const theme = useTheme();

  return (
    <Entypo
      style={{ width: 30, marginRight: 8, marginLeft: -8 }}
      name="location-pin"
      size={40}
      color={theme.iconDefault}
    />
  );
}
