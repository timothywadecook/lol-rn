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
import Avatar from "../../../components/Atomic/Avatar";
import ListList from "../../../components/Lists/ListList";

import { HomeHeader } from "../Home/Home";

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
      <LibraryHeader />
      {/* <T.H4 style={{ paddingVertical: 10, paddingLeft: 10 }}>My Library</T.H4> */}
      {/* <T.H1 style={{ paddingVertical: 10, paddingLeft: 10 }}>My Library</T.H1> */}
      <RenderLists
        privateListIds={privateListIds}
        publicListIds={publicListIds}
      />
    </Screen>
  );
}

function LibraryHeader() {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  return (
    <WindowWidthRow
      //   topPad={true}
      style={{ justifyContent: "center", alignItems: "center" }}
      pad={true}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <Avatar user={user} size={80} />
        <T.H2 style={{ padding: 10 }}>{user.name}</T.H2>
      </View>
      {/* <Icon
        containerStyle={{ paddingHorizontal: 10 }}
        name="plus"
        type="feather"
        size={30}
        color={theme.purple}
      /> */}

      {/* <Button
        // icon={<Icon name="edit" color={theme.purple} type="feather" />}
        title=""
        titleStyle={{ color: theme.purple, paddingLeft: 5 }}
        type="clear"
      /> */}
      {/* <Button
        icon={<Icon name="plus" color={theme.purple} type="feather" />}
        title="ADD ITEM"
        titleStyle={{ color: theme.purple, paddingLeft: 5 }}
        type="clear"
      /> */}
    </WindowWidthRow>
  );
}

const categoryLists = [
  {
    title: "All",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Movies",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Shows",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Books",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Restaurants",
    onPress: () => console.log("clicked"),
  },
  {
    title: "Places",
    onPress: () => console.log("clicked"),
  },
];

function CategoryIcon({ c, color, reverse = false, size = 24 }) {
  const theme = useTheme();
  const iconColor = color ? color : theme.purpledark;
  const props = {
    All: {
      name: "list",
    },
    Movies: {
      name: "movie",
      type: "materialcommunityicons",
    },
    Shows: {
      name: "local-movies",
      type: "materialicons",
    },
    Books: {
      name: "book",
      type: "entypo",
    },
    Restaurants: {
      name: "restaurant",
      type: "materialicons",
    },
    Places: {
      name: "map-pin",
      type: "feather",
    },
  };

  return <Icon {...props[c]} color={iconColor} reverse={reverse} size={size} />;
}

function RenderLists({ privateListIds = [], publicListIds = [] }) {
  const theme = useTheme();
  const lists = useSelector((state) => state.lists);
  const sessionUserId = useSelector((state) => state.user._id);

  const listIds = [...privateListIds, ...publicListIds];

  const isSharedList = (list) => list.participants.length > 1;

  const sharedListIds = listIds.filter((listId) => isSharedList(lists[listId]));
  const myListIds = listIds.filter((listId) => !isSharedList(lists[listId]));

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* {categoryLists.map((list, i) => (
        <ListItem
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: theme.iconDefault,
          }}
          key={list.title + i}
          bottomDivider={i !== listIds.length - 1}
        >
          <CategoryIcon c={list.title} />
          <ListItem.Content>
            <ListItem.Title style={{ color: theme.primary }}>
              {list.title}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))} */}

      {/* <SectionHeader title="Recent" /> */}

      <HorizontalRecommendedList userId={sessionUserId} />
      {/* <HorizontalRecommendedList title="All Saves" userId={sessionUserId} /> */}

      <SectionHeader title="Collections">
        <Button
          //   icon={<Icon name="plus" color={theme.purple} type="feather" />}
          //   color={theme.purple}
          title="New Collection"
          type="clear"
          titleStyle={{ color: theme.purple }}
        />
      </SectionHeader>

      {/* <ListList userId={sessionUserId} vertical={true} /> */}

      {myListIds.map((id, i) => (
        <ListItem
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: theme.iconDefault,
          }}
          key={id}
          bottomDivider={i !== myListIds.length - 1}
        >
          <SelectableListCircle.MyList listId={id} canCreate={true} />
          <ListItem.Content>
            <ListItem.Title style={{ color: theme.primary }}>
              {lists[id].name}
            </ListItem.Title>
          </ListItem.Content>
          <T.H2G>{lists[id].things.length}</T.H2G>
          <ListItem.Chevron />
        </ListItem>
      ))}

      <SectionHeader title="Shared Collections"></SectionHeader>
      {sharedListIds.map((id, i) => (
        <ListItem
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: theme.iconDefault,
          }}
          key={id}
          bottomDivider={i !== sharedListIds.length - 1}
        >
          <ParticipantsIcon participants={lists[id].participants} />
          <ListItem.Content>
            <ListItem.Title style={{ color: theme.primary }}>
              {lists[id].name}
            </ListItem.Title>
          </ListItem.Content>

          <T.H2G>{lists[id].things.length}</T.H2G>
          <ListItem.Chevron />
        </ListItem>
      ))}

      {/* <WindowWidthRow>
        <SpotifyCard
          title="Build lists together"
          subtitle="Learn more"
          icon="users"
          iconColor={theme.purpledark}
          color={theme.purple}
        />
      </WindowWidthRow> */}
    </ScrollView>
  );
}

function RenderOldVersion() {
  return (
    <View
      style={{
        backgroundColor: theme.wallbg,
        flex: 1,
        alignItems: "center",
      }}
    >
      <WindowWidthRow style={{ zIndex: 3 }} pad={true} topPad={true}>
        <T.H1 style={{ paddingLeft: 10, paddingBottom: 15 }}>My Library</T.H1>
      </WindowWidthRow>

      <WindowWidthRow style={{ paddingBottom: 10, zIndex: 3 }} pad={false}>
        <SingleFilterButtonSpan
          options={["Movie", "Show", "Book", "Place"]}
          setFilter={setCategory}
          filter={category}
        />
      </WindowWidthRow>

      <WindowWidthRow style={{ paddingBottom: 10, flexWrap: "wrap" }}>
        {/* <FlatList
            ListHeaderComponent={<SelectableListCircleAddNew />}
            keyboardShouldPersistTaps="handled"
            data={[...privateListIds, ...publicListIds]}
            renderItem={({ item: listId }) => (
              <SelectableListCircle canCreate={true} listId={listId} />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
          /> */}

        <AddListButton />
        {privateListIds.map((listId) => (
          <ListButton key={listId} listId={listId} canCreate={true} />
        ))}
        {publicListIds.map((listId) => (
          <ListButton key={listId} listId={listId} canCreate={true} />
        ))}
      </WindowWidthRow>

      <VerticalThingList
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
