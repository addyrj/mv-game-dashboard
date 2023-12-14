import React, { Fragment, useRef } from 'react';
import * as styled from './LuckSpinnerWheelComponent.style';
import SpinnerWheelInnerComponent from '../SpinnerWheelInnerComponent/SpinnerWheelInnerComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { showDailySpinPopUpHandler } from '../../App/Features/Client/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { luckySpinHandler } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { luckyDrawDataSelector } from './LuckySpin.Selector';
import {
   updateTodaySpin,
   showCongiHandler,
} from '../../App/Features/LuckyDraw/LuckyDrawSlice';
import {
   updateUserFaitWallet,
   updateUserCryptoWallet,
   showMoneyAnimation,
} from '../../App/Features/Payment/paymentSlice';

const playButtonAudioSound = new Audio('/audio/button_press_sound.mp3');
const spinWheelSound = new Audio('/audio/spin-wheel.mp3');

function LuckSpinnerWheelComponent({
   ActiveTab,
   userSpinInfo,
   auth,
   selectedDraw,
}) {
   const wheelRef = useRef(null);
   const dispatch = useDispatch();
   const luckyDrawData = useSelector(luckyDrawDataSelector);

   const spinWheelAnimationHandler = function (randomNum, data) {
      const wheel = wheelRef.current;
      const degreesToRotate = randomNum * 22.5 + 337.5 * 10 + 22.5 * 10;
      wheel.style.transform = `rotate(${degreesToRotate}deg)`;

      setTimeout(() => {
         dispatch(showCongiHandler({ show: true, data }));
         dispatch(showDailySpinPopUpHandler({ data: false }));
         spinWheelSound.pause();

         dispatch(
            showMoneyAnimation({
               status: 'add',
               show: true,
            })
         );

         setTimeout(() => {
            dispatch(showMoneyAnimation(null));
         }, 1300);

         if (data?.updateObject?.currencyType === 'FIAT') {
            dispatch(
               updateUserFaitWallet({
                  currencyId: data?.updateObject?.selectedCurrency,
                  amount: data?.updateObject?.price,
                  userId: data?.userId,
               })
            );
         }

         if (data?.updateObject?.currencyType === 'CRYPTO') {
            dispatch(
               updateUserCryptoWallet({
                  symbol: data?.updateObject?.name,
                  currencyType: data?.updateObject?.currencyType,
                  balance: data?.updateObject?.price,
                  type: 'increment',
               })
            );
         }
      }, [degreesToRotate + 1500]);
   };

   const roolWheelButtonHandler = function () {
      playButtonAudioSound.currentTime = 0;
      playButtonAudioSound.play();

      const { userLogin, level, todaySpin } = userSpinInfo?.response?.[0];
      const userId = auth?.user?._id;

      if (!userLogin || !userId) {
         dispatch(showDailySpinPopUpHandler({ data: false }));
         return toast.error('Need to login first');
      }
      if (!selectedDraw) {
         return toast.error('Please first select the lucky draw');
      }
      if (ActiveTab?.level > level) {
         return toast.error('Your game level is to not enough to spin.');
      }
      if (!todaySpin) {
         return console.log('today spin is over..');
      }

      dispatch(updateTodaySpin({ todaySpin: false }));

      dispatch(
         luckySpinHandler({
            level,
            userId,
            selectedDraw,
            userCrId: auth?.user?.userId,
         })
      )
         .then((res) => {
            const { data } = res.payload;
            spinWheelSound.currentTime = 0;
            spinWheelSound.play();
            spinWheelAnimationHandler(data.winNumber, data);
         })
         .catch((error) => {
            console.log('Error:', error);
         });
   };

   return (
      <styled.div>
         <styled.spinnerModeldiv>
            <styled.spinerMainDiv>
               <styled.spinerBodyDiv>
                  <styled.spinnerWheelDiv ref={wheelRef}>
                     {!!luckyDrawData &&
                        luckyDrawData?.success &&
                        !!luckyDrawData?.item && (
                           <Fragment>
                              <AnimatePresence>
                                 {ActiveTab?.heading === 'Bronze' &&
                                 !!luckyDrawData?.item?.LuckSpinerWheelBronze &&
                                 luckyDrawData?.item?.LuckSpinerWheelBronze
                                    .length ? (
                                    <SpinnerWheelInnerComponent
                                       dataAr={
                                          luckyDrawData?.item
                                             ?.LuckSpinerWheelBronze
                                       }
                                    />
                                 ) : null}
                              </AnimatePresence>
                              <AnimatePresence>
                                 {ActiveTab.heading === 'Gold' &&
                                 !!luckyDrawData?.item?.LuckSpinerWheelGold &&
                                 luckyDrawData?.item?.LuckSpinerWheelGold
                                    .length ? (
                                    <SpinnerWheelInnerComponent
                                       dataAr={
                                          luckyDrawData?.item
                                             ?.LuckSpinerWheelGold
                                       }
                                    />
                                 ) : null}
                              </AnimatePresence>
                              <AnimatePresence>
                                 {ActiveTab.heading === 'Diamond' &&
                                 !!luckyDrawData?.item
                                    ?.LuckSpinerWheelDiamond &&
                                 luckyDrawData?.item?.LuckSpinerWheelDiamond
                                    .length ? (
                                    <SpinnerWheelInnerComponent
                                       dataAr={
                                          luckyDrawData?.item
                                             ?.LuckSpinerWheelDiamond
                                       }
                                    />
                                 ) : null}
                              </AnimatePresence>
                           </Fragment>
                        )}
                  </styled.spinnerWheelDiv>
                  <div className="point-img">
                     <div className="light-wrap">
                        <div className="point-light"></div>
                     </div>
                     <LazyLoadImage src="/images/point_bronze.webp" alt="" />
                  </div>
               </styled.spinerBodyDiv>
               <div
                  className={
                     !!userSpinInfo?.response[0]?.todaySpin &&
                     userSpinInfo?.response[0][ActiveTab.heading]
                        ? 'btn-img'
                        : 'btn-img no_allow'
                  }
                  onClick={
                     !!userSpinInfo?.response[0]?.todaySpin &&
                     userSpinInfo?.response[0][ActiveTab.heading]
                        ? () => roolWheelButtonHandler()
                        : null
                  }
               >
                  <LazyLoadImage src="/images/spin_center1.webp" alt="" />
                  <LazyLoadImage
                     className="btn-txt"
                     src="/images/btn_luckspin.webp"
                     alt=""
                  />
               </div>
               <AnimatePresence>
                  {ActiveTab?.heading === 'Bronze' ? (
                     <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                           duration: 0.8,
                           type: 'spring',
                        }}
                        className="banner-img"
                     >
                        <LazyLoadImage src={`/images/banner_bronze.png`} />
                     </motion.div>
                  ) : null}
               </AnimatePresence>
               <AnimatePresence>
                  {ActiveTab?.heading === 'Gold' ? (
                     <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                           duration: 0.8,
                           type: 'spring',
                        }}
                        className="banner-img"
                     >
                        <LazyLoadImage src={`/images/banner_gold.png`} />
                     </motion.div>
                  ) : null}
               </AnimatePresence>
               <AnimatePresence>
                  {ActiveTab?.heading === 'Diamond' ? (
                     <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                           duration: 0.8,
                           type: 'spring',
                        }}
                        className="banner-img"
                     >
                        <LazyLoadImage src={`/images/banner_diamond.png`} />
                     </motion.div>
                  ) : null}
               </AnimatePresence>
               <CustomButtonComponent
                  btnCl={`ui-button button-normal s-conic4 btn ${
                     ActiveTab?.name
                  }_btn ${
                     !!userSpinInfo?.response[0]?.todaySpin &&
                     userSpinInfo?.response[0][ActiveTab.heading]
                        ? ''
                        : 'no_allow'
                  }`}
                  onClick={
                     !!userSpinInfo?.response[0]?.todaySpin &&
                     userSpinInfo?.response[0][ActiveTab.heading]
                        ? () => roolWheelButtonHandler()
                        : null
                  }
               >
                  <div className="button-inner">{`Free Spin: ${
                     !!userSpinInfo?.response[0]?.todaySpin ? '1' : '0'
                  }`}</div>
               </CustomButtonComponent>
            </styled.spinerMainDiv>
         </styled.spinnerModeldiv>
      </styled.div>
   );
}

export default LuckSpinnerWheelComponent;
