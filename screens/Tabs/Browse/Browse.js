import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, FlatList, ViewBase } from "react-native";

import MoviesAndShowsInput from "../../../components/Inputs/MoviesAndShowsInput";
import {useNavigation} from '@react-navigation/native';
import useTheme from "../../../hooks/useTheme";

import Screen from "../../../components/Wrappers/Screen";
import SectionHeader from "../../../components/Atomic/SectionHeader";
import SelectableListCircle from "../../../components/ListItems/SelectableListCircle";
import ContainerCard from "../../../components/Wrappers/ContainerCard";
import VerticalThingList from "../../../components/Lists/VerticalThingList";
import useListService from "../../../hooks/useListService";
import useVisibleFollowingLists from "../../../hooks/useVisibleFollowingLists";
import SingleFilterButtonSpan from "../../../components/SingleFilterButtonSpan";
import { thingsService } from "../../../services/feathersClient";
import WindowWidthRow from "../../../components/Wrappers/WindowWidthRow";
import MapView from "react-native-maps";
import { ParticipantAvatar } from "../../../components/ListItems/ListListItem";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function Browse({navigation}) {
  const theme = useTheme();

  const [category, setCategory] = useState("Movie");

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


  const ListHeader = () => (
    <View>
      
      <SearchPrompt />
      <CollectionsFromFollowing />
      <ViewAFriendsLibrary />
      {/* <ViewNearby /> */}

      <ByCategoryHeader category={category} setCategory={setCategory} />
      
      </View>
  )

  return (
    <Screen fullscreen={true}>
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
      </Screen>
  )
}


function SearchPrompt() {

  return (
    <View>
  <SectionHeader title="Search" />
  <WindowWidthRow blur={false}>
    <MoviesAndShowsInput
      category="Movie"
      setItem={() => console.log("set item")}
      itemChosen={false}
      setItemChosen={() => console.log("set item chosen")}
      autoFocus={false}
    />
  </WindowWidthRow>
  </View>)
}

function CollectionsFromFollowing() {
  const navigation = useNavigation();
  const {data, fetchMore  } = useVisibleFollowingLists();
  console.log('data ?', data)

  return (
    <View>
  <SectionHeader title="Collections from Following" />
  <WindowWidthRow style={{ paddingBottom: 10, flexWrap: "wrap" }}>
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={data.filter(list => list.things.length >=1)}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      renderItem={({ item: list }) => (
        <SelectableListCircle.MyList onPress={()=>{console.log('list =', list); navigation.navigate('Collection', {listId: list._id})}} withName={true} size={80} canCreate={true} listId={list._id} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id}
    />
  </WindowWidthRow>
  </View>)
}

function ViewAFriendsLibrary() {
  const following = useSelector((state) => state.follows.following);
  return (
    <View>
      <SectionHeader title="View a Library" />
      <WindowWidthRow pad={true} >
        <FlatList 
        keyboardShouldPersistTaps="handled"
        data={following}
        renderItem={({ item: userId }) => (
          <ParticipantAvatar linkToProfile={true} style={{ padding: 3 }}
          participantId={userId}
          size={80} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        />
      </WindowWidthRow>
    </View>
  )
}

function ViewNearby() {
  return (<View>
    <SectionHeader title="Nearby" />
        <WindowWidthRow style={{ justifyContent: "center" }}>
          <ContainerCard style={{ padding: 0 }}>
            <MapView
              style={{
                height: 150,
              }}
            />
          </ContainerCard>
        </WindowWidthRow>
  </View>)
}

function ByCategoryHeader({category, setCategory}) {
  return (
<View>
    <SectionHeader title="Browse by Category" />
      <WindowWidthRow style={{ paddingBottom: 10, zIndex: 3 }} pad={false}>
        <SingleFilterButtonSpan
          options={["Movie", "Show", "Book", "Place"]}
          setFilter={setCategory}
          filter={category}
        />
      </WindowWidthRow>
    </View>
  )
}
  