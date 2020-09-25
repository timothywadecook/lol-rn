import React from "react";
import { TextInput, View } from "react-native";
import RoundButton from "../Buttons/RoundButton";
import IconButtons from "../Buttons/IconButtons";
import useTheme from "../../hooks/useTheme";

export default function CommentInput({
  onSubmitComment,
  scrollToInput,
  scrollToStart,
}) {
  const theme = useTheme();
  const [input, setInput] = React.useState("");

  const [active, setActive] = React.useState(false);
  const onSubmit = () => {
    onSubmitComment(input);
    setInput("");
    setActive(false);
  };
  // show a round button with example text, on press, switch to text input with the text already entered

  return (
    <RoundButton
      onPress={() => setActive(true)}
      solid={true}
      renderIcon={() => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButtons.CommentButton
            onPress={() => setActive(true)}
            padding={0}
          />

          {active && (
            <TextInput
              style={{ color: theme.primary, width: theme.windowWidth * 0.5 }}
              onFocus={() => scrollToInput()}
              onEndEditing={() => {
                setActive(false);
                scrollToStart();
              }}
              multiline={true}
              value={input}
              onChangeText={(text) => {
                setInput(text);
                scrollToInput();
              }}
              autoCorrect={true}
              autoFocus={true}
              placeholderTextColor="#5d5d5d"
              placeholder="Type a reply..."
              onSubmitEditing={onSubmit}
              keyboardAppearance={theme.theme}
              returnKeyType="send"
            />
          )}
        </View>
      )}
      title={active ? "" : "Type a reply..."}
    />
  );
}
