import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { H2 } from "../Atomic/StyledText";
import UserAvatar from "react-native-user-avatar";
import Autocomplete from "react-native-autocomplete-input";
import useDebounce from "../../hooks/useDebounce";
import useTheme from "../../hooks/useTheme";
//
import { useNavigation } from "@react-navigation/native";
import { usersService } from "../../services/feathersClient";

export default function FollowUserByUsernameInput({
  setInputFocus,
  inputFocus,
}) {
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const styles = getStyles(theme);

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
    setData([]);
    setInputFocus(false);
  };

  const onViewProfile = (item) => {
    reset();
    navigation.navigate("FriendDetails", { friend: item });
  };

  const onCancel = () => {
    reset();
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (query.length > 0) {
      setInputFocus(true);
    } else {
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
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onViewProfile(item);
            }}
            style={styles.row}
          >
            <UserAvatar
              style={{
                margin: 10,
                borderWidth: 0.5,
                borderColor: "white",
              }}
              size={30}
              name={item.name}
              bgColor={"black"}
              src={item.avatar}
            />
            <H2 style={styles.listItemTitle}>{item.username}</H2>
          </TouchableOpacity>
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
            inputFocus={inputFocus}
          />
        )}
      />
    </View>
  );
}

function CustomTextInput({ onChange, value, loading, onCancel, inputFocus }) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: inputFocus ? theme.contentWidth : theme.contentWidth * 0.65,
        alignSelf: "center",
        paddingHorizontal: 20,
        margin: 7,
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
      />
      {value.length > 0 &&
        (loading ? (
          <ActivityIndicator color={theme.primary} size="small" />
        ) : (
          <Button title="Cancel" color={theme.iconDefault} onPress={onCancel} />
        ))}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: theme.contentWidth,
    },
    autocompleteContainer: {
      backgroundColor: "transparent",
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
