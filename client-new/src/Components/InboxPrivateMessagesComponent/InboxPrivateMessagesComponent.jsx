import React, { useState, useRef } from 'react';
import * as styled from './InboxPrivateMessagesComponent.style';
// import SearchBarComponent from '../SearchBarComponent/SearchBarComponent';
import FriendsRequestsComponent from '../FriendsRequestsComponent/FriendsRequestsComponent';
import InboxPopupFooterComponent from '../InboxPopupFooterComponent/InboxPopupFooterComponent';
import PrevAllFriendRequestsComponent from '../PrevAllFriendRequestsComponent/PrevAllFriendRequestsComponent';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import AllMessagesComponent from '../AllMessagesComponent/AllMessagesComponent';
import { useSharedState } from '../../Context/PopUpContext';
import InboxChatCotnainerComponent from '../InboxChatCotnainerComponent/InboxChatCotnainerComponent';

function InboxPrivateMessagesComponent() {
   const [ActiveBar, setActiveBar] = useState({
      friendSidebar: true,
      allMessageSidebar: false,
   });
   const ScreenRef = useRef(null);

   const [ContextState] = useSharedState();

   const activeBarHandler = function (data) {
      setActiveBar(data);
   };

   return (
      <styled.div>
         <div className="flexDiv">
            <styled.sidebarDiv>
               {/* <SearchBarComponent /> */}
               <div className="Slide_div">
                  <div
                     className={
                        ActiveBar?.friendSidebar
                           ? 'firend_request_div'
                           : 'firend_request_div hide_friends_bar'
                     }
                  >
                     <FriendsRequestsComponent ScreenRef={ScreenRef} />
                  </div>
                  <div
                     className={
                        ActiveBar?.allMessageSidebar
                           ? 'allMessage_div show_allMessage_bar'
                           : 'allMessage_div'
                     }
                  >
                     <AllMessagesComponent />
                  </div>
               </div>
            </styled.sidebarDiv>
            <styled.renderDiv
               className={ContextState?.showSmChats ? 'show_screen' : ''}
               ref={ScreenRef}
            >
               {!ContextState?.showFriendsRequests &&
               !ContextState?.showPrivateChat ? (
                  <div className="inital_state_div">
                     <ModelHeaderComponent
                        hideClBtn={true}
                        cl={'normal_heading_div'}
                     />
                     <div className="center_content">
                        <p className="text-gray-400 text-sm">
                           Select a chat to start messaging
                        </p>
                     </div>
                  </div>
               ) : null}
               {!!ContextState?.showFriendsRequests ? (
                  <PrevAllFriendRequestsComponent />
               ) : null}
               {!!ContextState.showPrivateChat ? (
                  <InboxChatCotnainerComponent />
               ) : null}
            </styled.renderDiv>
         </div>
         <InboxPopupFooterComponent
            ScreenRef={ScreenRef}
            event={activeBarHandler}
         />
      </styled.div>
   );
}

export default InboxPrivateMessagesComponent;
