import React from "react";
import { View } from "react-native";

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
      {options.map((text) => (
        <SingleFilterButton
          filter={filter}
          setFilter={setFilter}
          text={text}
          key={text + Math.random()}
        />
      ))}
    </View>
  );
});

export default SingleFilterButtonSpan;
