import React, { useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as styled from './SingleChatMessageComponent.style';

function SingleChatMessageComponent({ pos, data }) {
   const MessageEndRef = useRef(null);

   const scrollToBottom = () => {
      MessageEndRef.current?.scrollIntoView();
   };

   useEffect(() => {
      scrollToBottom();
   }, [data]);

   return (
      <styled.div ref={MessageEndRef}>
         <div className={`chat_message_div ${pos}`}>
            <div>
               {!!data?.giphy && data?.giphy?.url ? (
                  <styled.msgGifDiv>
                     <LazyLoadImage src={data?.giphy?.url} alt="" />
                  </styled.msgGifDiv>
               ) : null}
               {!!data?.message ? (
                  <div className="msg_div">
                     <p>{data?.message}</p>
                  </div>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default SingleChatMessageComponent;
