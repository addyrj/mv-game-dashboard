import React, { useEffect } from 'react';
import * as styled from './ChatListSlideComponent.style';
import { useSelector } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import UserProfileSmComponent from '../UserProfileSmComponent/UserProfileSmComponent';
import { getFriendList } from '../../App/Features/Client/clientActions.js';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
   friendsSelector,
   FriendListLoadingSelector,
   FriendListFetchErrorSelector,
} from './ChatList.Selector';

function ChatListSlideComponent() {
   const friends = useSelector(friendsSelector);
   const getFriendListLoading = useSelector(FriendListLoadingSelector);
   const getFriendListFetchError = useSelector(FriendListFetchErrorSelector);

   const [cookie] = useCookies();
   const dispatch = useDispatch();

   useEffect(() => {
      if (cookie && cookie?._mv_games_auth && cookie?._mv_games_auth?._id) {
         dispatch(getFriendList({ userId: cookie?._mv_games_auth?._id }));
      }
   }, []);

   return (
      <styled.div>
         {!!getFriendListFetchError ? (
            <p className="error_cl">{getFriendListFetchError}</p>
         ) : null}
         {!!getFriendListLoading ? (
            <div className="p-3 w-100 h-100 flex items-center justify-center">
               <SpennerComponent center={true} />
            </div>
         ) : null}
         {!!friends &&
         friends?.success &&
         !!friends?.response &&
         friends?.response.length &&
         friends?.response[0].friends.length
            ? friends.response[0].friends.map((el) => (
                 <UserProfileSmComponent key={el._id} data={el} />
              ))
            : null}
      </styled.div>
   );
}

export default ChatListSlideComponent;
