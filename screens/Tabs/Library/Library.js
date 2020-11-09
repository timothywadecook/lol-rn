import React from "react";
import { useSelector } from "react-redux";
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from "react-native";
import { ListItem, Button } from "react-native-elements";
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
      <LibraryContent isSessionUserLibrary={true} user={sessionUser}/>
    </Screen>
  );
}

// Also used for profiles with user prop
export function LibraryContent({ user, isSessionUserLibrary=false}) {
  const theme = useTheme();
  const navigation = useNavigation()
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
        {isSessionUserLibrary && <Button
          onPress={()=>navigation.navigate('CreateOrEditList')}
          title="New Collection"
          type="clear"
          titleStyle={{ color: theme.purple }}
        />}
      </SectionHeader>
      {myListIds.map((id, i) => (
        <ListItem
          onPress={()=>navigation.navigate('Collection', {listId: id})}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: theme.iconDefault,
          }}
          key={id}
        >
          <SelectableListCircle.MyList listId={id} canCreate={isSessionUserLibrary} />
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
        onPress={()=>navigation.navigate('Collection', {listId: id})}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: theme.iconDefault,
          }}
          key={id}
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
