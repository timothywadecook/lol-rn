import React from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";
import MoviesAndShowsInput from "./MoviesAndShowsInput";
import AnimatedHeader from "../AnimatedHeader";
import useTheme from "../../hooks/useTheme";
import ContainerCard from "../Wrappers/ContainerCard";
import WindowWidthRow from "../Wrappers/WindowWidthRow";

export default function NewThingInputPrompt({ y, dy, top }) {
  const theme = useTheme();
  return (
    <AnimatedHeader
      y={y}
      dy={dy}
      top={top}
      containerStyle={{
        backgroundColor: theme.wallbg,
        borderBottomColor: theme.iconBg,
        // padding: 10,
        // paddingBottom: 20,
        borderBottomWidth: 1,
      }}
    >
      {/* <MoviesAndShowsInput
        category={"Movie"}
        itemChosen={false}
        setItemChosen={() => console.log("set item chosen")}
        setItem={() => console.log("set item")}
        autoFocus={false}
      /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <Button
          containerStyle={{ flex: 1, marginRight: 5 }}
          buttonStyle={{ flex: 1, backgroundColor: theme.iconDefault }}
          icon={<Icon name="plus" color={theme.primary} type="feather" />}
          title="Quick Add"
          titleStyle={{ color: theme.primary, paddingLeft: 5 }}
          type="solid"
        />
        <Button
          containerStyle={{ flex: 1, marginLeft: 5 }}
          buttonStyle={{ flex: 1, backgroundColor: theme.purple }}
          icon={<Icon name="" color={theme.primary} type="feather" />}
          title="Recommend"
          titleStyle={{ color: theme.primary, paddingLeft: 5 }}
          type="solid"
        />
      </View>
    </AnimatedHeader>
  );
}
