/*This is an example of AutoComplete Input/ AutoSuggestion Input*/
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";

import useDebounce from "../../hooks/useDebounce";
import useTheme from "../../hooks/useTheme";
// import { lookupService } from "../../services/feathersClient";
import env from "../../env";

// map to Movie API "Type" from our "category"
const getType = (category) => {
  switch (category) {
    case "Movie":
      return "movie";
    case "Show":
      return "series";
    default:
      return "";
  }
};

export default function MoviesAndShowInput({
  category,
  itemChosen,
  setItemChosen,
  setItem,
}) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const theme = useTheme();
  const styles = getStyles(theme, itemChosen);

  const debouncedQuery = useDebounce(query, 300);

  const getData = () => {
    if (!debouncedQuery || itemChosen) return;
    fetch(
      `https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&type=${getType(
        category
      )}&s=${debouncedQuery}`,
      {
        headers: {
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
          "x-rapidapi-key": env.RAPI_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.Search && json.Search.length > 0) {
          setData(json.Search);
        }
      })
      .catch((e) => console.log("Error: ", e));
  };

  const clearSelection = () => {
    setData([]);
    setItemChosen(false);
    setItem({});
  };

  useEffect(getData, [category, debouncedQuery]);

  const handleItemSelection = (item) => {
    setData([]);
    const { Title, Year, imdbID, Poster } = item;

    setQuery(`${Title}, ${Year}`);
    setItem({
      category,
      // list_of_tags,
      title: Title,
      subtitle: Year,
      imdb: imdbID,
      image: Poster,
      api: "MovieDatabase",
      api_id: imdbID,
    });
    setItemChosen(true);
  };

  useEffect(() => {
    if (!query) {
      clearSelection();
    }
  }, [query]);

  const renderItem = ({ item, i }) => (
    <TouchableOpacity
      onPress={() => {
        handleItemSelection(item);
      }}
      style={styles.row}
    >
      {item.Poster && (
        <Image source={{ uri: item.Poster }} style={styles.listItemImage} />
      )}
      <Text style={styles.listItemTitle}>
        {item.Title} <Text style={styles.subsubtitle}> {item.Year}</Text>
      </Text>
    </TouchableOpacity>
  );

  const renderTextInput = () => (
    <CustomTextInput
      onChange={(e) => {
        // using onChange instead of onChangeText to include handling clearInput on iOS
        setQuery(e.nativeEvent.text);
        console.log(e.nativeEvent.text);
      }}
      styles={styles}
      theme={theme}
      value={query}
    />
  );

  return (
    <Autocomplete
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      listStyle={styles.list}
      data={itemChosen ? [] : data}
      defaultValue={query}
      keyExtractor={(item, i) => item.Title + item.Year + item.imdb}
      renderItem={renderItem}
      renderTextInput={renderTextInput}
      onStartShouldSetResponderCapture={() => Keyboard.dismiss()}
    />
  );
}

const CustomTextInput = ({ theme, onChange, value, styles }) => {
  return (
    <TextInput
      style={styles.inputText}
      autoFocus={true}
      autoCorrect={false}
      placeholder="Search by title"
      placeholderTextColor="#A8A8A8"
      clearButtonMode="while-editing"
      clearTextOnFocus={true}
      onChange={onChange}
      value={value}
      underlineColorAndroid="transparent"
      keyboardAppearance={theme.theme}
      blurOnSubmit={false}
    />
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: theme.contentWidth,
      alignItems: "stretch",
    },
    inputContainer: {
      borderWidth: 0,
    },
    list: {
      borderWidth: 0,
      borderRadius: 5,
      padding: 5,
      height: theme.windowHeight * 0.8,
      backgroundColor: "transparent",
    },
    row: { flexDirection: "row", alignItems: "center", paddingVertical: 4 },
    listItemImage: {
      width: "8%",
      height: 30,
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
