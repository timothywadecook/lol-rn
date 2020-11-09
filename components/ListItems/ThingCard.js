import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThingImage from "../Atomic/ThingImage";
import * as T from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";
import { Icon } from "react-native-elements";
import ContainerCard from "../Wrappers/ContainerCard";

export default function ThingCard({ thing, sizeDivider = 5 }) {
  const { image, title, subtitle } = thing;
  const theme = useTheme();
  const navigation = useNavigation();
  const size = theme.windowWidth / sizeDivider;
  // const maxHeight = size * 2.18;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { thing })}
      activeOpacity={0.9}
      style={{
        padding: 5,
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

export function ThingCardAdd({ sizeDivider = 5 }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const size = theme.windowWidth / sizeDivider;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SearchThings")}
      activeOpacity={0.9}
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
          <ContainerCard
            style={{
              height: size * 1.4,
              width: size,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: size / 7,
              margin: 0,
              marginTop: 2,
            }}
          >
            <Icon
              size={size / 2}
              name="plus"
              type="feather"
              color={theme.purple}
            />
          </ContainerCard>
        </View>

        <T.P
          style={{ paddingBottom: 0 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Add
        </T.P>
      </View>
    </TouchableOpacity>
  );
}
