import React, { useRef } from 'react';
import * as styled from './DropDownComponent.style';
import { TiArrowSortedDown } from '@react-icons/all-files/ti/TiArrowSortedDown';

function DropDownComponent({ heading, children, active, filterName }) {
   const DropDownRef = useRef(null);

   const ShowHandler = function () {
      DropDownRef.current.classList.add('active_bar');
   };

   const HideHandler = function () {
      DropDownRef.current.classList.remove('active_bar');
   };

   return (
      <styled.div>
         <div className="filter-sort">
            <div className="label text-gray-400 font-medium me-3 filterHeading">
               <p>{heading}</p>
            </div>
            <div
               className={
                  !!filterName
                     ? `${filterName} ui-select is-open`
                     : 'ui-select is-open'
               }
            >
               <div
                  className="select-trigger text-gray-300"
                  onMouseEnter={ShowHandler}
                  onMouseLeave={HideHandler}
               >
                  {active}
                  <div className="arrow ms-1 ms-md-4">
                     <TiArrowSortedDown />
                  </div>
               </div>
               <div
                  className="items"
                  ref={DropDownRef}
                  onMouseEnter={ShowHandler}
                  onMouseLeave={HideHandler}
               >
                  {children}
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default DropDownComponent;
