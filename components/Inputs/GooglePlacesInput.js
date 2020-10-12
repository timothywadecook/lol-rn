import React from "react";
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import env from "../../env";
import useTheme from "../../hooks/useTheme";
//
import { SearchBar } from "react-native-elements";

const GooglePlacesInput = ({
  itemChosen,
  setItemChosen,
  setItem,
  autoFocus,
}) => {
  const theme = useTheme();

  const style = {
    container: {
      width: theme.windowWidth,
    },
    description: {
      color: theme.primary,
    },
    separator: {
      height: 0,
    },
    listView: {
      backgroundColor: theme.wallbg,
      borderRadius: 5,
    },
    row: { flexDirection: "row", alignItems: "center", padding: 10 },
    poweredContainer: {
      backgroundColor: theme.iconDefault,
      padding: 10,
    },
    predefinedPlacesDescription: {
      color: "#1faadb",
    },
  };

  const ref = React.useRef();

  const RenderTextInput = (props) => (
    <SearchBar
      keyboardAppearance={theme.theme}
      platform={Platform.OS}
      onClear={() => ref.current.setAddressText("")}
      onCancel={() => ref.current.setAddressText("")}
      autoFocus={autoFocus}
      containerStyle={{ backgroundColor: "transparent" }}
      placeholder="Enter a place"
      returnKeyType="default"
      {...props}
    />
  );

  const textInputProps = {
    InputComp: RenderTextInput,
    clearButtonMode: "never",
    autoFocus: autoFocus,
  };

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      suppressDefaultStyles={true}
      textInputProps={textInputProps}
      blurOnSubmit={false}
      fetchDetails={false}
      minLength={3}
      onPress={(item) => {
        const { place_id, id, structured_formatting, types } = item;
        setItemChosen(true);

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${env.GCP_KEY}&fields=geometry,photo`;
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
                api_id: place_id,
                image: json.result.photos[0].photo_reference,
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
