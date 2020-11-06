import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import * as T from "./StyledText";
import ContainerCard from "../Wrappers/ContainerCard";

import useTheme from "../../hooks/useTheme";

export default function SpotifyCard({
  title,
  subtitle,
  onPress,
  color,
  iconColor,
  icon,
  iconType = "feather",
}) {
  const theme = useTheme();
  return (
    <ContainerCard
      onPress={onPress}
      style={{ backgroundColor: color, paddingBottom: 30, overflow: "hidden" }}
    >
      <T.Title>{title}</T.Title>
      {subtitle && <T.H3>{subtitle}</T.H3>}
      <View
        style={{
          position: "absolute",
          bottom: -5,
          right: -5,
          transform: [{ rotate: "-10deg" }],
        }}
      >
        <Icon
          type={iconType}
          name={icon}
          containerStyle={{ alignSelf: "flex-end" }}
          color={iconColor ? iconColor : theme.primary}
          size={60}
        />
      </View>
    </ContainerCard>
  );
}


const categoryLists = [
  {
    title: "All",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Recommended",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Movies",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Shows",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Books",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Restaurants",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Places",
    onPress: () => console.log("clicked"),
  },
];

function CategoryIcon({ c, color, reverse = false, size = 24 }) {
  const theme = useTheme();
  const iconColor = color ? color : theme.purpledark;
  const props = {
    All: {
      name: "list",
    },
    Recommended: {
      name: "list",
    },
    Movies: {
      name: "movie",
      type: "materialcommunityicons",
    },
    Shows: {
      name: "local-movies",
      type: "materialicons",
    },
    Books: {
      name: "book",
      type: "entypo",
    },
    Restaurants: {
      name: "restaurant",
      type: "materialicons",
    },
    Places: {
      name: "map-pin",
      type: "feather",
    },
  };

  return <Icon {...props[c]} color={iconColor} reverse={reverse} size={size} />;
}