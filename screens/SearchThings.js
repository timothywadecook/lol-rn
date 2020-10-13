import React, { useState } from "react";
import { View } from "react-native";
import SingleFilterButtonSpan from "../components/SingleFilterButtonSpan";
import DismissKeyboard from "../components/Wrappers/DismissKeyboard";
import BackButton from "../components/Atomic/BackButton";
import {
  recommendationsService,
  thingsService,
} from "../services/feathersClient";
import WindowWidthRow from "../components/Wrappers/WindowWidthRow";
import * as T from "../components/Atomic/StyledText";

import MoviesAndShowsInput from "../components/Inputs/MoviesAndShowsInput";
import BooksInput from "../components/Inputs/BooksInput";
import GooglePlacesInput from "../components/Inputs/GooglePlacesInput";

import useTheme from "../hooks/useTheme";

import Screen from "../components/Wrappers/Screen";

import VerticalThingList from "../components/Lists/VerticalThingList";
import useListService from "../hooks/useListService";

import Animated from "react-native-reanimated";
import AnimatedHeader from "../components/AnimatedHeader";

const MainInputField = ({
  category,
  setItem,
  itemChosen,
  setItemChosen,
  autoFocus = false,
}) => {
  switch (category) {
    case "Place":
      return (
        <GooglePlacesInput
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
          autoFocus={autoFocus}
        />
      );
    case "Book":
      return (
        <BooksInput
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
          autoFocus={autoFocus}
        />
      );
    case "Movie":
      return (
        <MoviesAndShowsInput
          category={category}
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
          autoFocus={autoFocus}
        />
      );
    case "Show":
      return (
        <MoviesAndShowsInput
          category={category}
          setItem={setItem}
          itemChosen={itemChosen}
          setItemChosen={setItemChosen}
          autoFocus={autoFocus}
        />
      );
    default:
      return null;
  }
};

export default function SearchThings({ navigation, route }) {
  const theme = useTheme();

  const [category, setCategory] = useState("Movie");
  const [itemChosen, setItemChosen] = useState(false);
  const [item, setItem] = useState({});
  const { autoFocus } = (route && route.params) || { autoFocus: false };

  const [
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  ] = useListService(thingsService, {
    category,
  });

  React.useEffect(() => {
    if (item.title) {
      const thing = item;
      navigation.navigate("ThingDetails", { thing });
    }
  }, [item]);

  const y = React.useMemo(() => new Animated.Value(0), []);

  return (
    <Screen fullscreen={true}>
      <DismissKeyboard>
        <View
          style={{
            backgroundColor: theme.wallbg,
            flex: 1,
            alignItems: "center",
          }}
        >
          <WindowWidthRow
            style={{ zIndex: 3, paddingBottom: 10 }}
            pad={false}
            topPad={true}
          >
            <BackButton />
            <T.H1>Search Things</T.H1>
          </WindowWidthRow>
          <WindowWidthRow style={{ paddingBottom: 10, zIndex: 3 }} pad={false}>
            <SingleFilterButtonSpan
              options={["Movie", "Show", "Book", "Place"]}
              setFilter={setCategory}
              filter={category}
            />
          </WindowWidthRow>

          <AnimatedHeader y={y} dY={100} top={theme.topPad + 150}>
            <WindowWidthRow>
              <MainInputField
                category={category}
                setItem={setItem}
                itemChosen={itemChosen}
                setItemChosen={setItemChosen}
                autoFocus={autoFocus}
              />
            </WindowWidthRow>
          </AnimatedHeader>

          <VerticalThingList
            data={data}
            refresh={refresh}
            refreshing={refreshing}
            fetchMore={fetchMore}
            loading={loading}
            moreAvailable={moreAvailable}
            total={total}
            y={y}
            bounces={false}
          />
        </View>
      </DismissKeyboard>
    </Screen>
  );
}
