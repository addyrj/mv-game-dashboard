import React, { useState } from 'react';
import * as styled from './SendCommentComponent.style';
import InputEmoji from 'react-input-emoji';
import { useDispatch, useSelector } from 'react-redux';
import { GameCommentHandler } from '../../App/Features/Game/gameAction';
import {
   authSelector,
   sendGameCommentLoadingSelector,
} from './SendComment.Selector';
import { useParams } from 'react-router';
import SpennerComponent from '../SpennerComponent/SpennerComponent';

function SendCommentComponent() {
   const [Message, setMessage] = useState('');
   const dispatch = useDispatch();
   const param = useParams();

   const auth = useSelector(authSelector);
   const sendGameCommentLoading = useSelector(sendGameCommentLoadingSelector);

   const sendMessage = function () {
      if (!!auth && !!auth?.user && auth?.user?._id && !!param?.id) {
         const userId = auth?.user?._id;
         const gameId = param?.id;
         const avatar = auth?.user?.avatar;
         const userName = auth?.user?.name;

         dispatch(
            GameCommentHandler({
               userId,
               gameId,
               message: Message,
               avatar,
               userName,
            })
         );
      }
   };

   function handleOnEnter(text) {
      sendMessage(text);
      setMessage('');
   }

   return (
      <styled.div>
         <div className="flex items-center">
            <InputEmoji
               theme="light"
               value={Message}
               onChange={setMessage}
               cleanOnEnter
               onEnter={handleOnEnter}
               placeholder="Type a message"
            />
            {!!sendGameCommentLoading ? (
               <SpennerComponent />
            ) : (
               <div className="group-button" onClick={handleOnEnter}>
                  <button className="btn">
                     <i className="ri-at-line"></i>
                  </button>
                  <button className="btn primary">Send</button>
               </div>
            )}
         </div>
      </styled.div>
   );
}

export default SendCommentComponent;
