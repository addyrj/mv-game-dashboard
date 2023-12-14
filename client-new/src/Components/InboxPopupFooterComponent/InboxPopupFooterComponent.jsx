import React, { useState } from 'react';
import * as styled from './InboxPopupFooterComponent.style';
import { FaUserFriends } from '@react-icons/all-files/fa/FaUserFriends';
import { BsChatDots } from '@react-icons/all-files/bs/BsChatDots';
import uuid from 'react-uuid';
import { useSharedState } from '../../Context/PopUpContext';

const TabAr = [
   {
      name: 'friends',
      icon: <FaUserFriends className="text-gray-400" />,
      text: 'Friends',
      friendSidebar: true,
      allMessageSidebar: false,
   },
   {
      name: 'Chats',
      icon: <BsChatDots className="text-gray-400" />,
      text: 'Chat',
      friendSidebar: false,
      allMessageSidebar: true,
   },
];

function InboxPopupFooterComponent({ event, ScreenRef }) {
   const [ActiveTab, setActiveTab] = useState('friends');
   const [ContextState, setContextState] = useSharedState();

   const activeHandler = function (text, firstBar, secondBar) {
      setActiveTab(text);
      event({
         friendSidebar: firstBar,
         allMessageSidebar: secondBar,
      });
      ScreenRef.current.classList.remove('show_screen');
      setContextState({
         showSmChats: false,
      });
   };

   return (
      <styled.div className="flex items-center">
         {TabAr.map((el) => (
            <styled.optionsDiv
               className={ActiveTab === el.name ? 'active' : null}
               key={uuid()}
               onClick={() =>
                  activeHandler(el.name, el.friendSidebar, el.allMessageSidebar)
               }
            >
               {el.icon}
               <p className="text-gray-400">{el.text}</p>
            </styled.optionsDiv>
         ))}
      </styled.div>
   );
}

export default InboxPopupFooterComponent;
