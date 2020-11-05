import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, FlatList, ScrollView } from "react-native";
import { Icon, ListItem, Button } from "react-native-elements";
import SingleFilterButtonSpan from "../../../components/SingleFilterButtonSpan";
import { thingsService } from "../../../services/feathersClient";
import WindowWidthRow from "../../../components/Wrappers/WindowWidthRow";
import * as T from "../../../components/Atomic/StyledText";

import useTheme from "../../../hooks/useTheme";

import Screen from "../../../components/Wrappers/Screen";

import VerticalThingList from "../../../components/Lists/VerticalThingList";
import useListService from "../../../hooks/useListService";
import useVisibleLists from "../../../hooks/useVisibleLists";
import SpotifyCard from "../../../components/Atomic/SpotifyCard";
import ContainerCard from "../../../components/Wrappers/ContainerCard";
import HorizontalRecommendedList from "../../../components/Lists/HorizontalRecommendedList";
import ListButton, {
  AddListButton,
} from "../../../components/Buttons/ListButton";
import SelectableListCircle from "../../../components/ListItems/SelectableListCircle";
import SectionHeader from "../../../components/Atomic/SectionHeader";
import {
  ParticipantsRow,
  ParticipantsIcon,
} from "../../../components/ListItems/ListListItem";
import FilterMenu from "../../../components/FilterMenu";
import ListList from "../../../components/Lists/ListList";

import { HomeHeader } from "../Home/Home";

import { ParticipantAvatar } from "../../../components/ListItems/ListListItem";

export default function Library({ navigation, route }) {
  const theme = useTheme();
  const sessionUserId = useSelector((state) => state.user._id);

  const [category, setCategory] = useState("Movie");

  const [privateListIds, publicListIds] = useVisibleLists(sessionUserId);

  const {
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  } = useListService(
    thingsService,
    {
      category,
    },
    [category],
    true
  );

  return (
    <Screen fullscreen={true}>
      {/* <LibraryHeader /> */}
      {/* <HomeHeader /> */}
      {/* <T.H4 style={{ paddingVertical: 10, paddingLeft: 10 }}>Following</T.H4> */}
      <RenderOldVersion
        data={data}
        refresh={refresh}
        refreshing={refreshing}
        fetchMore={fetchMore}
        loading={loading}
        category={category}
        setCategory={setCategory}
        privateListIds={privateListIds}
        publicListIds={publicListIds}
      />
      {/* <RenderLists
        category={category}
        setCategory={setCategory}
        privateListIds={privateListIds}
        publicListIds={publicListIds}
      /> */}
    </Screen>
  );
}


function RenderOldVersion({
  data,
  refresh,
  refreshing,
  fetchMore,
  loading,
  privateListIds = [],
  publicListIds = [],
  category,
  setCategory,
}) {
  const theme = useTheme();

  const following = useSelector((state) => state.follows.following);

  const ListHeader = () => (
    <View>
    <T.H4 style={{ paddingTop: 10, alignSelf: "center" }}>Following</T.H4>
      <WindowWidthRow pad={true} style={{ flexWrap: "wrap" }}>
        {following.map((userId) => (
          <ParticipantAvatar
            style={{ padding: 3 }}
            participantId={userId}
            size={40}
          />
        ))}
      </WindowWidthRow>

      <T.H4 style={{ paddingVertical: 10, alignSelf: "center" }}>
        Their Lists
      </T.H4>
      <WindowWidthRow style={{ paddingBottom: 10, flexWrap: "wrap" }}>
        <FlatList
          ListHeaderComponent={<SelectableListCircle.AddNew />}
          keyboardShouldPersistTaps="handled"
          data={[...privateListIds, ...publicListIds]}
          renderItem={({ item: listId }) => (
            <SelectableListCircle.MyList canCreate={true} listId={listId} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
        />
      </WindowWidthRow>

      <T.H4 style={{ paddingVertical: 10, alignSelf: "center" }}>Recent</T.H4>

      <WindowWidthRow style={{ paddingBottom: 10, zIndex: 3 }} pad={false}>
        <SingleFilterButtonSpan
          options={["Movie", "Show", "Book", "Place"]}
          setFilter={setCategory}
          filter={category}
        />
      </WindowWidthRow>
      </View>
  )

  return (
    <View
      style={{
        backgroundColor: theme.wallbg,
        flex: 1,
        alignItems: "center",
      }}
    >
      
      <VerticalThingList
      renderHeader={<ListHeader />}
        numColumns={3}
        data={data}
        refresh={refresh}
        refreshing={refreshing}
        fetchMore={fetchMore}
        loading={loading}
        bounces={true}
      />
    </View>
  );
}
