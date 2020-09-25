import React from "react";
import { TouchableOpacity } from "react-native";
import { H2 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

export default function RoundButton({
  onPress,
  active,
  title,
  renderIcon = false,
  solid = false,
}) {
  const theme = useTheme();

  solid = theme.theme === "light" ? !solid : solid;
  const inActiveColor = solid ? theme.iconBg : "transparent";
  const inActiveBorderWidth = solid ? 0 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        marginHorizontal: 6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: active ? theme.activeButtonBg : inActiveColor,
        borderColor: theme.iconDefault,
        borderWidth: active ? 0 : inActiveBorderWidth,
      }}
    >
      {renderIcon && renderIcon({ size: 14 })}
      <H2
        style={{
          color: active ? theme.purple : theme.iconDefault,
        }}
      >
        {title}
      </H2>
    </TouchableOpacity>
  );
}
