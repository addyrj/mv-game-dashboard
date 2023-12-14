import React from 'react';
import * as styled from './GlobalChatComponent.style';
import GlobalChatNavComponent from '../GlobalChatNavComponent/GlobalChatNavComponent';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import ChatScreenComponent from '../ChatScreenComponent/ChatScreenComponent';
import { groupChatsSelector, groupChatsErrorSelector, groupChatsLoadingSelector } from './GlobalChat.Selector';
import { useSelector } from 'react-redux';

function GlobalChatComponent() {
   const groupChats = useSelector(groupChatsSelector);
   const groupChatsError = useSelector(groupChatsErrorSelector);
   const groupChatsLoading = useSelector(groupChatsLoadingSelector);

   return (
      <styled.div>
         <GlobalChatNavComponent />
         {!!groupChatsError && <p className="error_cl text-sm">{groupChatsError}</p>}
         {!!groupChats && groupChats?.success && groupChats?.chats ? (
            <ChatScreenComponent
               chats={groupChats?.chats?.groupMessages}
               page={groupChats?.page}
               groupInfo={groupChats?.chats?._id}
               totalPages={groupChats?.totalPages}
            />
         ) : !groupChatsLoading ? (
            <NoDataComponent center={true} bg={'none'} />
         ) : null}
      </styled.div>
   );
}

export default GlobalChatComponent;
