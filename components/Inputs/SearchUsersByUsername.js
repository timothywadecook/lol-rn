import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
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
import BackButton from "../Atomic/BackButton";

export default function SearchUsersByUsername({ withFollowButton = true }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const styles = getStyles(theme);

  const [suggested] = useSuggested();
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
    // setData([]);
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
    <View style={styles.container}>
      <Autocomplete
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={styles.inputContainer}
        listStyle={styles.list}
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
    </View>
  );
}

function CustomTextInput({ onChange, value, loading, onCancel }) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: theme.windowWidth,
        paddingRight: 10,
      }}
    >
      <BackButton />

      <View
        style={{
          flex: 1,
          alignSelf: "center",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: theme.bg,
          borderRadius: 20,
          height: 38,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: theme.primary,
          }}
          value={value}
          onChange={onChange}
          autoCorrect={false}
          keyboardAppearance={theme.theme}
          // placeholderTextColor="#5d5d5d"
          placeholderTextColor={theme.iconDefault}
          placeholder="Find friends by username..."
          onSubmit={onCancel}
          autoFocus={true}
        />
        {loading && <ActivityIndicator color={theme.primary} size="small" />}
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    autocompleteContainer: {
      backgroundColor: "transparent",
      flex: 1,
      borderWidth: 0,
    },
    inputContainer: {
      borderWidth: 0,
    },
    list: {
      borderWidth: 0,
      borderRadius: 5,
      backgroundColor: "transparent",
      height: theme.windowHeight * 0.4,
    },
    row: { flexDirection: "row", alignItems: "center" },
    listItemImage: {
      width: "5%",
      height: 20,
      resizeMode: "contain",
      borderRadius: 2,
    },
    infoText: {
      textAlign: "center",
      fontSize: 16,
    },
    inputText: {
      fontWeight: "normal",
      backgroundColor: theme.inputBackground,
      height: 38,
      color: "#5d5d5d",
      fontSize: 16,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 4.5,
      marginTop: 7.5,
    },
    listItemTitle: {
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      margin: 2,
      color: theme.primary,
    },
    subtitle: { color: theme.iconDefault },
    subsubtitle: { color: theme.purple },
  });
