import React from "react";
import { TouchableOpacity } from "react-native";
import { H2 } from "../Atomic/StyledText";
import useTheme from "../../hooks/useTheme";

const SingleFilterButton = ({ text, setFilter, filter }) => {
  const theme = useTheme();
  const isActive = filter === text;

  return (
    <TouchableOpacity
      onPress={() => {
        setFilter(filter === text ? "" : text);
      }}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        // height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: isActive ? theme.activeButtonBg : theme.wallbg,
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
};

export default SingleFilterButton;
