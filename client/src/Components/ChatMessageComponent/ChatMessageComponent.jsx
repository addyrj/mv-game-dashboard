import React, { useEffect, useRef } from 'react';
import * as styled from './ChatMessageComponent.style';
import dayjs from 'dayjs';

function ChatMessageComponent({ data }) {
   const MessageEndRef = useRef(null);

   const scrollToBottom = () => {
      MessageEndRef.current?.scrollIntoView();
   };

   useEffect(() => {
      scrollToBottom();
   }, [data]);

   return (
      <styled.div className="mt-4" ref={MessageEndRef}>
         <styled.userMessageDiv className="flex">
            <div className="profile_info">
               <div className={'profile hover:scale-105'}>
                  <img src={data?.avatar} alt="" />
               </div>
            </div>
            <div className="ms-2">
               <h5 className="text-gray-300 font-bold">
                  {!!data?.hideUserName ? null : data?.name}{' '}
                  <span className="messageTime text-gray-500 font-medium text-sm">{dayjs(data?.createdAt).format('hh:m A')}</span>
               </h5>
               <div className={data?.onlyEmogi ? 'message_div msg_div mt-2 ' : 'message_div mt-2 '}>
                  <p className="text-gray-200 text-sm font-medium">{data?.message}</p>
                  {data?.gifphy && data?.gifphy?.gifId && data?.gifphy.url ? (
                     <styled.gifMessageDiv>
                        <img src={data?.gifphy.url} id={data?.gifId?.gifId} alt="" />
                     </styled.gifMessageDiv>
                  ) : null}
               </div>
            </div>
         </styled.userMessageDiv>
      </styled.div>
   );
}

export default ChatMessageComponent;
