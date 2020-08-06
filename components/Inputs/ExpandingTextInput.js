import React from "react";
import { TextInput } from "react-native";
import AnimateExpand from "../Wrappers/AnimateExpand";
import useTheme from "../../hooks/useTheme";

export default function ExpandingTextInput({
  useRef = null,
  value,
  setValue,
  placeholder,
  show = false,
  height = 60,
  secureTextEntry = false,
  autoCorrect = false,
  keyboardType = null,
  textContentType = null,
  onSubmitEditing = null,
}) {
  const theme = useTheme();

  return (
    <AnimateExpand doAnimation={show} height={height}>
      <TextInput
        ref={useRef}
        onSubmitEditing={onSubmitEditing}
        selectTextOnFocus={true}
        returnKeyType="next"
        secureTextEntry={secureTextEntry}
        style={{
          width: theme.contentWidth,
          backgroundColor: theme.inputBackground,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 4.5,
          marginTop: 7.5,
        }}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        clearButtonMode="while-editing"
        onChangeText={(text) => setValue(text)}
        value={value}
        underlineColorAndroid="transparent"
        keyboardAppearance={theme.theme}
        blurOnSubmit={true}
        keyboardType={keyboardType}
        textContentType={textContentType}
      />
    </AnimateExpand>
  );
}

export const PasswordInput = ({
  useRef,
  show,
  value,
  setValue,
  placeholder,
  onSubmitEditing,
}) => (
  <ExpandingTextInput
    useRef={useRef}
    value={value}
    setValue={setValue}
    placeholder={placeholder}
    show={show}
    secureTextEntry={true}
    textContentType="password"
    onSubmitEditing={onSubmitEditing}
  />
);

export const EmailInput = ({
  useRef,
  show,
  value,
  setValue,
  onSubmitEditing,
}) => (
  <ExpandingTextInput
    useRef={useRef}
    value={value}
    setValue={(text) => setValue(text.toLowerCase())}
    placeholder="Email"
    show={show}
    keyboardType="email-address"
    textContentType="emailAddress"
    onSubmitEditing={onSubmitEditing}
  />
);
