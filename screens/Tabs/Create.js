import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { FancyH1, Title, H4 } from "../../components/Atomic/StyledText";
import SingleFilterButtonSpan from "../../components/SingleFilterButtonSpan";
import AnimateExpand from "../../components/Wrappers/AnimateExpand";
import DismissKeyboard from "../../components/Wrappers/DismissKeyboard";
import SubmitButton from "../../components/Buttons/SubmitButton";
import IconButtons from "../../components/Buttons/IconButtons";

import { recommendationsService } from "../../services/feathersClient";

import MoviesAndShowsInput from "../../components/Inputs/MoviesAndShowsInput";
import BooksInput from "../../components/Inputs/BooksInput";
import GooglePlacesInput from "../../components/Inputs/GooglePlacesInput";

import useTheme from "../../hooks/useTheme";
import { addRecommendation } from "../../store/recommendationsSlice";
import { addPost } from "../../store/postsSlice";
import { connect } from "react-redux";

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
  hide ? null : (
    <AnimateExpand doAnimation={!hide} height={80}>
      <TextInput
        autoFocus={true}
        style={[styles.textInput, { minHeight: 60, marginTop: 15 }]}
        autoCorrect={true}
        placeholder="What would your friends want to know about this?"
        clearButtonMode="always"
        onChangeText={(text) => setItem({ ...item, main_comment: text })}
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

const mapState = (state) => ({
  sessionUserId: state.user._id,
});

const mapDispatch = {
  addRecommendation,
  addPost,
};

function CreateScreen({ navigation, route, addRecommendation, sessionUserId }) {
  const [category, setCategory] = useState("");
  const [itemChosen, setItemChosen] = useState(false);
  const [item, setItem] = useState({});

  React.useEffect(() => {
    if (route.params && route.params.repost) {
      const { repost } = route.params;
      setCategory(repost.category);
      setItemChosen(true);
      setItem(repost);
    }
  }, []);

  const theme = useTheme();
  const styles = getStyles(theme);

  const submitCreate = () => {
    //
    // NEW RECOMMENDATION BEING CREATED
    //
    const newRec = { ...item, creator: sessionUserId };

    newRec.physical_location = newRec.physical_location || {
      type: "Point",
      coordinates: [34, -83],
    };
    recommendationsService
      .create(newRec)
      .then((rec) => {
        addRecommendation(rec);
        addPost(rec);
      })
      .catch((e) => console.log("Error while creating rec...", e));

    // Show Modal
    navigation.navigate("Modal", {
      message: `Success! You just recommended\n\n ${item.title}. \n\nYour friends are very lucky to know you :)`,
    });
    setItem("");
    setItemChosen(false);
    setCategory("");
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <AnimateExpand doAnimation={!category} height={50}>
          <FancyH1>What do you like?</FancyH1>
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
          {/* <View style={{ marginTop: 10 }}> */}
          {itemChosen && (
            <View
              style={{
                width: theme.contentWidth,
                flexDirection: "row",
                justifyContent: "space-between",
                // backgroundColor: "blue",
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
                <IconButtons.AddToListButton />
              </View>
            </View>
          )}
          {!itemChosen && (
            <MainInputField
              category={category}
              setItem={setItem}
              item={item}
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

          <SubmitButton
            show={itemChosen && item.main_comment}
            title={"Post"}
            onPress={submitCreate}
          />
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

export default connect(mapState, mapDispatch)(CreateScreen);
