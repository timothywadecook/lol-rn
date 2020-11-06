import React from "react";
import { View } from "react-native";
// components
import * as T from "../Atomic/StyledText";
import ThingImage from "../Atomic/ThingImage";
import { Icon } from "react-native-elements";
// hooks
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import useTheme from "../../hooks/useTheme";

export function ThingItem({ thing }) {
  const navigation = useNavigation();
  const { image, title, subtitle } = thing;
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("Details", { thing })}
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
          <T.H4
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontWeight: "bold" }}
          >
            {subtitle}
          </T.H4>
        </SharedElement>
      </View>
      <Icon
        // size={14}
        // reverse
        name="plus-circle"
        type="feather"
        // reverseColor={theme.iconDefault}
        // containerStyle={{ position: "absolute", right: 0, top: 24 }}
        color={theme.iconDefault}
      />
    </TouchableOpacity>
  );
}
