import React, { useEffect } from 'react';
import * as styled from './LiveChatPage.style';
// import LiveChatHeadComponent from '../../Components/LiveChatHeadComponent/LiveChatHeadComponent';
import UserListComponent from '../../Components/UserListComponent/UserListComponent';
import LiveChatScreenComponent from '../../Components/LiveChatScreenComponent/LiveChatScreenComponent';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQueryUserLists } from '../../App/Features/LiveSupport/liveSupportActions';
import { authSelector } from './LiveChat.Selector';

function LiveChatPage() {
   const {
      userRoles: { isAdmin, isSupport },
   } = useRoles();

   const dispatch = useDispatch();
   const auth = useSelector(authSelector);

   useEffect(() => {
      if (isAdmin || isSupport) {
         if (!!auth && auth?.user && auth?.user?._id) {
            dispatch(getAllQueryUserLists({ supportTeamUserId: auth?.user?._id }));
         }
      }
   }, [isAdmin, isSupport]);

   return (
      <styled.div>
         {/* <LiveChatHeadComponent /> */}
         <div className="content_div">
            <div className="list_div">
               <UserListComponent />
            </div>
            <LiveChatScreenComponent />
         </div>
      </styled.div>
   );
}

export default LiveChatPage;
