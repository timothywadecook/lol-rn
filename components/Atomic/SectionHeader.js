import React from "react";
import WindowWidthRow from "../Wrappers/WindowWidthRow";
import * as T from "./StyledText";

export default function SectionHeader({ children, title }) {
  return (
    <WindowWidthRow
      style={{
        paddingHorizontal: 10,
        paddingTop: 40,
        justifyContent: "space-between",
      }}
      pad={true}
    >
      <T.Title>{title}</T.Title>
      {children}
    </WindowWidthRow>
  );
}
