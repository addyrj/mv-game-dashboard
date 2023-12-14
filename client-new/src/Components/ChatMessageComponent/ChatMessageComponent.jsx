import React, { useEffect, useRef } from 'react';
import * as styled from './ChatMessageComponent.style';
import dayjs from 'dayjs';
import { useSharedState } from '../../Context/PopUpContext';
import { useCookies } from 'react-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ChatMessageComponent({ data }) {
   const [cookie] = useCookies();
   const MessageEndRef = useRef(null);
   const [PopUpContextState, setPopUpContextState] = useSharedState();

   const scrollToBottom = () => {
      MessageEndRef.current?.scrollIntoView();
   };

   const popupContextHandler = function () {
      if (!data?.hideUser || cookie?._mv_games_auth?._id === data.userId) {
         setPopUpContextState({
            ...PopUpContextState,
            showOtherUserProfilePopUp: {
               selectedUser: data?.userId,
               show: true,
            },
         });
      }
   };

   useEffect(() => {
      scrollToBottom();
   }, [data]);

   return (
      <styled.div className="mt-4" ref={MessageEndRef}>
         <styled.userMessageDiv className="flex">
            <div className="profile_info">
               <div
                  className={
                     !data?.hideUser ||
                     cookie?._mv_games_auth?._id === data.userId
                        ? 'profile hover:scale-105 cursor-pointer'
                        : 'profile hover:scale-105'
                  }
                  onClick={popupContextHandler}
               >
                  <img src={data?.avatar} alt="" crossOrigin="anonymous" />
               </div>
               {/* <div className="version bg-yellow-500 rounded">
                  <p>V55</p>
               </div> */}
            </div>
            <div className="ms-2">
               <h5 className="text-gray-300 font-bold">
                  {!!data?.hideUserName ? null : data?.name}{' '}
                  <span className="messageTime text-gray-500 font-medium text-sm">
                     {dayjs(data?.createdAt).format('hh:m A')}
                  </span>
               </h5>
               <div
                  className={
                     data?.onlyEmogi
                        ? 'message_div msg_div mt-2 '
                        : 'message_div mt-2 '
                  }
               >
                  <p className="text-gray-200 text-sm font-medium">
                     {data?.message}
                  </p>
                  {data?.gifphy && data?.gifphy?.gifId && data?.gifphy.url ? (
                     <styled.gifMessageDiv>
                        <LazyLoadImage
                           src={data?.gifphy.url}
                           id={data?.gifId?.gifId}
                           alt=""
                        />
                     </styled.gifMessageDiv>
                  ) : null}
               </div>
            </div>
         </styled.userMessageDiv>
      </styled.div>
   );
}

export default ChatMessageComponent;
