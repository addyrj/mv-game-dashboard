import React, { useContext } from 'react';
import * as styled from './SendMessageComponent.style';
import InputEmoji from 'react-input-emoji';
import { useForm, Controller } from 'react-hook-form';
import { BiSend } from '@react-icons/all-files/bi/BiSend';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { SocketContext } from '../../Context/SocketContext';
import { authSelector } from './SendMessage.Selector';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import LiveSuppotFeedbackComponent from '../LiveSuppotFeedbackComponent/LiveSuppotFeedbackComponent';

function SendMessageComponent() {
   const { getValues, control, setValue } = useForm({
      defaultValues: {
         message: '',
      },
   });

   const socket = useContext(SocketContext);
   const auth = useSelector(authSelector);
   const [searchParams] = useSearchParams();
   const userId = searchParams.get('chat');

   const sendHandler = function () {
      if (!!auth && auth?.user && auth?.user?._id) {
         const message = getValues('message');

         const messageObject = {
            name: auth?.user?.name,
            message,
            supportTeamUserId: auth?.user?._id,
            chatFrom: 'supportTeamUser',
            queryUser: userId,
         };

         socket.emit('_send_live_support_messsage', messageObject);
         setValue('message', '');
      } else {
         message.error('You have to login first');
      }
   };

   return (
      <styled.div>
         <div className="flex items-center space-x-2">
            <Controller
               name="message"
               control={control}
               render={({ field: { onChange, value } }) => (
                  <InputEmoji
                     theme="light"
                     value={value}
                     onChange={onChange}
                     cleanOnEnter
                     onEnter={sendHandler}
                     placeholder="Type a message"
                  />
               )}
            />
            <CustomButtonComponent btnCl={'send_button'} onClick={sendHandler}>
               <BiSend />
            </CustomButtonComponent>
            <div className="feed_back_div">
               <LiveSuppotFeedbackComponent />
            </div>
         </div>
      </styled.div>
   );
}

export default SendMessageComponent;
