import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import env from "../../env";
import useTheme from "../../hooks/useTheme";

const GooglePlacesInput = ({ itemChosen, setItemChosen, setItem }) => {
  const theme = useTheme();

  const style = {
    container: {
      width: theme.contentWidth,
      flex: "initial",
    },
    description: {
      color: theme.primary,
    },
    separator: {
      height: 0,
    },
    listView: {
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: 5,
    },
    textInputContainer: {
      backgroundColor: "rgba(0,0,0,0)",
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    textInput: {
      fontWeight: "normal",
      backgroundColor: theme.inputBackground,
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: "#5d5d5d",
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: "#1faadb",
    },
  };

  return (
    <GooglePlacesAutocomplete
      clearTextOnFocus={true}
      autoFocus={true}
      keyboardAppearance={theme.theme}
      placeholder="Enter a place"
      fetchDetails={false}
      minLength={3}
      returnKeyType="default"
      onPress={(item) => {
        const { place_id, id, structured_formatting, types } = item;
        setItemChosen(true);

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${env.GCP_KEY}&fields=geometry`;
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            if (json.result && json.result.geometry) {
              const { lat, lng } = json.result.geometry.location;
              setItem({
                category: "Place",
                title: structured_formatting.main_text,
                subtitle: structured_formatting.secondary_text,
                list_of_tags: types,
                api: "GooglePlaces",
                api_id: id,
                physical_location: {
                  type: "Point",
                  coordinates: [lat, lng],
                },
                place_id,
              });
            }
          })
          .catch((e) => {
            console.log("Error: ", e);
            setItemChosen(false);
          });
      }}
      query={{
        key: env.GCP_KEY,
        language: "en",
      }}
      styles={style}
    />
  );
};

export default GooglePlacesInput;
