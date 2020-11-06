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

import useVisibleLists from "../../../hooks/useVisibleLists";
import HorizontalRecommendedList from "../../../components/Lists/HorizontalRecommendedList";
import SelectableListCircle from "../../../components/ListItems/SelectableListCircle";
import SectionHeader from "../../../components/Atomic/SectionHeader";
import {
  ParticipantsIcon,
} from "../../../components/ListItems/ListListItem";


export default function Library({ navigation, route }) {
  const sessionUser = useSelector(state=>state.user)
  return (
    <Screen fullscreen={true}>
      <LibraryContent user={sessionUser}/>
    </Screen>
  );
}

// Also used for profiles with user prop
export function LibraryContent({ user }) {
  const theme = useTheme();
  const [privateListIds, publicListIds] = useVisibleLists(user._id);
  const lists = useSelector((state) => state.lists);
  const listIds = [...privateListIds, ...publicListIds];
  const isSharedList = (list) => list.participants.length > 1;
  const sharedListIds = listIds.filter((listId) => isSharedList(lists[listId]));
  const myListIds = listIds.filter((listId) => !isSharedList(lists[listId]));

  return (

<ScrollView
      contentContainerStyle={{ paddingBottom: 20, width: theme.windowWidth }}
      showsVerticalScrollIndicator={false}
    >
    <HorizontalRecommendedList userId={user._id} />
      <SectionHeader title="Collections">
        <Button
          title="New Collection"
          type="clear"
          titleStyle={{ color: theme.purple }}
        />
      </SectionHeader>
      {myListIds.map((id, i) => (
        <ListItem
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: theme.iconDefault,
          }}
          key={id}
          // bottomDivider={i !== myListIds.length - 1}
          // bottomDivider={true}
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

      {sharedListIds.map((id, i) => (
        <ListItem
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: theme.iconDefault,
          }}
          key={id}
          // bottomDivider={i !== sharedListIds.length - 1}
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
      </ScrollView>
  );
}
