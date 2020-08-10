import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FancyH1, Title, H4 } from "../../components/Atomic/StyledText";
import SingleFilterButtonSpan from "../../components/SingleFilterButtonSpan";
import AnimateExpand from "../../components/Wrappers/AnimateExpand";
import DismissKeyboard from "../../components/Wrappers/DismissKeyboard";
import SubmitButton from "../../components/Buttons/SubmitButton";
import IconButtons from "../../components/Buttons/IconButtons";

import Modal from "../../components/Modal";

import MoviesAndShowsInput from "../../components/Inputs/MoviesAndShowsInput";
import BooksInput from "../../components/Inputs/BooksInput";
import GooglePlacesInput from "../../components/Inputs/GooglePlacesInput";

import useTheme from "../../hooks/useTheme";
import { createRecommendationAsync } from "../../store/recommendationsSlice";
import AddThingToListModal from "../../components/AddThingToListModal";
import { thingsService } from "../../services/feathersClient";

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
const MainCommentField = ({ hide, styles, theme, item, setItem }) =>
  !hide && (
    <AnimateExpand doAnimation={!hide} height={80}>
      <TextInput
        autoFocus={true}
        style={[styles.textInput, { minHeight: 60, marginTop: 15 }]}
        autoCorrect={true}
        placeholder="What would your friends want to know about this?"
        clearButtonMode="always"
        onChange={(e) => setItem({ ...item, main_comment: e.target.value })}
        value={item.main_comment}
        multiline={true}
        numberOfLines={4}
        underlineColorAndroid="transparent"
        keyboardAppearance={theme.theme}
        returnKeyType="done"
        blurOnSubmit={true}
      />
    </AnimateExpand>
  );

export default function CreateScreen({ route }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [category, setCategory] = useState("");
  const [itemChosen, setItemChosen] = useState(false);
  const [item, setItem] = useState({});

  const resetState = () => {
    setItem({});
    setItemChosen(false);
    setCategory("");
  };

  const receiveRepost = () => {
    if (route.params && route.params.repost) {
      const { repost } = route.params;
      console.log("is repost actually empty?", repost);
      setCategory(repost.category);
      setItem(repost);
      setItemChosen(true);
    }
  };

  const addPhysicalLocationIfNeeded = (r) => {
    const newRec = { ...r };
    newRec.physical_location = newRec.physical_location || {
      type: "Point",
      coordinates: [34, -83],
    };
    return newRec;
  };

  React.useEffect(receiveRepost, [route.params]);

  const submitCreate = () => {
    const newRec = { ...item, creator: userId };
    const newRecWithLocation = addPhysicalLocationIfNeeded(newRec);
    dispatch(createRecommendationAsync(newRecWithLocation));
    resetState();
    setShowModal(true);
  };

  const getThingId = () => {
    async function findOrCreateThing() {
      const params = { category };
      if (category === "Movie" || category === "Show") {
        params.imdb = item.imdb;
      }
      if (category === "Place") {
        params.place_id = item.place_id;
      }
      if (category === "Book") {
        params.api_id = item.api_id;
      }
      const res = await thingsService.find({ query: params });
      if (res.total === 1) {
        return res.data[0]._id;
      } else if (res.total === 0) {
        console.log(
          "Thing doesnt exist in database yet and in order to create it on the fly we need to move addPhysicalLocation to a before hook on create Things"
        );
      }
    }
    if (itemChosen && item.title && item.subtitle && item.category) {
      findOrCreateThing();
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          type="create"
        />
        {itemChosen && (
          <AddThingToListModal
            thingId={getThingId()}
            showModal={showAddToListModal}
            setShowModal={setShowAddToListModal}
          />
        )}
        <AnimateExpand doAnimation={!category} height={50}>
          <FancyH1 style={{ color: theme.purple }}>Like Out Loud</FancyH1>
        </AnimateExpand>

        <SingleFilterButtonSpan
          options={["Movie", "Show", "Book", "Place"]}
          setFilter={setCategory}
          filter={category}
        />

        <AnimateExpand
          doAnimation={!!category}
          height={550}
          style={{
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {itemChosen && (
            <View
              style={{
                width: theme.contentWidth,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      resizeMode: "cover",
                      width: "10%",
                      height: 40,
                      borderRadius: 5,
                      marginRight: 5,
                      marginTop: 2,
                    }}
                  />
                )}

                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Title style={{ paddingBottom: 0 }}>{item.title}</Title>
                  <H4 style={{ fontWeight: "bold" }}>{item.subtitle}</H4>
                </View>
              </View>

              <View>
                <IconButtons.AddCircle
                  onPress={() => setShowAddToListModal(true)}
                />
              </View>
            </View>
          )}
          {!itemChosen && (
            <MainInputField
              category={category}
              setItem={setItem}
              itemChosen={itemChosen}
              setItemChosen={setItemChosen}
            />
          )}

          <MainCommentField
            hide={!itemChosen}
            styles={styles}
            theme={theme}
            item={item}
            setItem={setItem}
          />

          {itemChosen && !item.main_comment && (
            <SubmitButton title="Cancel" onPress={resetState} />
          )}

          {itemChosen && item.main_comment && (
            <SubmitButton
              intent="primary"
              title="Post"
              onPress={submitCreate}
            />
          )}
        </AnimateExpand>
      </View>
    </DismissKeyboard>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.wallbg,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    textInput: {
      backgroundColor: theme.inputBackground,
      width: theme.contentWidth,
      color: "#5d5d5d",
      fontSize: 16,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 4.5,
      marginTop: 7.5,
    },
  });
