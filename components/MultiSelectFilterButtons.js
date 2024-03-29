import React from "react";
import { View, FlatList } from "react-native";

import useTheme from "../hooks/useTheme";
import MultiSelectFilterButton from "./Buttons/MultiSelectFilterButton";
import RoundButton from "./Buttons/RoundButton";

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
        paddingLeft: 6,
        flexDirection: "row",
        marginBottom: 0,
        width: theme.windowWidth,
        zIndex: 3,
        elevation: 3,
      }}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={options}
        ListHeaderComponent={() => (
          <RoundButton
            secondary={true}
            onPress={() => setSelected([])}
            active={selected.length === 0}
            title={"   All   "}
          />
        )}
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
