import React from 'react';
import {FlatList} from 'react-native';
import Screen from '../components/Wrappers/Screen';
import UserListItem from '../components/ListItems/UserListItem';
import FollowUnfollowButton from '../components/Buttons/FollowUnfollowButton';
import useFollowers from '../hooks/useFollowers';
import useTheme from '../hooks/useTheme';

// param = userId

export default FollowersListScreen = ({navigation, route}) => {
    const theme = useTheme();
    // get userId from params
    const {userId} = route.params;

    // use following to get paginated list of following
    const {data,
        refresh,
        refreshing,
        fetchMore,
        loading,
        moreAvailable} = useFollowers(userId)

    const renderItem=({ item: u }) => 
        <UserListItem key={u._id} user={u}>
           <FollowUnfollowButton userId={u._id} />
        </UserListItem>
      

    // Flatlist 
    return (
        <Screen fullscreen={true}>
        <FlatList 
        data={data.map(follow => follow.follower)}
        renderItem={renderItem}
        keyExtractor={(item)=>item._id}
        refreshing={refreshing}
        onEndReached={fetchMore}
        onRefresh={refresh}
        initialNumToRender={10}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{width:theme.windowWidth}}
        />
        </Screen>
    )

}
