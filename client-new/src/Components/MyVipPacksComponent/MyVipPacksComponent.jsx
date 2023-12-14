import React from 'react';
import { motion } from 'framer-motion';
import VipSmCardsInnerComponent from '../VipSmCardsInnerComponent/VipSmCardsInnerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { showDailySpinPopUpHandler } from '../../App/Features/Client/clientSlice';
import {
   drawsSelector,
   drawsLoadingSelector,
   showConPopupSelector,
} from './MyVipPack.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { selectedDrawHandler } from '../../App/Features/LuckyDraw/LuckyDrawSlice';
import SpinDrawWinningPopupComponent from '../SpinDrawWinningPopupComponent/SpinDrawWinningPopupComponent';
import { AnimatePresence } from 'framer-motion';

function MyVipPacksComponent({ sm }) {
   const dispatch = useDispatch();

   const showDailySpin = function (drawId) {
      dispatch(showDailySpinPopUpHandler({ data: true }));
      dispatch(selectedDrawHandler(drawId));
   };

   const drawsLoading = useSelector(drawsLoadingSelector);
   const draws = useSelector(drawsSelector);
   const showConPopup = useSelector(showConPopupSelector);

   if (draws && draws?.success && draws?.item && !draws?.item?.length) {
      return null;
   }

   return (
      <>
         {!!drawsLoading && <SpennerComponent />}
         <AnimatePresence>
            {!!showConPopup && <SpinDrawWinningPopupComponent />}
         </AnimatePresence>
         <motion.div
            initial={{ opacity: 0.1, top: 100 }}
            animate={{ opacity: 1, top: 60 }}
            exit={{ opacity: 0.1, top: 100 }}
            className="vip_plan_pop"
         >
            {!!draws &&
               draws?.success &&
               !!draws?.item &&
               draws?.item.map((el) => (
                  <VipSmCardsInnerComponent
                     key={el?._id}
                     imgSrc={'/images/turntable.webp'}
                     heading={!sm && el?.spinName}
                     subHeading={!sm && 'Win'}
                     cl={'daily-spin'}
                     onClick={() => showDailySpin(el?._id)}
                  />
               ))}

            {/* <VipSmCardsInnerComponent
               imgSrc={'/images/task.webp'}
               heading={!sm && 'TASK'}
               subHeading={!sm && 'unlocked'}
               cl={'task'}
            /> */}
         </motion.div>
      </>
   );
}

export default MyVipPacksComponent;
