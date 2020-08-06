import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import { H3, H4 } from "./Atomic/StyledText";
import LightModeDarkModeButton from "../components/Buttons/LightModeDarkModeButton";

import { logout } from "../services/client";

const ProfileSettings = ({ user, theme }) => {
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
          <Button title="Save" color={theme.purple} onPress={onSave} />
        )}
      </View>
    );
  }

  return (
    <View style={{ width: theme.contentWidth, flexDirection: "column" }}>
      <H3>Edit Name:</H3>
      <EditableTextField
        initialValue={user.first_name + " " + user.last_name}
        onSave={() => console.log("Name Changed")}
      />

      <H3>Edit Handle:</H3>
      <EditableTextField
        initialValue={user.username}
        onSave={() => console.log("Username Changed")}
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
        <H3>Toggle Light Mode Dark Mode</H3>
        <LightModeDarkModeButton size={24} />
      </View>

      <View
        style={{
          padding: 100,
        }}
      >
        <Button
          onPress={logout}
          // style={{ padding: 20, alignSelf: "flex-end" }}
          color={theme.purple}
          title="Logout"
        />
      </View>
    </View>
  );
};

export default ProfileSettings;
