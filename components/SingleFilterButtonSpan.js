import React from "react";
import { View, FlatList } from "react-native";

import useTheme from "../hooks/useTheme";
import SingleFilterButton from "./Buttons/SingleFilterButton";

const SingleFilterButtonSpan = React.memo(({ options, setFilter, filter }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        marginBottom: 0,
        justifyContent: "space-between",
        width: "100%",
        zIndex: 3,
        elevation: 3,
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
