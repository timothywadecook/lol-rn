import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import useDebounce from "../../hooks/useDebounce";
import useTheme from "../../hooks/useTheme";
import env from "../../env";
// import { lookupService } from "../../services/feathersClient";

export default function BooksInput({ setItem, itemChosen, setItemChosen }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]); // {title, date_published, [authors], isbn} assumed
  const theme = useTheme();
  const styles = getStyles(theme, itemChosen);

  // now we call our hook passing the current query value.
  // the hook will only return the latest value if it has been more than 500 ms since the time it changed
  // the goal is to make the api call only when the user stops typing
  const debouncedQuery = useDebounce(query, 300);

  const getData = () => {
    // make sure we have a debounced query or that an item has not been chosen
    if (!debouncedQuery || itemChosen) return;

    // build the query URL based on the debounced query
    const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${debouncedQuery}&printType=books&langRestrict=en&maxResults=20&key=${env.GCP_KEY}`;

    fetch(queryURL)
      .then((res) => res.json())
      .then((json) => {
        if (json.items && json.items.length > 0) {
          setData(json.items);
        }
      })
      .catch((e) => console.log("Error: ", e));
  };

  // const lookupData = async () => {
  //   if (!debouncedQuery || itemChosen) return;
  //   const data = await lookupService.find({
  //     query: {
  //       category: "Book",
  //       query: debouncedQuery,
  //     },
  //   });
  //   setData(data);
  // };

  const clearSelection = () => {
    setData([]);
    setItemChosen(false);
    setItem({});
  };

  useEffect(getData, [debouncedQuery]);

  const handleItemSelection = (item) => {
    const {
      title,
      authors,
      publishedDate,
      imageLinks,
      categories: list_of_tags,
    } = item.volumeInfo;

    let subtitle = authors ? authors.join(" ").trim() : "";

    setQuery(
      `${title}, ${subtitle}, ${
        publishedDate ? publishedDate.substring(0, 4) : null
      }`
    );
    setItem({
      category: "Book",
      list_of_tags,
      title,
      subtitle,
      image: imageLinks.thumbnail,
      api: "GoogleBooks",
      api_id: item.id,
    });
    setItemChosen(true);
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
        data={itemChosen ? [] : data}
        defaultValue={query}
        keyExtractor={(item) => item.id + Math.random()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleItemSelection(item);
            }}
            style={styles.row}
          >
            {item.volumeInfo.imageLinks && (
              <Image
                source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                style={styles.listItemImage}
              />
            )}
            <Text style={styles.listItemTitle}>
              {item.volumeInfo.title}
              {item.volumeInfo.authors ? (
                <Text style={styles.subtitle}>
                  {" "}
                  {item.volumeInfo.authors.join(" ")}
                </Text>
              ) : (
                ""
              )}
              <Text style={styles.subsubtitle}>
                {" " +
                  (item.volumeInfo.publishedDate
                    ? item.volumeInfo.publishedDate.substring(0, 4)
                    : null)}
              </Text>
            </Text>
          </TouchableOpacity>
        )}
        renderTextInput={() => (
          <CustomTextInput
            onChange={(e) => {
              setQuery(e.nativeEvent.text);
            }}
            theme={theme}
            styles={styles}
            value={query}
          />
        )}
      />
    </View>
  );
}

const CustomTextInput = ({ theme, styles, onChange, value }) => {
  return (
    <TextInput
      style={styles.inputText}
      autoCorrect={false}
      placeholder="Search by title"
      clearButtonMode="always"
      clearTextOnFocus={true}
      onChange={onChange}
      value={value}
      underlineColorAndroid="transparent"
      keyboardAppearance={theme.theme}
      autoFocus={true}
    />
  );
};

const getStyles = (theme, itemChosen) =>
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
