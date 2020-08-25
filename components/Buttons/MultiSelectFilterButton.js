import React from "react";
import { TouchableOpacity } from "react-native";
import { H2 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

export default function MutliSelectFilterButton({
  text,
  setSelected,
  selected,
}) {
  const theme = useTheme();
  const isActive = selected.includes(text);

  const removeFromSelected = () => {
    setSelected(selected.filter((t) => t !== text));
  };

  const addToSelected = () => {
    setSelected([...selected, text]);
  };

  return (
    <TouchableOpacity
      onPress={() => (isActive ? removeFromSelected() : addToSelected())}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: isActive ? theme.activeButtonBg : theme.wallbg,
        borderColor: isActive ? theme.activeButtonBg : theme.iconDefault,
        borderWidth: 1,
      }}
    >
      <H2
        style={{
          color: isActive ? theme.purple : theme.iconDefault,
        }}
      >
        {text}
      </H2>
    </TouchableOpacity>
  );
}
