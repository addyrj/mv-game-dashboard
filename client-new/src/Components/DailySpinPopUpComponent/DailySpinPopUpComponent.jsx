import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as styled from './DailySpinPopUpComponent.style.';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { showDailySpinPopUpHandler } from '../../App/Features/Client/clientSlice';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import LuckySpinnerComponent from '../LuckySpinnerComponent/LuckySpinnerComponent';
import { getUserDailySpinInfo } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import { authSelector, selectedDrawSelector } from './DailySpin.Selector';

function DailySpinPopUpComponent() {
   const dispatch = useDispatch();

   const selectedDraw = useSelector(selectedDrawSelector);
   const auth = useSelector(authSelector);

   const closeHandler = function () {
      dispatch(showDailySpinPopUpHandler({ data: false }));
   };

   useEffect(() => {
      if (!!selectedDraw) {
         if (auth && auth?.user && auth?.user?._id) {
            dispatch(
               getUserDailySpinInfo({
                  userId: auth?.user?._id,
                  drawId: selectedDraw,
               })
            );
         } else {
            dispatch(getUserDailySpinInfo({ userId: null }));
         }
      }
   }, [auth, selectedDraw]);

   return ReactDOM.createPortal(
      <styled.div>
         <div className="over_lay_div" onClick={closeHandler}></div>
         <motion.div
            initial={{ opacity: 0.1, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.1, scale: 0.4 }}
            transition={{
               duration: 0.2,
               damping: 200,
            }}
            className="spin_div"
         >
            <div className="close_div" onClick={closeHandler}>
               <VscClose className="text-gray-300" />
            </div>
            <LuckySpinnerComponent />
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default DailySpinPopUpComponent;
