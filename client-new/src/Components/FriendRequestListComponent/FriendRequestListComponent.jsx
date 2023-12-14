import React, { Fragment, useContext, useEffect } from 'react';
import * as styled from './FriendRequestListComponent.style';
import { FcCheckmark } from '@react-icons/all-files/fc/FcCheckmark';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import dayjs from 'dayjs';
import { SocketContext } from '../../Context/SocketIoContext';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
   rejectRequestUser,
   acceptedFriendReqeustHandler,
   blockedFriendRequestHandler,
   addNewFriend,
} from '../../App/Features/Client/clientSlice';
import { FcApproval } from '@react-icons/all-files/fc/FcApproval';
import { SiAdblock } from '@react-icons/all-files/si/SiAdblock';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function FriendRequestListComponent({ data }) {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies();
   const dispatch = useDispatch();

   const socketResponse = function (responseData) {
      socket.emit('__friend_request_user_respose', responseData);
   };

   const AcceptHandler = function (selectedUser, fieldId) {
      if (cookie && cookie?._mv_games_auth) {
         socketResponse({
            selectedUser,
            type: 'Accepted',
            fieldId,
            userId: cookie?._mv_games_auth?._id,
         });

         const userObject = {
            userId: data?.userId || data?.user,
            _id: data?._id,
            createdAt: data?.createdAt,
            name: data?.name,
            email: data?.email,
            avatar: data?.avatar,
         };

         dispatch(addNewFriend(userObject));
      }
   };

   const rejectHandler = function (selectedUser, fieldId) {
      if (cookie && cookie?._mv_games_auth) {
         socketResponse({
            selectedUser,
            type: 'Rejected',
            fieldId,
            userId: cookie?._mv_games_auth?._id,
         });
      }
   };

   const blockHandler = function (selectedUser, fieldId) {
      if (cookie && cookie?._mv_games_auth) {
         socketResponse({
            selectedUser,
            type: 'Blocked',
            fieldId,
            userId: cookie?._mv_games_auth?._id,
         });
      }
   };

   const rejecteRequestHandler = function (args) {
      const { rejectedUserId } = args;
      dispatch(rejectRequestUser({ rejectedUserId }));
   };

   const acceptedFriendReqeust = function (args) {
      const { status, acceptedUserId } = args;
      dispatch(acceptedFriendReqeustHandler({ status, acceptedUserId }));
   };

   const blockedFriendReqeust = function (args) {
      const { blockedUserId } = args;
      dispatch(blockedFriendRequestHandler({ blockedUserId }));
   };

   useEffect(() => {
      socket.on('__friend_request_reject', rejecteRequestHandler);
      socket.on('__friend_request_accepted', acceptedFriendReqeust);
      socket.on('__friend_request_blocked', blockedFriendReqeust);

      return () => {
         socket.off('__friend_request_reject', rejecteRequestHandler);
         socket.off('__friend_request_accepted', acceptedFriendReqeust);
         socket.off('__friend_request_blocked', blockedFriendReqeust);
      };
   }, []);

   return (
      <styled.div>
         <div>
            <styled.profileDiv>
               <LazyLoadImage
                  src={data.avatar}
                  alt=""
                  crossOrigin="anonymous"
               />
            </styled.profileDiv>
         </div>
         <styled.contentDiv>
            <div>
               <p className="text-gray-300">{data?.name}</p>
               <span className="text-gray-500">{data?.email}</span>
               <div>
                  <span className="text-sm text-gray-700">
                     {dayjs(data?.createdAt).format('D MMMM YY hh:mm A')}
                  </span>
               </div>
            </div>
            <styled.optionsDiv className="space-x-3">
               {data?.status === 'accepted' ? (
                  <div className="request_acc flex items-center">
                     <FcApproval />
                     <p className="text-gray-100 ms-2">Friend</p>
                  </div>
               ) : null}
               {data?.status === 'pending' ? (
                  <Fragment>
                     <div
                        className="box_div shadow"
                        onClick={() => AcceptHandler(data.userId, data?._id)}
                     >
                        <FcCheckmark />
                     </div>
                     <div
                        className="box_div shadow"
                        onClick={() => rejectHandler(data.userId, data?._id)}
                     >
                        <VscClose className="text-red-500" />
                     </div>
                     <div
                        className="box_div shadow"
                        onClick={() => blockHandler(data.userId, data?._id)}
                     >
                        <SiAdblock className="text-red-500" />
                     </div>
                  </Fragment>
               ) : null}
            </styled.optionsDiv>
         </styled.contentDiv>
      </styled.div>
   );
}

export default FriendRequestListComponent;
