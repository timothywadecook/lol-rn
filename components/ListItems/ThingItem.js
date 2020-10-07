import React from "react";
import { View, Image } from "react-native";
// components
import * as T from "../Atomic/StyledText";
import IconButtons from "../Buttons/IconButtons";
import ThingImage from "../Atomic/ThingImage";
// hooks
import useTheme from "../../hooks/useTheme";
import useThingId from "../../hooks/useThingId";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";

export function ThingItem({ thing, children, border, pad }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const { image, title, subtitle } = thing;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderRadius: 8,
        padding: 10,
      }}
    >
      <ThingImage thing={thing} marginRight={true} />

      <View style={{ flexDirection: "column", flex: 1 }}>
        <SharedElement id={`title-${thing._id}`}>
          <T.Title style={{ paddingBottom: 0 }}>{title}</T.Title>
        </SharedElement>
        <SharedElement id={`subtitle-${thing._id}`}>
          <T.H4 style={{ fontWeight: "bold" }}>{subtitle}</T.H4>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
}

export function ThingItem2({ thing, children }) {
  const theme = useTheme();
  const { image, title, subtitle } = thing;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderRadius: 8,
        padding: 10,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <ThingImage thing={thing} marginRight={true} />
        <View style={{ flexDirection: "column", flex: 1 }}>
          <T.Title style={{ paddingBottom: 0 }}>{title}</T.Title>
          <T.H4 style={{ fontWeight: "bold" }}>{subtitle}</T.H4>
        </View>
      </View>

      <View>{children}</View>
    </TouchableOpacity>
  );
}

export function ThingItemWithAddToList({ thing, border, pad }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const thingId = useThingId(thing);

  return (
    <ThingItem2 pad={pad} border={border} thing={thing}>
      <IconButtons.Bookmark
        onPress={() =>
          navigation.navigate("AddToCollections", { thingId: thing._id })
        }
      />
    </ThingItem2>
  );
}
