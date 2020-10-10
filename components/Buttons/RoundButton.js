import React from "react";
import { TouchableOpacity, View } from "react-native";
import { H2 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

export default function RoundButton({
  onPress,
  active,
  title,
  renderIcon = false,
  solid = false,
  secondary = false,
  style,
}) {
  const theme = useTheme();

  solid = theme.theme === "light" ? !solid : solid;
  const inActiveColor = solid ? theme.iconBg : "transparent";
  const inActiveBorderWidth = solid ? 0 : 1;
  const activeBgColor = secondary ? theme.wallbg : theme.activeButtonBg;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        paddingHorizontal: 6,
      }}
    >
      <View
        style={[
          {
            padding: 20,
            paddingVertical: 30,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            backgroundColor: active ? activeBgColor : inActiveColor,
            borderColor: theme.iconDefault,
            borderWidth: active ? 0 : inActiveBorderWidth,
          },
          style,
        ]}
      >
        {renderIcon && renderIcon({ size: 14 })}
        <H2
          style={{
            color: active ? theme.purple : theme.iconDefault,
          }}
        >
          {title}
        </H2>
      </View>
    </TouchableOpacity>
  );
}
