import React from "react";
import { TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function ContainerCard({ children, style, onPress }) {
  const theme = useTheme();
  const Component = onPress ? TouchableOpacity : View;
  return (
    <Component
      onPress={onPress}
      style={{
        overflow: "hidden",
        margin: 10,
        padding: 15,
        backgroundColor: theme.iconBg,
        flex: 1,
        borderRadius: 10,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
