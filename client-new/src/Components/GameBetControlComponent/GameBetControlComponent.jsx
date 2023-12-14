import React, { useState, useRef, Fragment } from 'react';
import * as styled from './GameBetControlComponent.style';
import { AiOutlineInfoCircle } from '@react-icons/all-files/ai/AiOutlineInfoCircle';
import {
   gameSelectedCurrencySelector,
   gameSelectedCurrencyLoadingSelector,
   gameSelectedCurrencyErrorSelector,
   authSelector,
} from './GameBet.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowDropDown } from '@react-icons/all-files/md/MdArrowDropDown';
import { MdArrowDropUp } from '@react-icons/all-files/md/MdArrowDropUp';
import { Slider } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import toast from 'react-hot-toast';
import { showAndHideInsufficientBlcHandler } from '../../App/Features/Client/clientSlice';

function GameBetControlComponent({
   maxAmount,
   minSldAmount,
   maxSldAmount,
   showSld,
}) {
   const [Amount, setAmount] = useState(10);
   const [ShowMinMaxSld, setShowMinMaxSld] = useState(false);
   const ControlRef = useRef(null);
   const ToolKetref = useRef(null);
   const dispatch = useDispatch();

   const gameSelectedCurrency = useSelector(gameSelectedCurrencySelector);
   const gameSelectedCurrencyLoading = useSelector(
      gameSelectedCurrencyLoadingSelector
   );
   const gameSelectedCurrencyError = useSelector(
      gameSelectedCurrencyErrorSelector
   );
   const auth = useSelector(authSelector);

   const onfocus = function () {
      ControlRef.current.style.border = '1px solid var(--dark-red-cl)';
   };

   const onBlur = function () {
      ControlRef.current.style.border = '1px solid transparent';
      const num = +Amount;
      const float_num = Math.abs(num.toFixed(8));
      setAmount(float_num);
   };

   const hoverHandler = function () {
      ToolKetref.current.classList.add('show_tl');
   };

   const leaveHandler = function () {
      ToolKetref.current.classList.remove('show_tl');
   };

   const changeHandler = function (e) {
      const { value } = e.target;
      setAmount(value);
   };

   const numberHf = function () {
      const amount_num = +Amount;
      if (amount_num >= 2) {
         setAmount(amount_num / 2);
      }
   };

   const numberDouble = function () {
      const amount_num = +Amount;
      if (amount_num >= 1 && amount_num < maxAmount) {
         setAmount(amount_num * 2);
      }
   };

   const sldChangeHandler = function (value) {
      setAmount(value);
   };

   const maxBetHandler = function () {
      if (
         gameSelectedCurrency &&
         gameSelectedCurrency?.currency &&
         gameSelectedCurrency?.currency?.balance
      ) {
         const AvailableGameAmount = Number(
            gameSelectedCurrency?.currency?.balance
         );
         setAmount(AvailableGameAmount);
      }
   };

   const placeBetHandler = function () {
      if (!gameSelectedCurrency) {
         return toast.error('Selected game is required');
      }

      if (!auth) {
         return toast.error('You need to login first');
      }

      if (
         gameSelectedCurrency &&
         gameSelectedCurrency?.currency &&
         gameSelectedCurrency?.currency?.balance
      ) {
         const AvailableGameAmount = Number(
            gameSelectedCurrency?.currency?.balance
         );

         if (Number(AvailableGameAmount) < 1) {
            return dispatch(showAndHideInsufficientBlcHandler(true));
         }

         if (AvailableGameAmount < Amount) {
            return dispatch(showAndHideInsufficientBlcHandler(true));
         }

         if (!!auth && auth?.user && auth?.user?.userId) {
            const userId = auth?.user?.userId;
            const _id = auth?.user?._id;

            console.log('availabel-game-amount', AvailableGameAmount);
            console.log('bet-amount', Amount);
            console.log({ 'user-id': userId }, { user_id: _id });
         }
      }
   };

   return (
      <styled.div>
         {!!gameSelectedCurrencyError && (
            <p className="text-sm error_cl">{gameSelectedCurrencyError}</p>
         )}
         {!!gameSelectedCurrencyLoading && <SpennerComponent />}
         {!!gameSelectedCurrency &&
            gameSelectedCurrency?.currency &&
            gameSelectedCurrency?.currency?.icon && (
               <div className="game-control-panel">
                  <div className="flex items-center justify-between w-full">
                     <div className="flex items-center mb-2 space-x-2 ">
                        <p className="text-gray-400 ms-2">Amount</p>
                        <div className="hover_div">
                           <AiOutlineInfoCircle
                              className="text-green-500 cursor-pointer"
                              onMouseEnter={hoverHandler}
                              onMouseLeave={leaveHandler}
                           />
                           <styled.tolKit ref={ToolKetref}>
                              <p className="text-sm">Max Profil 99999.0000</p>
                           </styled.tolKit>
                        </div>
                     </div>
                     <p className="text-gray-400">
                        {Amount}{' '}
                        <span>
                           {gameSelectedCurrency?.currency?.currencyName}
                        </span>
                     </p>
                  </div>
                  <div>
                     <styled.inputDiv ref={ControlRef}>
                        <div className="icon_div">
                           <img
                              src={gameSelectedCurrency?.currency?.icon}
                              alt=""
                           />
                        </div>
                        <input
                           type={'number'}
                           onFocus={onfocus}
                           onBlur={onBlur}
                           onChange={changeHandler}
                           value={Amount}
                        />
                        <styled.opDiv>
                           <div className="box" onClick={numberHf}>
                              <div className="cr">
                                 <p>/2</p>
                              </div>
                           </div>
                           <div className="box" onClick={numberDouble}>
                              <div className="cr">
                                 <p>x2</p>
                              </div>
                           </div>
                           <div className="box" onClick={maxBetHandler}>
                              <div className="cr">
                                 <p>Max</p>
                              </div>
                           </div>
                           {showSld && (
                              <div className="box">
                                 <div
                                    className="cr"
                                    onClick={() => setShowMinMaxSld(true)}
                                 >
                                    <div className="text-gray-200">
                                       <MdArrowDropUp />
                                       <MdArrowDropDown />
                                    </div>
                                 </div>
                                 <AnimatePresence>
                                    {!!ShowMinMaxSld && (
                                       <Fragment>
                                          <div
                                             className="ov_div"
                                             onClick={() =>
                                                setShowMinMaxSld(false)
                                             }
                                          />
                                          <motion.div
                                             initial={{
                                                opacity: 0,
                                                scale: 0.5,
                                             }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             exit={{ opacity: 0, scale: 0.5 }}
                                             className="mv_div"
                                          >
                                             <div
                                                className="box"
                                                onClick={() =>
                                                   setAmount(minSldAmount)
                                                }
                                             >
                                                <div className="cr">
                                                   <p>Min</p>
                                                </div>
                                             </div>
                                             <div className="sld">
                                                <Slider
                                                   onChange={sldChangeHandler}
                                                   max={maxSldAmount}
                                                   min={minSldAmount}
                                                   value={Amount}
                                                />
                                             </div>
                                             <div
                                                className="box"
                                                onClick={() =>
                                                   setAmount(maxSldAmount)
                                                }
                                             >
                                                <div className="cr">
                                                   <p>Max</p>
                                                </div>
                                             </div>
                                          </motion.div>
                                       </Fragment>
                                    )}
                                 </AnimatePresence>
                              </div>
                           )}
                        </styled.opDiv>
                     </styled.inputDiv>
                  </div>
                  <div className="game-bet-place-group mt-4 mb-3">
                     <CustomButtonComponent
                        onClick={placeBetHandler}
                        text={'Bet'}
                        btnCl={'large_btn'}
                     />
                  </div>
               </div>
            )}
      </styled.div>
   );
}

export default GameBetControlComponent;
