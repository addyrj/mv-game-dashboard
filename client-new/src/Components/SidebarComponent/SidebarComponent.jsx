import React, { useRef } from 'react';
import * as styled from './SidebarComponent.style';
import SmSidebarComponent from '../SmSidebarComponent/SmSidebarComponent';
import LargeSidebarComponent from '../LargeSidebarComponent/LargeSidebarComponent';

function SidebarComponent({ middelPageRef }) {
   const MenuRef = useRef(null);

   const toggleMenuHandler = function () {
      MenuRef.current.classList.toggle('Sm_menu');
      middelPageRef.current.classList.toggle('full_view');
   };

   return (
      <styled.div className={'p-3 w-full large_side'} ref={MenuRef}>
         <div className="lg_side_bar_div">
            <LargeSidebarComponent toggleMenuHandler={toggleMenuHandler} />
         </div>
         <div className="show_sm_sideBar bg-neutral-900">
            <SmSidebarComponent toggleMenuHandler={toggleMenuHandler} />
         </div>
      </styled.div>
   );
}

export default SidebarComponent;
