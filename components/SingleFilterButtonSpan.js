import React from "react";
import { View, FlatList } from "react-native";

import useTheme from "../hooks/useTheme";
import SingleFilterButton from "./Buttons/SingleFilterButton";

const SingleFilterButtonSpan = React.memo(({ options, setFilter, filter }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        // paddingVertical: 8,
        flexDirection: "row",
        // justifyContent: "space-evenly",
        flex: 1,
        zIndex: 1,
      }}
    >
      <FlatList
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={options}
        renderItem={({ item }) => (
          <SingleFilterButton
            filter={filter}
            setFilter={setFilter}
            text={item}
          />
        )}
        keyExtractor={(item) => item + Math.random()}
      />
    </View>
  );
});

export default SingleFilterButtonSpan;
