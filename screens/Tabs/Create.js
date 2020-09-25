import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AnimateExpand from "../../components/Wrappers/AnimateExpand";
import DismissKeyboard from "../../components/Wrappers/DismissKeyboard";
import SubmitButton from "../../components/Buttons/SubmitButton";
import BackButton from "../../components/Atomic/BackButton";

import { ThingItem } from "../../components/ListItems/ThingItem";
import SelectDirectRecipients from "../../components/Lists/SelectDirectRecipients";
import WindowWidthRow from "../../components/Wrappers/WindowWidthRow";
import * as T from "../../components/Atomic/StyledText";

import useTheme from "../../hooks/useTheme";
import { createRecommendationAsync } from "../../store/recommendationsSlice";

import Screen from "../../components/Wrappers/Screen";

const MainCommentField = ({ styles, theme, main_comment, setComment }) => (
  <AnimateExpand doAnimation={true} height={80}>
    <TextInput
      autoFocus={true}
      style={[styles.textInput, { minHeight: 60, marginTop: 15 }]}
      autoCorrect={true}
      placeholder="What would your friends want to know about this?"
      clearButtonMode="always"
      onChangeText={(text) => setComment(text)}
      value={main_comment}
      multiline={true}
      numberOfLines={4}
      underlineColorAndroid="transparent"
      keyboardAppearance={theme.theme}
      returnKeyType="done"
      blurOnSubmit={true}
    />
  </AnimateExpand>
);

export default function CreateScreen({ navigation, route }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(false);

  const { thing } = route.params;

  const [main_comment, setComment] = useState("");
  const [directRecipients, setDirectRecipients] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const submitCreate = async () => {
    setProcessing(true);
    await dispatch(
      createRecommendationAsync({
        ...thing,
        main_comment,
        directRecipients,
        isPublic,
        creator: userId,
      })
    );
    setProcessing(false);
    navigation.navigate("Home");
  };

  return (
    <Screen>
      <DismissKeyboard>
        <View style={styles.container}>
          <WindowWidthRow pad={true}>
            <BackButton />
            <T.H1>Recommend</T.H1>
          </WindowWidthRow>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <ThingItem thing={thing} />

            <SelectDirectRecipients
              directRecipients={directRecipients}
              setDirectRecipients={setDirectRecipients}
            />

            <MainCommentField
              styles={styles}
              theme={theme}
              main_comment={main_comment}
              setComment={setComment}
            />

            {!!main_comment && (
              <SubmitButton
                isProcessing={processing}
                intent="primary"
                title="Post Recommendation"
                fullwidth={true}
                onPress={submitCreate}
              />
            )}
            <SubmitButton
              title="Cancel"
              fullwidth={true}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </DismissKeyboard>
    </Screen>
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
