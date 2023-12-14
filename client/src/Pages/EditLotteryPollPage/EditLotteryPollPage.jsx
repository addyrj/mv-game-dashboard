import React, { Fragment, useEffect, useRef } from 'react';
import * as styled from './EditLotteryPollPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import {
   authSelector,
   singleLotteryPollSelector,
   singleLotteryPollLoadingSelector,
   singleLotteryPollErrorSelector,
} from './EditLottery.Selector';
import { getSingleLuckyDrawPoll } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import dayjs from 'dayjs';
import LotteryPollBallsComponent from '../../Components/LotteryPollBallsComponent/LotteryPollBallsComponent';
import SingleLotteryPollTabComponent from '../../Components/SingleLotteryPollTabComponent/SingleLotteryPollTabComponent';
import LotteryParticipateUserGraphComponent from '../../Components/LotteryParticipateUserGraphComponent/LotteryParticipateUserGraphComponent';

function EditLotteryPollPage() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();

   const params = useParams();
   const dispatch = useDispatch();
   const timerRef = useRef(null);

   const auth = useSelector(authSelector);
   const singleLotteryPoll = useSelector(singleLotteryPollSelector);
   const singleLotteryPollLoading = useSelector(singleLotteryPollLoadingSelector);
   const singleLotteryPollError = useSelector(singleLotteryPollErrorSelector);

   function updateCountdown(countdownTime) {
      const currentTime = new Date().getTime();
      const remainingTime = new Date(countdownTime).getTime() - currentTime;

      if (remainingTime <= 0) {
         return (timerRef.current.textContent = 'Lottery ended');
         // dispatch(getResultLotteryPoll());
         // return dispatch(getTodayLotteryPoll());
      }

      let hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      let minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      let seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      timerRef.current.textContent = `${hours}h : ${minutes}m : ${seconds}s`;
   }

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?._id && isAdmin) {
         dispatch(getSingleLuckyDrawPoll({ gameId: params?.id }));
      }
   }, [auth, isAdmin]);

   useEffect(() => {
      let interval;
      if (!!singleLotteryPoll && singleLotteryPoll?.success && singleLotteryPoll?.item) {
         interval = setInterval(() => {
            updateCountdown(singleLotteryPoll?.item?.lotteryPollResultTime);
         }, 1000);
      }

      return () => clearInterval(interval);
   }, [singleLotteryPoll]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Edit lottery draw'}
               heading={`Edit lottery draw`}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-4">
               {!!singleLotteryPollLoading && <SpinnerComponent />}
               {!!singleLotteryPollError && <p className="text-sm error_cl">{singleLotteryPollError}</p>}
               {!!singleLotteryPoll && singleLotteryPoll?.success && singleLotteryPoll?.item ? (
                  <Fragment>
                     <div className="gal_div">
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">Game Id</h5>
                           </div>
                           <p className="text-gray-300 font-semibold">{singleLotteryPoll?.item?.gameId}</p>
                        </div>
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">Lottery poll result time</h5>
                           </div>
                           <p className="text-gray-300 font-semibold">
                              {dayjs(singleLotteryPoll?.item?.lotteryPollResultTime).format('MMM DD hh:mm:ss A')}
                           </p>
                        </div>
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">Lottery poll result show</h5>
                           </div>
                           <p className="text-gray-300 font-semibold">
                              {singleLotteryPoll?.item?.lotteryPollResultShow ? 'Yes' : 'No'}
                           </p>
                        </div>
                        <div className="box_div space-x-2">
                           <div className="hd">
                              <h5 className="text-gray-100 font-medium">Lottery poll created time</h5>
                           </div>
                           <p className="text-gray-300 font-semibold">
                              {dayjs(singleLotteryPoll?.item?.createdAt).format('MMM DD hh:mm:ss A')}
                           </p>
                        </div>
                     </div>
                     <div className="pt-5 pb-3">
                        <div className="timer_div">
                           <p ref={timerRef} className="text-gray-400 font-medium text-xl">
                              00h:00m:00s
                           </p>
                        </div>
                     </div>
                     <div className="py-5">
                        <SingleLotteryPollTabComponent />
                     </div>
                     <div className="pb-2">
                        <LotteryParticipateUserGraphComponent />
                     </div>
                     <div className="mb-4 mt-4">
                        <p className="mb-2 text-gray-500 font-medium">Lucky draw result numbers</p>
                        <LotteryPollBallsComponent
                           jackpotBallNumber={singleLotteryPoll?.item?.lotteryPollResult?.jackpotBallNumber}
                           luckyNumbers={singleLotteryPoll?.item?.lotteryPollResult?.luckyNumbers}
                        />
                     </div>
                  </Fragment>
               ) : !singleLotteryPollLoading ? (
                  <p className="text-sm text-gray-300">Lottery poll is not found!</p>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default EditLotteryPollPage;
