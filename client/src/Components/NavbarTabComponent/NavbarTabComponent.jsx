import React from 'react';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';
import * as styled from './NavbarTabComponent.style';

function NavbarTabComponent({
   children,
   heading,
   arrow,
   cl,
   tab,
   onClick,
   active,
   icon,
}) {
   return (
      <styled.prDiv>
         <styled.div className={cl}>
            <div className="group_drop_down_parent_div">
               <div className="flex items-center drop_parent_div">
                  <div
                     onClick={tab ? () => onClick(heading) : null}
                     className={
                        active === heading
                           ? 'drop_down_div activeTab'
                           : 'drop_down_div'
                     }
                  >
                     <div className="flex items-center">
                        {icon}
                        <p className="ms-2">{heading}</p>
                     </div>
                     {children ? children : null}
                  </div>
                  {arrow ? (
                     <div className="icons_div">
                        <MdKeyboardArrowRight />
                     </div>
                  ) : null}
               </div>
            </div>
         </styled.div>
      </styled.prDiv>
   );
}

export default React.memo(NavbarTabComponent);
