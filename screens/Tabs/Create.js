import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FancyH1, Title, H4 } from "../../components/Atomic/StyledText";
import SingleFilterButtonSpan from "../../components/SingleFilterButtonSpan";
import AnimateExpand from "../../components/Wrappers/AnimateExpand";
import DismissKeyboard from "../../components/Wrappers/DismissKeyboard";
import SubmitButton from "../../components/Buttons/SubmitButton";

import MyModal from "../../components/Modal";
import { ThingItemWithAddToList } from "../../components/ListItems/ThingItem";
import SelectDirectRecipients from "../../components/Lists/SelectDirectRecipients";

import MoviesAndShowsInput from "../../components/Inputs/MoviesAndShowsInput";
import BooksInput from "../../components/Inputs/BooksInput";
import GooglePlacesInput from "../../components/Inputs/GooglePlacesInput";

import useTheme from "../../hooks/useTheme";
import usePrevious from "../../hooks/usePrevious";
import { createRecommendationAsync } from "../../store/recommendationsSlice";

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
        onChange={(e) => setItem({ ...item, main_comment: e.nativeEvent.text })}
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

  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const prevCategory = usePrevious(category);
  const [itemChosen, setItemChosen] = useState(false);
  const [item, setItem] = useState({});
  const [directRecipients, setDirectRecipients] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const resetState = () => {
    setItem({});
    setItemChosen(false);
    setCategory("");
  };

  const receiveRepost = () => {
    if (route.params && route.params.repost) {
      const { repost } = route.params;
      setCategory(repost.category);
      setItem(repost);
      setItemChosen(true);
    }
  };

  React.useEffect(receiveRepost, [route.params]);

  const submitCreate = async () => {
    setProcessing(true);
    await dispatch(
      createRecommendationAsync({
        ...item,
        directRecipients,
        isPublic,
        creator: userId,
      })
    );
    setProcessing(false);
    resetState();
    setShowModal(true);
  };

  React.useEffect(() => {
    if (itemChosen && !!prevCategory) {
      setItem({});
      setItemChosen(false);
    }
  }, [category]);

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <MyModal
          showModal={showModal}
          setShowModal={setShowModal}
          type="create"
        />
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
            <ThingItemWithAddToList thing={item} onComplete={resetState} />
          )}
          {!itemChosen && (
            <MainInputField
              category={category}
              setItem={setItem}
              itemChosen={itemChosen}
              setItemChosen={setItemChosen}
            />
          )}

          {itemChosen && (
            <SelectDirectRecipients
              directRecipients={directRecipients}
              setDirectRecipients={setDirectRecipients}
            />
          )}

          <MainCommentField
            hide={!itemChosen}
            styles={styles}
            theme={theme}
            item={item}
            setItem={setItem}
          />

          {itemChosen && !!item.main_comment && (
            <SubmitButton
              isProcessing={processing}
              intent="primary"
              title="Post"
              fullwidth={true}
              onPress={submitCreate}
            />
          )}
          {itemChosen && (
            <SubmitButton
              title="Cancel"
              fullwidth={true}
              onPress={resetState}
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
