import React from 'react';
import * as styled from './ChatRulesModelComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { ContentData } from './Rules';

function ChatRulesModelComponent({ closeEvent }) {
   return ReactDOM.createPortal(
      <styled.div>
         <div className="overLay_div" onClick={closeEvent}></div>
         <styled.mainDiv className="shadow">
            <div className="flex items-center justify-between">
               <h5 className="text-white font-bold">Chat Rules</h5>
               <div className="close_button_div">
                  <VscClose onClick={closeEvent} />
               </div>
            </div>
            <div className="mt-3 text-gray-300 text-sm content">
               {ContentData.map((el) => (
                  <p id={el.id}>{el.content}</p>
               ))}
            </div>
         </styled.mainDiv>
      </styled.div>,
      document.getElementById('chat_rules_model')
   );
}

export default ChatRulesModelComponent;
