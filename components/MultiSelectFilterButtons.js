import React from "react";
import { View, FlatList } from "react-native";

import useTheme from "../hooks/useTheme";
import MultiSelectFilterButton from "./Buttons/MultiSelectFilterButton";

export default function MultiSelectFilterButtons({
  options,
  setSelected,
  selected,
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingVertical: 5,
        flexDirection: "row",
        marginBottom: 0,
        width: theme.windowWidth,
        zIndex: 3,
        elevation: 3,
      }}
    >
      <FlatList
        horizontal={true}
        data={options}
        renderItem={({ item }) => (
          <MultiSelectFilterButton
            selected={selected}
            setSelected={setSelected}
            text={item}
          />
        )}
        keyExtractor={(item) => item + Math.random()}
      />
    </View>
  );
}
