import React, { useState, useEffect } from 'react';
import * as styled from './SideBarChatNavComponent.style';
import { HiOutlineInformationCircle } from '@react-icons/all-files/hi/HiOutlineInformationCircle';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import ChatRulesModelComponent from '../ChatRulesModelComponent/ChatRulesModelComponent';
import { useDispatch } from 'react-redux';
import { showSidebarHandler } from '../../App/Features/Client/clientSlice';
import { getChatGroups } from '../../App/Features/Group/groupActions';
import SidebarChatGroupListComponent from '../SidebarChatGroupListComponent/SidebarChatGroupListComponent';
import NavbarTabComponent from '../NavbarTabComponent/NavbarTabComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SideBarChatNavComponent() {
   const [ShowRules, setShowRules] = useState(false);
   const [ActiveGroup, setActivegroup] = useState('English');
   const dispatch = useDispatch();

   const showRulesHandler = function () {
      setShowRules(!ShowRules);
   };

   const setActiveGroupHandler = function (name) {
      setActivegroup(name);
   };

   useEffect(() => {
      dispatch(getChatGroups());
   }, []);

   return (
      <styled.div className="shadow">
         {ShowRules ? (
            <ChatRulesModelComponent closeEvent={showRulesHandler} />
         ) : null}
         <styled.optionsDiv className="flex items-center justify-between">
            <NavbarTabComponent heading={ActiveGroup} arrow={true}>
               <div className="hover_div">
                  <SidebarChatGroupListComponent
                     event={setActiveGroupHandler}
                  />
               </div>
            </NavbarTabComponent>
            <div className="options pe-3 flex items-center space-x-4">
               <HiOutlineInformationCircle onClick={showRulesHandler} />
               <div className="cup_div">
                  <LazyLoadImage
                     src="https://bc.game/assets/rich.8786d13b.png"
                     alt=""
                  />
               </div>
               <VscClose
                  onClick={() => dispatch(showSidebarHandler({ data: false }))}
               />
            </div>
         </styled.optionsDiv>
      </styled.div>
   );
}

export default React.memo(SideBarChatNavComponent);
