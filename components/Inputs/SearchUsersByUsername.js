import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import UserListItem from "../ListItems/UserListItem";
import FollowUnfollowButton from "../Buttons/FollowUnfollowButton";
import Autocomplete from "react-native-autocomplete-input";
import useDebounce from "../../hooks/useDebounce";
import useTheme from "../../hooks/useTheme";
//
import useSuggested from "../../hooks/useSuggested";
import { useNavigation } from "@react-navigation/native";
import { usersService } from "../../services/feathersClient";

export default function SearchUsersByUsername({ withFollowButton = true }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const styles = getStyles(theme);

  const {data:suggested} = useSuggested();
  React.useEffect(() => {
    if (query === "") {
      setData(suggested);
    }
  }, [query, suggested]);

  const debouncedQuery = useDebounce(query, 300);
  const searchDbForUsername = () => {
    if (!debouncedQuery) return;
    // search users by username fuzzy search
    setLoading(true);
    usersService
      .find({
        query: {
          username: { $search: [debouncedQuery] },
        },
      })
      .then((res) => {
        if (!!query) {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log("$search failed", e);
        setLoading(false);
      });

    //
  };
  useEffect(searchDbForUsername, [debouncedQuery]);

  const reset = () => {
    setQuery("");
  };

  const navigation = useNavigation();
  const onCancel = () => {
    reset();
    navigation.goBack();
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (query.length === 0) {
      reset();
    }
  }, [query]);

  return (
      <Autocomplete
        onStartShouldSetResponderCapture={() => Keyboard.dismiss()}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        listStyle={styles.list}
        flatListProps={{contentContainerStyle: {paddingBottom: 100}}}
        data={data}
        defaultValue={query}
        keyExtractor={(item) => item._id}
        renderItem={({ item: u }) => (
          <UserListItem key={u._id} user={u}>
            {withFollowButton && <FollowUnfollowButton userId={u._id} />}
          </UserListItem>
        )}
        renderTextInput={() => (
          <CustomTextInput
            onChange={(e) => {
              setQuery(e.nativeEvent.text.toLowerCase());
            }}
            loading={loading}
            theme={theme}
            styles={styles}
            value={query}
            onCancel={onCancel}
          />
        )}
      />
  );
}

function CustomTextInput({ onChange, value, loading, onCancel }) {
  const theme = useTheme();

  return (
      <View
        style={{
          width: theme.windowWidth,
          paddingHorizontal: 20,
          flexDirection: "row",
          height: 38,
        }}
      >
        <TextInput
          style={{
            color: theme.primary,
            flex:1
          }}
          value={value}
          onChange={onChange}
          autoCorrect={false}
          keyboardAppearance={theme.theme}
          placeholderTextColor={theme.iconDefault}
          placeholder="Find friends by username..."
          onSubmit={onCancel}
          autoFocus={true}
        />
        {loading && <ActivityIndicator style={{alignSelf: 'flex-end'}} color={theme.primary} size="small" />}
      </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: theme.windowWidth,
    },
    inputContainer: {
      borderWidth: 0,
    },
    list: {
      borderWidth: 0,
      backgroundColor: "transparent",
      height: theme.windowHeight - 50,
      flexGrow: 1
    },
  });
