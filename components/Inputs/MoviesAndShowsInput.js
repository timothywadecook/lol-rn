/*This is an example of AutoComplete Input/ AutoSuggestion Input*/
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Platform,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { SearchBar, Icon } from "react-native-elements";

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
  autoFocus,
}) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const theme = useTheme();
  const styles = getStyles(theme, itemChosen);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 200);

  const getData = () => {
    if (!debouncedQuery || itemChosen) return;
    setLoading(true);
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
        setLoading(false);
      })
      .catch((e) => {
        console.log("Error: ", e);
        setLoading(false);
      });
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

  // const [c, setC] = React.useState("Movies");
  // const categories = ["Movies", "Shows", "Books", "Restaurants", "Places"];
  // React.useEffect(() => {
  //   const int = setInterval(() => {
  //     const index = Math.floor(Math.random() * 5);
  //     console.log("index", index);
  //     setC(categories[index]);
  //   }, 3000);
  //   return () => clearInterval(int);
  // }, []);
  const [placeholder, setPlaceholder] = React.useState("Post a recommendation");
  const renderTextInput = () => (
    <SearchBar
      platform={Platform.OS}
      showLoading={loading}
      onClear={() => setQuery("")}
      onCancel={() => setQuery("")}
      autoFocus={autoFocus}
      inputContainerStyle={{ backgroundColor: theme.iconBg }}
      containerStyle={{ backgroundColor: "transparent" }}
      // placeholder="Places, Movies, Shows, Books..."
      placeholder={placeholder}
      searchIcon={<Icon name="edit" type="feather" color={theme.purple} />}
      onFocus={() => setPlaceholder("Places, Movies, Shows, Books...")}
      onEndEditing={() => setPlaceholder("Post a recommendation")}
      onChange={(e) => {
        setQuery(e.nativeEvent.text);
      }}
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

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      // width: theme.windowWidth,
    },
    inputContainer: {
      borderWidth: 0,
    },
    list: {
      borderWidth: 0,
      borderRadius: 5,
      padding: 5,
      // height: theme.windowHeight * 0.8,
      backgroundColor: theme.wallbg,
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
