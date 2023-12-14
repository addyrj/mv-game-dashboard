import React, { useCallback, useState } from 'react';
import * as styled from './AllMessagesComponent.style';
import NavbarTabComponent from '../NavbarTabComponent/NavbarTabComponent';
import ChatListSlideComponent from '../ChatListSlideComponent/ChatListSlideComponent';
// import ChatWithStrangerComponent from '../ChatWithStrangerComponent/ChatWithStrangerComponent';

function AllMessagesComponent() {
   const [ActiveTab, setActiveTab] = useState('All Chat');

   const activeTabHandler = useCallback(
      function (heading) {
         setActiveTab(heading);
      },
      [ActiveTab]
   );

   return (
      <styled.div>
         <div className="tab_div">
            <div className="w-100">
               <NavbarTabComponent
                  heading={'All Chat'}
                  cl={'notification'}
                  active={ActiveTab}
                  arrow={false}
                  onClick={activeTabHandler}
                  tab={true}
               />
            </div>
            {/* <div className="w-100">
               <NavbarTabComponent
                  heading={'Stranger'}
                  cl={'notification'}
                  arrow={false}
                  active={ActiveTab}
                  onClick={activeTabHandler}
                  tab={true}
               />
            </div> */}
         </div>
         <div className="scroll_div">
            <div
               className={
                  ActiveTab === 'All Chat'
                     ? 'friends_chat_div'
                     : 'friends_chat_div friends_chat_div_hide'
               }
            >
               <ChatListSlideComponent />
            </div>
            {/* <div
               className={
                  ActiveTab === 'Stranger'
                     ? 'stranger_chat_div stranger_chat_div_active'
                     : 'stranger_chat_div'
               }
            >
               <ChatWithStrangerComponent />
            </div> */}
         </div>
      </styled.div>
   );
}

export default AllMessagesComponent;
