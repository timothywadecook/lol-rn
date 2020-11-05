import React, { useState } from "react";
import { ScrollView } from "react-native";

import WindowWidthRow from "../../../components/Wrappers/WindowWidthRow";
import * as T from "../../../components/Atomic/StyledText";

import MoviesAndShowsInput from "../../../components/Inputs/MoviesAndShowsInput";

import useTheme from "../../../hooks/useTheme";

import Screen from "../../../components/Wrappers/Screen";
import SpotifyCard from "../../../components/Atomic/SpotifyCard";
import SectionHeader from "../../../components/Atomic/SectionHeader";
import ContainerCard from "../../../components/Wrappers/ContainerCard";

import MapView from "react-native-maps";

export default function Browse() {
  const theme = useTheme();
  return (
    <Screen>
      <WindowWidthRow style={{ zIndex: 3 }} pad={true} topPad={true}>
        <T.H1 style={{ paddingLeft: 10, paddingBottom: 15 }}>Browse</T.H1>
      </WindowWidthRow>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <WindowWidthRow blur={false}>
          <MoviesAndShowsInput
            category="Movie"
            setItem={() => console.log("set item")}
            itemChosen={false}
            setItemChosen={() => console.log("set item chosen")}
            autoFocus={false}
          />
        </WindowWidthRow>
        <SectionHeader title="Popular" />
        <WindowWidthRow style={{ paddingTop: 0 }}>
          <SpotifyCard
            title="Movies"
            color={theme.softsun}
            iconColor={theme.softsundark}
            icon="movie"
            iconType="materialcommunityicons"
          />
          <SpotifyCard
            title="Shows"
            color={theme.softorange}
            iconColor={theme.softorangedark}
            icon="local-movies"
            iconType="materialicons"
          />
        </WindowWidthRow>
        <WindowWidthRow style={{ paddingTop: 0 }}>
          <SpotifyCard
            title="Books"
            color={theme.softpurple}
            iconColor={theme.softpurplelight}
            icon="book"
            iconType="entypo"
          />
          <SpotifyCard
            title="Places"
            color={theme.softred}
            iconColor={theme.softredlight}
            icon="map"
          />
        </WindowWidthRow>

        <SectionHeader title="Nearby" />
        <WindowWidthRow style={{ justifyContent: "center" }}>
          <ContainerCard style={{ padding: 0 }}>
            <MapView
              style={{
                height: theme.windowHeight / 2,
                // width: theme.windowWidth / 2,
              }}
            />
          </ContainerCard>
        </WindowWidthRow>
      </ScrollView>
    </Screen>
  );
}
