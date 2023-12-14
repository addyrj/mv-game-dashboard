import React, { useEffect, useContext } from 'react';
import * as styled from './LiveChatScreenComponent.style';
import ChatHomeScreenComponent from '../ChatHomeScreenComponent/ChatHomeScreenComponent';
import { useSearchParams } from 'react-router-dom';
import MessageComponent from '../MessageComponent/MessageComponent';
import SendMessageComponent from '../SendMessageComponent/SendMessageComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getQueryUserChats } from '../../App/Features/LiveSupport/liveSupportActions';
import {
   queryUsersChatsSelector,
   queryUsersChatsLoadingSelector,
   queryUsersChatsErrorSelector,
   authSelector,
} from './LiveChat.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import { SocketContext } from '../../Context/SocketContext';
import useRoles from '../../Hooks/useRoles';
import { storeSupportMessages } from '../../App/Features/LiveSupport/liveSupportSlice';

function LiveChatScreenComponent() {
   const dispatch = useDispatch();
   let [searchParams] = useSearchParams();
   const socket = useContext(SocketContext);
   const param = searchParams.get('chat');
   const {
      userRoles: { isSupport },
   } = useRoles();

   const auth = useSelector(authSelector);
   const queryUsersChats = useSelector(queryUsersChatsSelector);
   const queryUsersChatsLoading = useSelector(queryUsersChatsLoadingSelector);
   const queryUsersChatsError = useSelector(queryUsersChatsErrorSelector);

   useEffect(() => {
      if (!!param) {
         dispatch(getQueryUserChats({ userId: param, page: 0, chatFrom: 'supportTeamUser' }));
      }
   }, [param]);

   useEffect(() => {
      if (
         !!param &&
         !!auth &&
         auth?.user &&
         auth?.user?._id &&
         !!queryUsersChats &&
         queryUsersChats?.success &&
         queryUsersChats?.chats &&
         !!queryUsersChats?.chats?.item
      ) {
         const { _id } = queryUsersChats?.chats?.item;
         socket.emit('_join_support_room', { groupId: _id });
      }
   }, [param, queryUsersChats]);

   const supportMessagesHandler = function (args) {
      dispatch(storeSupportMessages(args));
   };

   useEffect(() => {
      if (isSupport) {
         socket.on('_receive_live_support_messsage', supportMessagesHandler);
         socket.on('_support_message_received', supportMessagesHandler);
      }

      return () => {
         socket.off('_receive_live_support_messsage', supportMessagesHandler);
         socket.off('_support_message_received', supportMessagesHandler);
      };
   }, [isSupport]);

   return (
      <styled.div>
         {!param && <ChatHomeScreenComponent />}
         {!!param && (
            <styled.contentDiv>
               <div className="screen_div">
                  {!!queryUsersChatsLoading && <SpinnerComponent />}
                  {!!queryUsersChatsError && <p className="text-sm error_cl">{queryUsersChatsError}</p>}
                  {!!queryUsersChats &&
                     queryUsersChats?.success &&
                     !!queryUsersChats?.chats &&
                     !!queryUsersChats?.chats?.messages &&
                     queryUsersChats?.chats?.messages.length &&
                     queryUsersChats?.chats?.messages.length &&
                     queryUsersChats?.chats?.messages.map((el) => (
                        <MessageComponent
                           createdAt={el?.createdAt}
                           message={el?.message}
                           key={el?._id}
                           sender={auth?.user?._id === el?.sender}
                        />
                     ))}
               </div>
               <SendMessageComponent />
            </styled.contentDiv>
         )}
      </styled.div>
   );
}

export default LiveChatScreenComponent;
