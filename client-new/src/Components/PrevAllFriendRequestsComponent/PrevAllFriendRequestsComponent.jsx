import React, { useEffect } from 'react';
import * as styled from './PrevAllFriendRequestsComponent.style';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getFriendRequestList } from '../../App/Features/Client/clientActions';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import FriendRequestListComponent from '../FriendRequestListComponent/FriendRequestListComponent';
import {
   friendRequestListSelector,
   friendRequestListLoadingSelector,
   friendRequestListFetchErrorSelector,
} from './PrevAll.Selector';

function PrevAllFriendRequestsComponent() {
   const dispatch = useDispatch();
   const [cookie] = useCookies();

   const friendRequestList = useSelector(friendRequestListSelector);
   const friendRequestListLoading = useSelector(
      friendRequestListLoadingSelector
   );
   const friendRequestListFetchError = useSelector(
      friendRequestListFetchErrorSelector
   );

   useEffect(() => {
      if (cookie && cookie?._mv_games_auth && cookie?._mv_games_auth?._id) {
         dispatch(
            getFriendRequestList({ userId: cookie?._mv_games_auth?._id })
         );
      }
   }, []);

   return (
      <styled.div>
         <ModelHeaderComponent
            heading={'Friend Request'}
            backIcon={false}
            hideClBtn={true}
            cl={'_prev_heading_div'}
         />
         {!!friendRequestListLoading ? <SpennerComponent /> : null}
         {!!friendRequestListFetchError ? (
            <p className="error_cl">{friendRequestListFetchError}</p>
         ) : null}
         {!!friendRequestList &&
         friendRequestList?.success &&
         friendRequestList?.response &&
         friendRequestList?.response.length ? (
            <div>
               {friendRequestList?.response[0].friendRequests.map((el) => (
                  <FriendRequestListComponent key={el._id} data={el} />
               ))}
            </div>
         ) : (
            <div className="content_div">
               <NoDataComponent bg={'none'} />
            </div>
         )}
      </styled.div>
   );
}

export default PrevAllFriendRequestsComponent;
