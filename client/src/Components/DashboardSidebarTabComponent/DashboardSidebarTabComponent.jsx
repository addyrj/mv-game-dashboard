import React, { useState } from 'react';
import * as styled from './DashboardSidebarTabComponent.style';
import { MdKeyboardArrowDown } from '@react-icons/all-files/md/MdKeyboardArrowDown';

function DashboardSidebarTabComponent({ heading, children }) {
   const [ShowInnerTabs, setShowInnerTabs] = useState(false);

   const ShowAndHideTabs = function () {
      setShowInnerTabs(!ShowInnerTabs);
   };

   return (
      <styled.div active={ShowInnerTabs}>
         <div className="content_div" onClick={ShowAndHideTabs}>
            <p className="text-gray-300 font-medium">{heading}</p>
            <div className="arrow_icon">
               <MdKeyboardArrowDown
                  className={`text-gray-400 text-xl ar-right ${
                     ShowInnerTabs && 'down'
                  }`}
               />
            </div>
         </div>
         <styled.innerItems>{children}</styled.innerItems>
      </styled.div>
   );
}

export default DashboardSidebarTabComponent;
