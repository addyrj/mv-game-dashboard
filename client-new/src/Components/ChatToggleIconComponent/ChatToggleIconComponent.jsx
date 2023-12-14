import React from 'react';
import { BsFillChatDotsFill } from '@react-icons/all-files/bs/BsFillChatDotsFill';
import {
   globalChatMessagesSeenSelector,
   showSidebarChatSelector,
} from './Chat.Selector';
import {
   removeSeenGlobalMsg,
   showSidebarHandler,
} from '../../App/Features/Client/clientSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@mui/material';

function ChatToggleIconComponent() {
   const dispatch = useDispatch();

   const globalChatMessagesSeen = useSelector(globalChatMessagesSeenSelector);
   const showSidebarChat = useSelector(showSidebarChatSelector);

   const SidebarHandler = function () {
      dispatch(showSidebarHandler({ data: !showSidebarChat }));
      if (!showSidebarChat) {
         dispatch(removeSeenGlobalMsg());
      }
   };

   return (
      <div className="User_setting_icon_div mobile_sm_options_hide">
         <Badge badgeContent={globalChatMessagesSeen?.length} color="success">
            <div className="box_div" onClick={SidebarHandler}>
               <BsFillChatDotsFill className="text-gray-500 hover_icon" />
            </div>
         </Badge>
      </div>
   );
}

export default ChatToggleIconComponent;
