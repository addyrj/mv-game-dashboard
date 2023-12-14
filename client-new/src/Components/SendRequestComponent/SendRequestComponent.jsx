import React, { useContext } from 'react';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { motion } from 'framer-motion';
import { SocketContext } from '../../Context/SocketIoContext';
import { useCookies } from 'react-cookie';
import * as styled from './SendRequestComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestLoadingHandler } from '../../App/Features/Client/clientSlice';
import { friendRequestLoadingSelector } from './SendRequest.Selector';

function SendRequestComponent({ userId, close }) {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const friendRequestLoading = useSelector(friendRequestLoadingSelector);

   const sendFriendRequestHandler = function () {
      if (!!cookie && cookie?._mv_games_auth && cookie?._mv_games_auth?._id) {
         const reuquestObject = {
            user: cookie?._mv_games_auth?._id,
            friendRequestUser: userId,
            avatar: cookie?._mv_games_auth?.avatar,
            name: cookie?._mv_games_auth?.name,
         };

         socket.emit('_friend_request', reuquestObject);
         dispatch(addRequestLoadingHandler({ data: true }));
      }
   };

   return (
      <styled.div>
         <div className="overLayDiv"></div>
         <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1.1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="requestMain_div"
         >
            <div className="requestDiv shadow">
               <div>
                  <p className="mb-5">Send a friend request?</p>
                  <div className="flex items-center">
                     <CustomButtonComponent
                        text={'Cancel'}
                        btnCl={'cancelBtn me-3'}
                        onClick={close}
                     />
                     <CustomButtonComponent
                        text={'Confirm'}
                        btnCl={'DepositBtn px-5'}
                        onClick={() => sendFriendRequestHandler()}
                        isLoading={friendRequestLoading}
                     />
                  </div>
               </div>
            </div>
         </motion.div>
      </styled.div>
   );
}

export default SendRequestComponent;
