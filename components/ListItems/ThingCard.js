import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThingImage from "../Atomic/ThingImage";
import * as T from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

export default function ThingCard({ thing }) {
  const { image, title, subtitle } = thing;
  const theme = useTheme();
  const navigation = useNavigation();
  const size = theme.windowWidth / 5;
  // const maxHeight = size * 2.18;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      activeOpacity={0.7}
      style={{
        // maxHeight: maxHeight,
        width: size * 1.1,
        alignItems: "center",
        marginHorizontal: 10,
        // paddingHorizontal: 8,
        marginVertical: 10,
        flexWrap: "nowrap",
      }}
    >
      <View
        style={{
          width: size,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        <ThingImage transition={false} size={size} thing={thing} />
      </View>

      <T.P style={{ paddingBottom: 0 }} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </T.P>
    </TouchableOpacity>
  );
}
