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
