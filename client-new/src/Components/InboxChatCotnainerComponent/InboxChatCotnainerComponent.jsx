import React from 'react';
import * as styled from './InboxChatCotnainerComponent.style';
import SendChatMessagesComponent from '../SendChatMessagesComponent/SendChatMessagesComponent';
import PrivateChatScreenComponent from '../PrivateChatScreenComponent/PrivateChatScreenComponent';

import { useSearchParams } from 'react-router-dom';

function InboxChatCotnainerComponent() {
   const [params] = useSearchParams();
   const currentChatUserId = params.get('chat');

   return (
      <styled.div>
         <PrivateChatScreenComponent />
         <SendChatMessagesComponent
            cl={'styled2'}
            privateCm={true}
            currentChatUserId={currentChatUserId}
         />
      </styled.div>
   );
}

export default InboxChatCotnainerComponent;
