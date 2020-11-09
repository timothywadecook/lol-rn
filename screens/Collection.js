import React from 'react';
import { useSelector } from 'react-redux';
import {Button} from 'react-native-elements';
import useListService from '../hooks/useListService';
import VerticalThingList from '../components/Lists/VerticalThingList';
import {thingsService} from '../services/feathersClient';
import Screen from '../components/Wrappers/Screen';
import useTheme from '../hooks/useTheme';
// params = {listId}

export default Collection = ({route, navigation}) => {
    const {listId} = route.params;
    const theme = useTheme();
    const sessionUserId = useSelector(state => state.user._id);
    // get list from store
    const list = useSelector(state=>state.lists[listId])
    const sessionUserIsParticipant = list.participants.includes(sessionUserId)
    const {things, name} = list;
    const EditButton = () => (<Button 
      onPress={()=>navigation.navigate('CreateOrEditList', {list, isEdit: true})}
      title={"Edit"}
      titleStyle={{color:theme.purple, paddingHorizontal: 15}}
      type="clear"
      />)
    navigation.setOptions({title: name, headerRight: ()=>sessionUserIsParticipant?<EditButton />:null})
    // get things 
      const { data, refresh, refreshing, fetchMore, loading, moreAvailable, total } = useListService(thingsService, {
        _id: { $in: things.length && things },
      });

    return (
        <Screen center={true} fullscreen={true}>
        <VerticalThingList
          data={data}
          refresh={refresh}
          refreshing={refreshing}
          fetchMore={fetchMore}
          loading={loading}
          moreAvailable={moreAvailable}
          total={total}
          bounces={true}
        />
        </Screen>
    )
}