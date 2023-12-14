import React from 'react';
import * as styled from './FriendsListComponent.style';
import { userFriendsListSelector, userFriendsFetchLoadingSelector, userFriendsFetchErrorSelector } from './FriendsList.Selector';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import UserProfileSmComponent from '../UserProfileSmComponent/UserProfileSmComponent';

function FriendsListComponent() {
   const userFriendsList = useSelector(userFriendsListSelector);
   const userFriendsFetchLoading = useSelector(userFriendsFetchLoadingSelector);
   const userFriendsFetchError = useSelector(userFriendsFetchErrorSelector);

   return (
      <styled.div>
         {!!userFriendsFetchLoading && <SpinnerComponent />}
         {!!userFriendsFetchError && <p className="text-sm error_cl">{userFriendsFetchError}</p>}
         <div className="screen">
            {!!userFriendsList &&
            userFriendsList?.success &&
            userFriendsList?.response &&
            userFriendsList?.response?.[0] &&
            userFriendsList.response?.[0]?.friends &&
            userFriendsList.response?.[0]?.friends.length ? (
               userFriendsList.response?.[0]?.friends.map((el) => <UserProfileSmComponent data={el} key={el?._id} />)
            ) : !userFriendsFetchError ? (
               <NoDataComponent center={true} bg={'none'} />
            ) : null}
         </div>
      </styled.div>
   );
}

export default FriendsListComponent;
