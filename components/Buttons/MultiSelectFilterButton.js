import React from "react";
import RoundButton from "./RoundButton";

export default function MutliSelectFilterButton({
  text,
  setSelected,
  selected,
}) {
  const isActive = selected.includes(text);

  const removeFromSelected = () => {
    setSelected(selected.filter((t) => t !== text));
  };

  const addToSelected = () => {
    setSelected([...selected, text]);
  };

  return (
    <RoundButton
      // solid={true}
      onPress={() => (isActive ? removeFromSelected() : addToSelected())}
      active={isActive}
      title={text}
    />
  );
}
