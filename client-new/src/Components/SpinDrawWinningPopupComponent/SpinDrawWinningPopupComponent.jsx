import React, { useEffect } from 'react';
import * as styled from './SpinDrawWinningPopupComponent.style';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import useWindowSize from '../../Hooks/useWindsize';
import { motion } from 'framer-motion';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { luckyDrawWinDataSelector } from './SpinDraw.Selector';
import { useDispatch, useSelector } from 'react-redux';
import { showCongiHandler } from '../../App/Features/LuckyDraw/LuckyDrawSlice';

const congoAudio = new Audio('/audio/congo.mp3');
const moneyAddedAudio = new Audio(
   '/audio/cashier-quotka-chingquot-sound-effect-129698.mp3'
);

let themeCouleur = [
   '#f44336',
   '#e91e63',
   '#9c27b0',
   '#673ab7',
   '#3f51b5',
   '#2196f3',
   '#03a9f4',
   '#00bcd4',
   '#009688',
   '#4CAF50',
   '#8BC34A',
   '#CDDC39',
   '#FFEB3B',
   '#FFC107',
   '#FF9800',
   '#FF5722',
];

function SpinDrawWinningPopupComponent() {
   const size = useWindowSize();
   const dispatch = useDispatch();
   const luckyDrawWinData = useSelector(luckyDrawWinDataSelector);

   const closeHandler = function () {
      dispatch(showCongiHandler({ show: false, data: null }));
   };

   useEffect(() => {
      congoAudio.play();
      moneyAddedAudio.play();
   }, []);

   return ReactDOM.createPortal(
      <styled.div>
         {!!luckyDrawWinData &&
            luckyDrawWinData?.success &&
            luckyDrawWinData?.updateObject && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="cn_div"
               >
                  <Confetti
                     width={size?.width}
                     height={size?.height}
                     color={themeCouleur}
                     recycle={false}
                     numberOfPieces={5000}
                  />
                  <div className="winDv text-center">
                     <div className="cl-div" onClick={closeHandler}>
                        <VscClose className="text-gray-400 text-xl" />
                     </div>
                     <img src="/images/cngrats.jpg" />
                     <h1 className="text-gray-600 text-2xl font-bold">
                        Congratulation!
                     </h1>
                     <p className="mt-2 text-green-500 font-bold text-xl">
                        You win
                     </p>
                     <div className="flex items-center space-x-3 justify-center mt-2 font-medium">
                        <p className="text-sm">Win number</p>
                        <p className="text-green-500">
                           {luckyDrawWinData?.winNumber}
                        </p>
                     </div>
                     <p className="text-xl mt-2 font-semibold">Price</p>
                     <p className="text-xl text-green-500 mt-2 font-bold">
                        {luckyDrawWinData?.updateObject?.name} +
                        {luckyDrawWinData?.updateObject?.price}
                     </p>
                     <p className="text-gray-700 text-sm mt-3 mb-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     </p>
                  </div>
               </motion.div>
            )}
      </styled.div>,
      document.getElementById('spin')
   );
}

export default SpinDrawWinningPopupComponent;
