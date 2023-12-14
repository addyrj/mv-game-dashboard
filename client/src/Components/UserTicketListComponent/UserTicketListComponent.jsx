import React, { useEffect } from 'react';
import * as styled from './UserTicketListComponent.style';
import LotteryTicketBallsComponent from '../LotteryTicketBallsComponent copy/LotteryTicketBallsComponent';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { singleLotteryPollSelector } from './UserTicketList.Selector';
import { useSelector } from 'react-redux';

function UserTicketListComponent({ user, lotteryPollNumbers, isUsed, numberOfTickets, price, refundTicket, createdAt, _id }) {
   const { setValue, control, getValues } = useForm({
      defaultValues: {
         lotteryNumbers: {},
         matches: [],
      },
   });

   const singleLotteryPoll = useSelector(singleLotteryPollSelector);

   useEffect(() => {
      const { luckyNumbers, jackpotBallNumber } = lotteryPollNumbers;

      const luckyNumbersObject = {};

      for (let i = 0; i < luckyNumbers.length; i++) {
         luckyNumbersObject[i + 1] = luckyNumbers[i];
      }

      if (!!jackpotBallNumber) {
         luckyNumbersObject['6'] = jackpotBallNumber;
      }

      setValue('lotteryNumbers', luckyNumbersObject);
      const lotteryPollResult = singleLotteryPoll?.item?.lotteryPollResult;

      if (!!lotteryPollResult && lotteryPollResult?.luckyNumbers && !!luckyNumbers && luckyNumbers?.length) {
         const matchesAr = [];

         for (let i = 0; i < luckyNumbers.length; i++) {
            const indexOf = lotteryPollResult?.luckyNumbers.indexOf(luckyNumbers[i]);

            if (indexOf >= 0) {
               matchesAr.push(luckyNumbers[i]);
            }
         }

         if (jackpotBallNumber === lotteryPollResult?.jackpotBallNumber) {
            matchesAr.push(lotteryPollResult?.jackpotBallNumber);
         }

         setValue('matches', matchesAr);
      }
   }, []);

   return (
      <styled.tr>
         <td>
            <div className="user_div shadow">
               <img src={user?.avatar} alt="" />
            </div>
         </td>
         <td>
            <p className="font-semibold">{user?.name}</p>
         </td>
         <td>
            <div className="flex items-center space-x-2">
               <Controller
                  name="lotteryNumbers"
                  control={control}
                  render={({ field: { value } }) => (
                     <div className="flex items-center text-gray-900">
                        <LotteryTicketBallsComponent show={getValues('matches')} numbers={value} uniqueKey={_id} />
                     </div>
                  )}
               />
               {!!refundTicket ? (
                  <div className="ic">
                     <img src="/images/refund-ticket.svg" alt="" />
                  </div>
               ) : null}
            </div>
         </td>
         <td>
            <p className="ont-semibold">x{numberOfTickets}</p>
         </td>
         <td>
            <p>{price}</p>
         </td>
         <td>
            <p>{isUsed ? 'Yes' : 'No'}</p>
         </td>
         <td>
            <p>{refundTicket ? 'Yes' : 'No'}</p>
         </td>
         <td>{dayjs(createdAt).format('MMMM DD YYYY h:m:s A')}</td>
      </styled.tr>
   );
}

export default UserTicketListComponent;
