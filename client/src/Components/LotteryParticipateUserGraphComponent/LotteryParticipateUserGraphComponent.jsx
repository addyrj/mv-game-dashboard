import React, { useEffect } from 'react';
import * as styled from './LotteryParticipateUserGraphComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import {
   getUserTicketJackpotNumbersCount,
   getUserTicketLuckyNumbersCount,
} from '../../App/Features/LuckyDraw/LuckyDrawActions';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import {
   userLuckyNumbersSelector,
   userLuckyNumbersLoadingSelector,
   userLuckyNumbersErrorSelector,
   userJackpotNumbersSelector,
   userJackpotNumbersLoadingSelector,
   userJackpotNumbersErrorSelector,
} from './LotteryPoll.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import BarChartComponent from '../BarChartComponent/BarChartComponent';

function LotteryParticipateUserGraphComponent() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();

   const dispatch = useDispatch();
   const param = useParams();
   const id = param?.id;

   const userLuckyNumbers = useSelector(userLuckyNumbersSelector);
   const userLuckyNumbersLoading = useSelector(userLuckyNumbersLoadingSelector);
   const userLuckyNumbersError = useSelector(userLuckyNumbersErrorSelector);
   const userJackpotNumbers = useSelector(userJackpotNumbersSelector);
   const userJackpotNumbersLoading = useSelector(userJackpotNumbersLoadingSelector);
   const userJackpotNumbersError = useSelector(userJackpotNumbersErrorSelector);

   useEffect(() => {
      if (!!isAdmin) {
         dispatch(getUserTicketLuckyNumbersCount({ gameId: id }));
         dispatch(getUserTicketJackpotNumbersCount({ gameId: id }));
      }
   }, [isAdmin]);

   return (
      <styled.div>
         <div className="flex w-full h-full items-center">
            <div className="w-full h-full">
               {!!userLuckyNumbersLoading && (
                  <div className="flex items-center justify-center p-2 w-full">
                     <SpinnerComponent />
                  </div>
               )}
               {!!userLuckyNumbersError && <p className="text-sm error_cl">{userLuckyNumbersError}</p>}
               {!!userLuckyNumbers && userLuckyNumbers?.success && userLuckyNumbers?.items && (
                  <BarChartComponent data={userLuckyNumbers?.items} label={'User lucky numbers with count'} />
               )}
            </div>
            <div className="w-full h-full">
               {!!userJackpotNumbersLoading && (
                  <div className="flex items-center justify-center p-2 w-full">
                     <SpinnerComponent />
                  </div>
               )}
               {!!userJackpotNumbersError && <p className="text-sm error_cl">{userJackpotNumbersError}</p>}
               {!!userJackpotNumbers && userJackpotNumbers?.success && userJackpotNumbers?.items && (
                  <BarChartComponent data={userJackpotNumbers?.items} label={'User lucky jackpot numbers with count'} />
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default LotteryParticipateUserGraphComponent;
