import React from 'react';
import * as styled from './FriendsRequestsComponent.style';
import { VscBellDot } from '@react-icons/all-files/vsc/VscBellDot';
import { useSharedState } from '../../Context/PopUpContext';

function FriendsRequestsComponent({ ScreenRef }) {
   const [ContextState, setContextState] = useSharedState();

   const showPrevFriendsRequestHandler = function () {
      setContextState({
         ...ContextState,
         showFriendsRequests: true,
         showPrivateChat: false,
      });
      ScreenRef.current.classList.add('show_screen');
   };

   return (
      <styled.div>
         <styled.listDiv onClick={showPrevFriendsRequestHandler}>
            <div className="icon_div">
               <VscBellDot />
            </div>
            <div>
               <h5 className="text-gray-200 text-sm">Friend Request</h5>
               <p className="text-gray-500 text-sm">Friend Request Recived</p>
            </div>
         </styled.listDiv>
      </styled.div>
   );
}

export default FriendsRequestsComponent;
