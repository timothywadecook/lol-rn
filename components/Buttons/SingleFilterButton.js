import React from "react";
import RoundButton from "./RoundButton";

const SingleFilterButton = ({ text, setFilter, filter }) => {
  const isActive = filter === text;

  return (
    <RoundButton
      onPress={() => {
        setFilter(text);
      }}
      active={isActive}
      title={text}
      // style={{ paddingVertical: 15 }}
    />
  );
};

export default SingleFilterButton;
