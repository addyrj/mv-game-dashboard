import React, { useContext, useState, useRef } from 'react';
import * as styled from './SendChatMessagesComponent.style';
import InputEmoji from 'react-input-emoji';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { RiSendPlane2Fill } from '@react-icons/all-files/ri/RiSendPlane2Fill';
import { SocketContext } from '../../Context/SocketIoContext';
import { useSearchParams } from 'react-router-dom';
import ReactGiphySearchbox from 'react-giphy-searchbox';
import { AiOutlineGif } from '@react-icons/all-files/ai/AiOutlineGif';
import { MdArrowDropDown } from '@react-icons/all-files/md/MdArrowDropDown';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { DefaultGroupId } from '../../helper/helper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
   authSelector,
   userProfilePrivacyInfoSelector,
} from './SendChatMessage.Selector';
import { useSelector } from 'react-redux';

function SendChatMessagesComponent({ cl, privateCm, currentChatUserId }) {
   const [Message, setMessage] = useState('');
   const socket = useContext(SocketContext);
   const [params] = useSearchParams();
   const groupId = params.get('groupId');
   const [ShowGifCm, setShowGifCm] = useState(false);
   const PrevGifRef = useRef(null);
   const [SelectedGif, setSelectedGif] = useState({
      url: '',
      gifId: '',
   });

   const auth = useSelector(authSelector);
   const userProfilePrivacyInfo = useSelector(userProfilePrivacyInfoSelector);

   const sendMessage = function () {
      if (
         !!auth &&
         auth?.user &&
         auth?.user?._id &&
         (!!Message || !!SelectedGif?.url)
      ) {
         if (privateCm) {
            PrevGifRef.current.classList.remove('show_prev_selected_gif_div');
            const EmitObject = {
               currentChatUserId: currentChatUserId,
               message: Message,
               name: auth?.user?.name,
               sender: auth?.user?._id,
               onlyEmogi: false,
            };

            if (!!SelectedGif?.url && !!SelectedGif?.gifId) {
               EmitObject.giphy = SelectedGif;
            }

            socket.emit('_send_private_message', EmitObject);
            setSelectedGif({
               url: '',
               gifId: '',
            });
            setMessage('');
         } else if (groupId || DefaultGroupId) {
            PrevGifRef.current.classList.remove('show_prev_selected_gif_div');

            const EmitObject = {
               groupId: groupId || DefaultGroupId,
               message: Message,
               name: auth?.user?.name,
               avatar: auth?.user?.avatar,
               userId: auth?.user?._id,
               onlyEmogi: false,
               provider: auth?.user?.provider,
            };

            const { hideUserName } = userProfilePrivacyInfo?.response;

            if (!!hideUserName) {
               EmitObject.hideUserName = true;
            }

            if (!!SelectedGif?.url && !!SelectedGif?.gifId) {
               EmitObject.gifphy = SelectedGif;
            }

            socket.emit('_send_group_message', EmitObject);
            setSelectedGif({
               url: '',
               gifId: '',
            });
            setMessage('');
         }
      }
   };

   const gifOnSelect = function (item) {
      PrevGifRef.current.classList.add('show_prev_selected_gif_div');
      setShowGifCm(!ShowGifCm);
      const {
         id: gifId,
         images: { preview_gif },
      } = item;
      setSelectedGif({
         url: preview_gif.url,
         gifId,
      });
   };

   const gifRemoveHandler = function () {
      setSelectedGif({
         url: '',
         gifId: '',
      });
      PrevGifRef.current.classList.remove('show_prev_selected_gif_div');
   };

   const sendHandler = function () {
      sendMessage(Message);
   };

   function handleOnEnter(text) {
      sendMessage(text);
   }

   const showGifComponent = function () {
      setShowGifCm(!ShowGifCm);
   };

   return (
      <styled.div className={`p-2 shadow ${cl ? cl : null}`}>
         <styled.gifSelectDiv
            className="p-2 shadow-lg rounded"
            ref={PrevGifRef}
         >
            <MdArrowDropDown className="arrow_down_icon" />
            <div
               className="close_div shadow bg-gray-500"
               onClick={gifRemoveHandler}
            >
               <VscClose />
            </div>
            {SelectedGif && SelectedGif?.gifId ? (
               <LazyLoadImage src={SelectedGif.url} alt="" />
            ) : null}
         </styled.gifSelectDiv>
         <styled.messageDiv className="mt-2 mb-2 flex items-center">
            <InputEmoji
               theme="light"
               value={Message}
               onChange={setMessage}
               cleanOnEnter
               onEnter={handleOnEnter}
               placeholder="Type a message"
            />
            <div>
               <CustomButtonComponent
                  btnCl={'send_button ms-2'}
                  onClick={sendHandler}
               >
                  <RiSendPlane2Fill />
               </CustomButtonComponent>
            </div>
         </styled.messageDiv>
         <div className="flex items-center justify-end px-2 py-2">
            <div className="gif_div">
               {!!ShowGifCm ? (
                  <div
                     className="over_lay_div"
                     onClick={showGifComponent}
                  ></div>
               ) : null}
               <div
                  className={
                     ShowGifCm
                        ? 'gif_component rounded-md show_gif shadow'
                        : 'gif_component rounded-md'
                  }
               >
                  <ReactGiphySearchbox
                     apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
                     onSelect={gifOnSelect}
                     library="stickers"
                     searchPlaceholder="Search.."
                     masonryConfig={[
                        { columns: 3, imageWidth: 80, gutter: 10 },

                        {
                           mq: '700px',
                           columns: 3,
                           imageWidth: 80,
                           gutter: 10,
                        },
                        {
                           mq: '1000px',
                           columns: 3,
                           imageWidth: 90,
                           gutter: 10,
                        },
                     ]}
                  />
               </div>
               <AiOutlineGif
                  className="text-gray-500"
                  onClick={showGifComponent}
               />
            </div>
         </div>
      </styled.div>
   );
}

export default React.memo(SendChatMessagesComponent);
