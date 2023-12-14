import React, { useState } from 'react';
import * as styled from './CategoryOptionsComponents.style';
import MyVipPacksComponent from '../MyVipPacksComponent/MyVipPacksComponent';
import { AnimatePresence } from 'framer-motion';
import DailySpinPopUpComponent from '../DailySpinPopUpComponent/DailySpinPopUpComponent';
import { useSelector } from 'react-redux';
import CategoryOptions from './CategoryAr';
import { showDailySpinSelector } from './Category.Selector';
import { useNavigate } from 'react-router';

function CategoryOptionsComponents() {
   const [ShowVipPopUp, setShowVipPopUp] = useState(false);
   const navigation = useNavigate();

   const showDailySpinPopUp = useSelector(showDailySpinSelector);

   const showVipPopUpHandler = function () {
      setShowVipPopUp(!ShowVipPopUp);
   };

   const clickHandler = function (link) {
      if (link) {
         navigation(link);
      }
   };

   return (
      <>
         <AnimatePresence>
            {showDailySpinPopUp ? <DailySpinPopUpComponent /> : null}
         </AnimatePresence>
         <styled.div className="categoriyes flex items-center">
            <div className="red_pepe_logo">
               <img src="/images/mob_logo.png" alt="" />
            </div>
            {CategoryOptions.map((el) => (
               <div
                  key={el.id}
                  className="nav_parent_div"
                  onClick={() => clickHandler(el?.link)}
               >
                  <div
                     className={`${
                        el?.cl ? el.cl : ''
                     } hover_div d-flex align-items-center me-2`}
                     onClick={
                        el.cl === 'vip' ? () => showVipPopUpHandler() : null
                     }
                  >
                     {el.icons}
                     <p className=" text-gray-400 ms-3">{el.text}</p>
                  </div>
                  <AnimatePresence>
                     {el?.cl === 'vip' && ShowVipPopUp ? (
                        <>
                           <div
                              className="over_lay_div"
                              onClick={showVipPopUpHandler}
                           />
                           <MyVipPacksComponent close={showVipPopUpHandler} />
                        </>
                     ) : null}
                  </AnimatePresence>
               </div>
            ))}
         </styled.div>
      </>
   );
}

export default CategoryOptionsComponents;
