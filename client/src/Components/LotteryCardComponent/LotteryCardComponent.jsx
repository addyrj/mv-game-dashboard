import React, { useEffect } from 'react';
import * as styled from './LotteryCardComponent.style';
import dayjs from 'dayjs';
import LotteryTicketBallsComponent from '../LotteryTicketBallsComponent/LotteryTicketBallsComponent';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';

function LotteryCardComponent({ data }) {
   const { setValue, control } = useForm({
      defaultValues: {
         lotteryNumbers: {},
      },
   });

   const navigation = useNavigate();

   const linkHandler = function () {
      navigation(`/lottery-draw/edit/${data?._id}`);
   };

   useEffect(() => {
      if (!!data) {
         const {
            lotteryPollResult: { luckyNumbers, jackpotBallNumber },
         } = data;
         const luckyNumbersObject = {};

         for (let i = 0; i < luckyNumbers.length; i++) {
            luckyNumbersObject[i + 1] = luckyNumbers[i];
         }

         if (!!jackpotBallNumber) {
            luckyNumbersObject['6'] = jackpotBallNumber;
         }

         setValue('lotteryNumbers', luckyNumbersObject);
      }
   }, [data]);

   return (
      <styled.div>
         <div className="coupon shadow">
            <div className="edit_div">
               <FiEdit className="text-gray-200" onClick={linkHandler} />
            </div>
            {/* <div className="left">
               <div>Today poll</div>
            </div> */}
            <div className="center">
               <div>
                  <h2>{data?.gameId}</h2>
                  <h3>Game id</h3>
                  <small>
                     Valid until{' '}
                     {dayjs(data?.lotteryPollResultTime).format(
                        'MMM DD hh:mm:ss A'
                     )}
                  </small>
                  <div>
                     {!!data?.lotteryPollResultShow ? (
                        <small>Lottery poll is expire</small>
                     ) : (
                        <p>Today lottery poll</p>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <div className="flex items-center justify-center mt-2">
            <Controller
               name="lotteryNumbers"
               control={control}
               render={({ field: { value } }) => (
                  <LotteryTicketBallsComponent
                     show={[1, 2, 3, 4, 5, 6]}
                     numbers={value}
                  />
               )}
            />
         </div>
      </styled.div>
   );
}

export default LotteryCardComponent;
