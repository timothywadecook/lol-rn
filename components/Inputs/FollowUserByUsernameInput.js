import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { H2 } from "../Atomic/StyledText";
import UserAvatar from "react-native-user-avatar";
import Autocomplete from "react-native-autocomplete-input";
import useDebounce from "../../hooks/useDebounce";
import useTheme from "../../hooks/useTheme";
//
import { usersService } from "../../services/feathersClient";
import { toggleFollowingAsync } from "../../store/followsSlice";

export default function FollowUserByUsernameInput({ setInputFocus }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const followingIds = useSelector((state) => state.follows.following);

  const [item, setItem] = useState({});
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const theme = useTheme();
  const styles = getStyles(theme);

  const debouncedQuery = useDebounce(query, 300);
  const searchDbForUsername = () => {
    if (!debouncedQuery || !!item._id) return;
    // search users by username fuzzy search
    usersService
      .find({
        query: {
          _id: { $nin: followingIds },
          username: { $search: [debouncedQuery] },
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("SUCCESS $SEARCH BRUH: ", res);
      })
      .catch((e) => console.log("$search failed", e));

    //
  };
  useEffect(searchDbForUsername, [debouncedQuery]);

  const handleItemSelection = (item) => {
    setItem(item);
    setQuery(item.username);
    setData([]);
  };

  const handleFollowUser = () => {
    dispatch(toggleFollowingAsync(item._id)).then(() =>
      navigation.navigate("Modal", {
        message: `Success! You are following @${item.username}`,
      })
    );
    setItem({});
    setQuery("");
  };

  const clearSelection = () => {
    setItem({});
    setData([]);
  };
  useEffect(() => {
    if (!query) {
      clearSelection();
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <Autocomplete
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={styles.inputContainer}
        listStyle={styles.list}
        data={item._id ? [] : data}
        defaultValue={query}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleItemSelection(item);
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
            theme={theme}
            styles={styles}
            value={query}
            item={item}
            handleFollowUser={handleFollowUser}
            setInputFocus={setInputFocus}
          />
        )}
      />
    </View>
  );
}

function CustomTextInput({
  onChange,
  value,
  item,
  handleFollowUser,
  setInputFocus,
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: theme.contentWidth,
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
        placeholderTextColor="#5d5d5d"
        placeholder="Follow by username..."
        onFocus={() => setInputFocus(true)}
        onSubmitEditing={() => {
          setInputFocus(false);
        }}
      />
      {item._id && (
        <Button
          title="Follow"
          color={theme.purple}
          onPress={handleFollowUser}
        />
      )}
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
