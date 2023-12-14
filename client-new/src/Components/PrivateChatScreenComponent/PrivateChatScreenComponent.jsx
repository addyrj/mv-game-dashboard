import React, { useEffect, useContext, useState } from 'react';
import * as styled from './PrivateChatScreenComponent.style';
import SingleChatMessageComponent from '../SingleChatMessageComponent/SingleChatMessageComponent';
import { SocketContext } from '../../Context/SocketIoContext';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getPrivateMessages } from '../../App/Features/Client/clientActions';
import { useSearchParams } from 'react-router-dom';
import { removePrivetChatMsgHandler } from '../../App/Features/Client/clientSlice';
import {
   privateChatSelector,
   privateChatFetchErrorSelector,
} from './PrivatChat.Selector';

function PrivateChatScreenComponent() {
   const [ChatMsg, setChatMsg] = useState([]);
   const socket = useContext(SocketContext);
   const [Page, setPage] = useState(0);
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const [params] = useSearchParams();
   const selectedUserId = params.get('chat');

   const privateChat = useSelector(privateChatSelector);
   const privateChatFetchError = useSelector(privateChatFetchErrorSelector);

   const senderReciveMsgHander = function (args) {
      setChatMsg((prvState) => [...prvState, args]);
   };

   const receiverMsgHandler = function (args) {
      if (selectedUserId === args?.sender) {
         setChatMsg((prvState) => [...prvState, args]);
      }
   };

   const pageHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   useEffect(() => {
      socket.on('_receive_sender_private_message', senderReciveMsgHander);
      socket.on('_receive_private_message', receiverMsgHandler);

      if (cookie && cookie?._mv_games_auth) {
         socket.emit('_online_user', { userId: cookie?._mv_games_auth?._id });
      }

      return () => {
         socket.off('_receive_sender_private_message', senderReciveMsgHander);
         socket.off('_receive_private_message', receiverMsgHandler);
         dispatch(removePrivetChatMsgHandler());
      };
   }, []);

   useEffect(() => {
      if (selectedUserId) {
         if (cookie && cookie?._mv_games_auth) {
            setChatMsg([]);
            dispatch(
               getPrivateMessages({
                  userId: cookie?._mv_games_auth?._id,
                  selectedUserId,
                  page: Page,
               })
            );
         }
      }
   }, [selectedUserId]);

   useEffect(() => {
      if (Page && selectedUserId) {
         if (cookie && cookie?._mv_games_auth) {
            dispatch(
               getPrivateMessages({
                  userId: cookie?._mv_games_auth?._id,
                  selectedUserId,
                  page: Page,
               })
            );
         }
      }
   }, [Page]);

   useEffect(() => {
      if (!!privateChat && privateChat?.success && privateChat?.chats.length) {
         setChatMsg((prevState) => [
            ...privateChat?.chats[0]?.Messages,
            ...prevState,
         ]);
      }
   }, [privateChat]);

   return (
      <styled.div>
         {!!privateChatFetchError ? (
            <p className="error_cl text-sm">{privateChat}</p>
         ) : null}
         {!!privateChat &&
         privateChat?.success &&
         privateChat?.chats[0]?._id &&
         !!privateChat?.chats[0]?._id?.totalPages &&
         privateChat?.chats[0]?._id?.totalPages > Page ? (
            <div className="load_more_div flex items-center justify-center">
               <div className="load" onClick={pageHandler}>
                  <p>Load more</p>
               </div>
            </div>
         ) : null}
         {ChatMsg.map((el) => (
            <SingleChatMessageComponent
               pos={
                  el?.sender === cookie?._mv_games_auth?._id ? 'right' : 'left'
               }
               data={el}
               key={el?._id}
            />
         ))}
      </styled.div>
   );
}

export default PrivateChatScreenComponent;
