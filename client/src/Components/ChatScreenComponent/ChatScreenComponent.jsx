import React from 'react';
import * as styled from './ChatScreenComponent.style';
import ChatMessageComponent from '../ChatMessageComponent/ChatMessageComponent';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getUserGlobalChats } from '../../App/Features/userManagement/userManagementActions';
import { useParams } from 'react-router-dom';
import { loadMoreChatMessagesSelector, groupChatsLoadingSelector, selectedGroupSelector } from './ChatScreen.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';

function ChatScreenComponent({ chats, page, totalPages }) {
   const dispatch = useDispatch();
   const params = useParams();

   const groupChatsLoading = useSelector(groupChatsLoadingSelector);
   const loadMoreChatMessages = useSelector(loadMoreChatMessagesSelector);
   const selectedGroup = useSelector(selectedGroupSelector);

   const loadMoreHandler = function () {
      const userId = params?.id;
      dispatch(getUserGlobalChats({ groupId: selectedGroup, userId, page: page + 1 }));
   };

   return (
      <styled.div>
         <div className="chats">
            {chats.map((el) => (
               <ChatMessageComponent data={el} key={el?._id} />
            ))}
            {!!groupChatsLoading && <SpinnerComponent />}
         </div>
         {totalPages > page && (
            <div className="flex items-center justify-center pt-4">
               <CustomButtonComponent
                  isLoading={loadMoreChatMessages}
                  text={'Load more'}
                  btnCl={'Crypto_btn'}
                  onClick={loadMoreHandler}
               />
            </div>
         )}
      </styled.div>
   );
}

export default ChatScreenComponent;
