import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Button, TextInput } from "react-native";
import useTheme from "../hooks/useTheme";

// Components
import Screen from "../components/Wrappers/Screen";
import * as T from "../components/Atomic/StyledText";
import LightModeDarkModeButton from "../components/Buttons/LightModeDarkModeButton";

import {
  logoutAsync,
  saveUsernameAsync,
  saveNameAsync,
} from "../store/userSlice";

export default Settings = ({navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector(state=>state.user)

  function EditableTextField({ initialValue, onSave, lowercase }) {
    const [value, setValue] = useState(initialValue);
    const [changed, setChanged] = useState(false);

    return (
      <View
        style={{
          alignSelf: "center",
          width: theme.contentWidth,
          paddingHorizontal: 20,
          paddingVertical: 10,
          margin: 5,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: theme.bg,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          // borderRadius: 20,
        }}
      >
        <TextInput
          value={value}
          style={{ flex: 1, fontSize: 24, color: theme.primary }}
          onChangeText={(text) => {
            if (lowercase) {
              setValue(text.toLowerCase());
            } else {
              setValue(text);
            }
            setChanged(text !== initialValue);
          }}
        />
        {changed && (
          <Button
            title="Save"
            color={theme.purple}
            onPress={() => onSave(value)}
          />
        )}
      </View>
    );
  }

  return (
     <Screen center={true} >
    <View
      style={{
        width: theme.contentWidth,
        flexDirection: "column",
        paddingTop: 15,
      }}
    >
      <T.H3>Edit Name:</T.H3>
      <EditableTextField
        initialValue={user.name}
        onSave={(value) => dispatch(saveNameAsync(value))}
      />

      <T.H3>Edit Handle:</T.H3>
      <EditableTextField
        initialValue={user.username}
        onSave={(value) => dispatch(saveUsernameAsync(value))}
        lowercase={true}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 5,
        }}
      >
        <T.H3>Toggle Light Mode Dark Mode</T.H3>
        <LightModeDarkModeButton size={24} />
      </View>

      <View
        style={{
          padding: 100,
        }}
      >
        <Button
          onPress={() => dispatch(logoutAsync())}
          // style={{ padding: 20, alignSelf: "flex-end" }}
          color={theme.purple}
          title="Logout"
        />
      </View>
    </View>
    </Screen>
  );
};

