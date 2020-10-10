import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThingImage from "../Atomic/ThingImage";
import * as T from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

export default function ThingCard({ thing, sizeDivider = 5 }) {
  const { image, title, subtitle } = thing;
  const theme = useTheme();
  const navigation = useNavigation();
  const size = theme.windowWidth / sizeDivider;
  // const maxHeight = size * 2.18;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ThingDetails", { thing })}
      activeOpacity={0.7}
      style={{
        padding: 10,
      }}
    >
      <View
        style={{ width: size * 1.1, alignItems: "center", flexWrap: "nowrap" }}
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

        <T.P
          style={{ paddingBottom: 0 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </T.P>
      </View>
    </TouchableOpacity>
  );
}
