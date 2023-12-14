import React, { useRef } from 'react';
import * as styled from './DropDownMenuComponent.style';
import { FiPackage } from '@react-icons/all-files/fi/FiPackage';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';
import { useNavigate } from 'react-router';

function DropDownMenuComponent({ data }) {
   const navigation = useNavigate();
   const menuRef = useRef(null);

   const showAndHideHandler = function () {
      menuRef.current.classList.toggle('show_mn');
      menuRef.current.classList.toggle('ac_div');
   };

   return (
      <styled.div>
         <styled.hoverDiv ref={menuRef} key={data?.category?._id}>
            <div className="in_parent_div" onClick={showAndHideHandler}>
               <div>
                  <div className="flex items-center">
                     <div className="home_icon text-gray-300">
                        <FiPackage />
                     </div>
                     <p className="text-gray-400 ms-3 menu_text_elm">
                        {data?.category?.name}
                     </p>
                  </div>
               </div>
               <div className="md_icn">
                  <MdKeyboardArrowRight className="text-gray-300 text-2xl" />
               </div>
            </div>
            <div className="sidebar_hr_div">
               {data?.games.map((elm) => (
                  <div
                     className="in_parent_div sub_vr"
                     key={elm?._id}
                     onClick={() =>
                        navigation(
                           `/game/${elm.name
                              .toLowerCase()
                              .replaceAll(' ', '-')}/${elm?._id}`
                        )
                     }
                  >
                     <div>
                        <div className="flex items-center">
                           <p className="text-gray-400 ms-3 menu_text_elm ms-4">
                              {elm?.name}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </styled.hoverDiv>
      </styled.div>
   );
}

export default DropDownMenuComponent;
