import React from 'react';
import * as styled from './UserProfileSmComponent.style';
import { useSharedState } from '../../Context/PopUpContext';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function UserProfileSmComponent({ data }) {
   const [ContextState, setContextState] = useSharedState();
   const navigation = useNavigate();
   const [params] = useSearchParams();
   const chatId = params.get('chat');

   const showPrivatChatHandler = function (selectedUserId) {
      navigation(`?chat=${selectedUserId}`);
      setContextState({
         ...ContextState,
         showPrivateChat: true,
         showFriendsRequests: false,
         showSmChats: true,
      });
   };

   return (
      <styled.div>
         <div
            className={
               chatId === data?.userId
                  ? 'profile_div flex items-center active_usr'
                  : 'profile_div flex items-center'
            }
            onClick={() => showPrivatChatHandler(data?.userId)}
         >
            <div className="profile">
               <LazyLoadImage
                  src={data?.avatar}
                  alt=""
                  crossOrigin="anonymous"
               />
            </div>
            <div className="content_div ms-3">
               <h5 className="text-gray-300">{data?.name}</h5>
               <p className="text-gray-500 text-sm">{data?.email}</p>
            </div>
         </div>
      </styled.div>
   );
}

export default UserProfileSmComponent;
