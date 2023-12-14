import React from 'react';
import * as styled from './LiveChatHeadComponent.style';
import { FaBars } from '@react-icons/all-files/fa/FaBars';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';

function LiveChatHeadComponent() {
   return (
      <styled.div>
         <div className="head_div">
            <div className="close_icon shadow">
               <FaBars className="text-gray-100 text-xl" />
            </div>
            <h1 className="text-gray-300 text-lg font-medium">Live Chat</h1>
            <BsSearch className="text-gray-100 text-xl cursor-pointer" />
         </div>
      </styled.div>
   );
}

export default LiveChatHeadComponent;
