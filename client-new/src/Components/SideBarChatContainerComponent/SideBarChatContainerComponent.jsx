import React from 'react';
import * as styled from './SideBarChatContainerComponent.style';
import { useSelector } from 'react-redux';
import SideBarChatNavComponent from '../SideBarChatNavComponent/SideBarChatNavComponent';
import SendChatMessagesComponent from '../SendChatMessagesComponent/SendChatMessagesComponent';
import ChatScreenComponent from '../ChatScreenComponent/ChatScreenComponent';
import UserProfileModelComponent from '../UserProfileModelComponent/UserProfileModelComponent';
import { useSharedState } from '../../Context/PopUpContext';
import { AnimatePresence } from 'framer-motion';
import { showSidebarChatSelector } from './Sidebar.Selector';

function SideBarChatContainerComponent({ show }) {
   const [PopUpContextState, setPopUpContextState] = useSharedState();
   const showSidebarChat = useSelector(showSidebarChatSelector);

   const profileModelHandler = function () {
      setPopUpContextState({
         ...PopUpContextState,
         showOtherUserProfilePopUp: false,
      });
   };

   return (
      <div
         show={showSidebarChat.toString()}
         className={show ? 'shadow showChatBar' : 'shadow'}
         id="chat_sidebar_div"
      >
         <AnimatePresence>
            {PopUpContextState?.showOtherUserProfilePopUp?.show ? (
               <UserProfileModelComponent
                  Close={profileModelHandler}
                  selectedUserId={
                     PopUpContextState?.showOtherUserProfilePopUp?.selectedUser
                  }
                  profileModel={false}
               />
            ) : null}
         </AnimatePresence>
         <styled.ChatOptionsDiv
            className={showSidebarChat ? 'ShowChats' : null}
         >
            <SideBarChatNavComponent />
            <ChatScreenComponent event={profileModelHandler} />
            <SendChatMessagesComponent privateCm={false} />
         </styled.ChatOptionsDiv>
      </div>
   );
}

export default React.memo(SideBarChatContainerComponent);
