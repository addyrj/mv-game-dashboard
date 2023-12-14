import React, { useContext, useEffect, useState } from 'react';
import * as styled from './ChatScreenComponent.style';
import ChatMessageComponent from '../ChatMessageComponent/ChatMessageComponent';
import { SocketContext } from '../../Context/SocketIoContext';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupChats } from '../../App/Features/Group/groupActions';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { DefaultGroupId } from '../../helper/helper';
import { gobalChatMsgSeenHandler } from '../../App/Features/Client/clientSlice';
import {
   groupChatsSelector,
   groupChatsLoadingSelector,
   groupChatsFetchErrorSelector,
} from './Chat.Selector';
import { newGroupMessage } from '../../App/Features/Group/groupSlice';

function ChatScreenComponent() {
   const socket = useContext(SocketContext);
   const [QuerySearch] = useSearchParams();
   const groupId = QuerySearch.get('groupId');
   const dispatch = useDispatch();
   const [Page, setPage] = useState(0);

   const groupChats = useSelector(groupChatsSelector);
   const groupChatsLoading = useSelector(groupChatsLoadingSelector);
   const groupChatsFetchError = useSelector(groupChatsFetchErrorSelector);

   const groupMessageReceivedHandler = function (args) {
      dispatch(newGroupMessage(args?.data));
      dispatch(gobalChatMsgSeenHandler({ data: args?.data?.message }));
   };

   const loadPrevMessage = function () {
      setPage((prevState) => prevState + 1);
   };

   useEffect(() => {
      if (!!groupId) {
         socket.emit('_join_group_room', { groupId });
         dispatch(getGroupChats({ groupId, page: Page }));
      } else {
         socket.emit('_join_group_room', { groupId: DefaultGroupId });
         dispatch(getGroupChats({ groupId: DefaultGroupId, page: Page }));
      }

      socket.on('_group_message_received', groupMessageReceivedHandler);

      return () => {
         socket.off('_group_message_received', groupMessageReceivedHandler);
      };
   }, []);

   useEffect(() => {
      if (Page) {
         dispatch(
            getGroupChats({ groupId: groupId || DefaultGroupId, page: Page })
         );
      }
   }, [Page]);

   return (
      <styled.div className="px-3 py-2">
         {!!groupChats &&
         groupChats?.success &&
         groupChats?.chats &&
         groupChats?.chats?.length &&
         groupChats?.chats[0]._id &&
         Page < groupChats?.chats[0]._id?.totalPages ? (
            <styled.loadPrev className=" bg-teal-600" onClick={loadPrevMessage}>
               <p>Load more</p>
            </styled.loadPrev>
         ) : null}
         {groupChatsLoading ? (
            <div className="loading">
               <SpennerComponent center={true} />
            </div>
         ) : null}
         {groupChatsFetchError ? (
            <p className="show_chat_div text-sm error_cl">
               {groupChatsFetchError}
            </p>
         ) : null}
         {groupChats &&
         groupChats?.success &&
         groupChats?.chats.length &&
         groupChats?.chats[0] &&
         groupChats?.chats[0]?.groupMessages?.length
            ? groupChats?.chats[0]?.groupMessages.map((el) => (
                 <ChatMessageComponent key={el?._id} data={el} />
              ))
            : null}
      </styled.div>
   );
}

export default React.memo(ChatScreenComponent);
