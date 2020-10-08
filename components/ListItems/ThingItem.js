import React from "react";
import { View } from "react-native";
// components
import * as T from "../Atomic/StyledText";
import ThingImage from "../Atomic/ThingImage";
// hooks
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";

export function ThingItem({ thing }) {
  const navigation = useNavigation();
  const { image, title, subtitle } = thing;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
