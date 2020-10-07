import React from "react";
import { View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import useTheme from "../../hooks/useTheme";
import { SharedElement } from "react-navigation-shared-element";

export default function ThingImage({
  size = 40,
  style,
  thing,
  marginRight = false,
}) {
  const { image, category } = thing;
  const theme = useTheme();
  const imgStyle = {
    width: size,
    height: size * 1.4,
    borderRadius: size / 7,
    marginRight: marginRight ? size / 5 : 0,
    marginTop: 2,
  };
  return image ? (
    <SharedElement id={`image-${thing._id}`}>
      <Image
        source={{ uri: image }}
        style={[{ resizeMode: "cover" }, imgStyle, style]}
      />
    </SharedElement>
  ) : (
    <View
      style={[
        {
          backgroundColor: theme.iconBg,
          alignItems: "center",
          justifyContent: "center",
        },
        imgStyle,
        style,
      ]}
    >
      {category === "Place" && <PlaceIcon size={size / 1.5} />}
    </View>
  );
}

function PlaceIcon({ size = 30 }) {
  const theme = useTheme();

  return (
    <Entypo
      style={{ marginTop: 2 }}
      name="location-pin"
      size={size}
      color={theme.red}
    />
  );
}
