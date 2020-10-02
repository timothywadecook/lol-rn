import React, { useState } from "react";
import { View } from "react-native";
import SingleFilterButtonSpan from "../components/SingleFilterButtonSpan";
import DismissKeyboard from "../components/Wrappers/DismissKeyboard";
import BackButton from "../components/Atomic/BackButton";

import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import * as T from "../components/Atomic/StyledText";

import MoviesAndShowsInput from "../components/Inputs/MoviesAndShowsInput";
import BooksInput from "../components/Inputs/BooksInput";
import GooglePlacesInput from "../components/Inputs/GooglePlacesInput";

import useTheme from "../hooks/useTheme";

import Screen from "../components/Wrappers/Screen";

const MainInputField = ({ category, setItem, itemChosen, setItemChosen }) => {
  switch (category) {
    case "Place":
      return (
        <GooglePlacesInput
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
        />
      );
    case "Book":
      return (
        <BooksInput
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
        />
      );
    case "Movie":
      return (
        <MoviesAndShowsInput
          category={category}
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
        />
      );
    case "Show":
      return (
        <MoviesAndShowsInput
          category={category}
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
        />
      );
    default:
      return null;
  }
};

export default function SearchThings({ navigation }) {
  const theme = useTheme();

  const [category, setCategory] = useState("");
  const [itemChosen, setItemChosen] = useState(false);
  const [item, setItem] = useState({});

  React.useEffect(() => setCategory("Movie"), []);

  React.useEffect(() => {
    console.log("item?", item);
    if (item.title) {
      const thing = item;
      navigation.navigate("ThingDetails", { thing });
    }
  }, [item]);

  return (
    <Screen>
      <DismissKeyboard>
        <View
          style={{
            backgroundColor: theme.wallbg,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WindowWidthRow pad={true}>
            <BackButton />
            <T.H1>Search Things</T.H1>
          </WindowWidthRow>

          <WindowWidthRow>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <SingleFilterButtonSpan
                options={["Movie", "Show", "Book", "Place"]}
                setFilter={setCategory}
                filter={category}
              />
            </View>
          </WindowWidthRow>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {!!category && (
              <MainInputField
                category={category}
                setItem={setItem}
                itemChosen={itemChosen}
                setItemChosen={setItemChosen}
              />
            )}
          </View>
        </View>
      </DismissKeyboard>
    </Screen>
  );
}
