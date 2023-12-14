import React, { useRef } from 'react';
import * as styled from './SideBarIconComponent.style';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';

function SideBarIconComponent({
   text,
   dropDown,
   children,
   subVariation,
   parent,
   link,
   subElem,
   onClick,
   icon,
   dropDownIcon,
}) {
   const menuRef = useRef(null);
   const dropDownIconRef = useRef(null);
   const navigation = useNavigate();
   const subVariationElemRef = useRef(null);
   const isMobile = useMediaQuery({ query: '(max-width: 720px)' });

   const showOptionsHandler = function () {
      subVariationElemRef.current.classList.add('Show_options');
   };

   const hideOptionsHandler = function () {
      subVariationElemRef.current.classList.remove('Show_options');
   };

   const showAndHideHandler = function () {
      menuRef.current.classList.toggle('show_mn');
   };

   const clickHandler = function () {
      if (!!link) {
         navigation(link);
         if (onClick && isMobile) {
            onClick();
         }
      }
   };

   return (
      <styled.div
         parent={parent}
         ref={menuRef}
         onClick={!parent ? () => clickHandler() : null}
         className="mb-1"
      >
         <styled.innerDiv onClick={parent ? () => showAndHideHandler() : null}>
            <div
               className={
                  subVariation
                     ? 'in_parent_div sub_vr flex items-center justify-between'
                     : 'in_parent_div "flex items-center justify-between"'
               }
            >
               <div
                  onMouseEnter={!!subElem ? () => showOptionsHandler() : null}
                  onMouseLeave={!!subElem ? () => hideOptionsHandler() : null}
               >
                  <div
                     className="flex items-center"
                     onClick={() => navigation(link)}
                  >
                     <div className="home_icon text-gray-300">{icon}</div>
                     <p className="text-gray-400 ms-3 menu_text_elm">{text}</p>
                  </div>
                  {dropDown ? (
                     <div ref={dropDownIconRef} className="drop_icon">
                        <MdKeyboardArrowRight />
                     </div>
                  ) : null}
               </div>
               {dropDownIcon && <div className="ar_icn">{dropDownIcon}</div>}
            </div>
         </styled.innerDiv>
         {!!subElem ? (
            <div
               onMouseEnter={!!subElem ? () => showOptionsHandler() : null}
               onMouseLeave={!!subElem ? () => hideOptionsHandler() : null}
               ref={subVariationElemRef}
               className="sub_elem_div"
            >
               {subElem}
            </div>
         ) : null}
         {children && <div className="pt-1 px-2">{children}</div>}
      </styled.div>
   );
}

export default React.memo(SideBarIconComponent);
