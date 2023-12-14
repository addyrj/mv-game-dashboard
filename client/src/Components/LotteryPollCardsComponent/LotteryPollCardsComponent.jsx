import React from 'react';
import LotteryCardComponent from '../../Components/LotteryCardComponent/LotteryCardComponent';
import * as styled from './LotteryPoll.style';
import {
   allLotteryPollSelector,
   allLotteryPollLoadingSelector,
   allLotteryPollErrorSelector,
   loadMoreLotteryPollTicketsSelector,
} from './LotteryPoll.Selector';
import { useSelector, useDispatch } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { getAllLotteryPoll } from '../../App/Features/LuckyDraw/LuckyDrawActions';

function LotteryPollCardsComponent() {
   const dispatch = useDispatch();

   const allLotteryPoll = useSelector(allLotteryPollSelector);
   const allLotteryPollLoading = useSelector(allLotteryPollLoadingSelector);
   const allLotteryPollError = useSelector(allLotteryPollErrorSelector);
   const loadMoreLotteryPollTickets = useSelector(loadMoreLotteryPollTicketsSelector);

   const loadMoreHandler = function (page) {
      dispatch(getAllLotteryPoll({ page: page + 1 }));
   };

   return (
      <styled.div>
         {!!allLotteryPollLoading && <SpinnerComponent />}
         {!!allLotteryPollError && <p className="text-sm error_cl">{allLotteryPollError}</p>}
         {!!allLotteryPoll && allLotteryPoll?.success && allLotteryPoll?.items && !!allLotteryPoll?.items.length ? (
            <div>
               <div className="lottery_Card_div mt-5">
                  {allLotteryPoll?.items.map((el) => (
                     <LotteryCardComponent data={el} key={el?._id} />
                  ))}
               </div>
               {!!allLotteryPoll?.totalPages && allLotteryPoll?.page < allLotteryPoll?.totalPages ? (
                  <div className="load_more_div flex items-center justify-center mt-4">
                     <CustomButtonComponent
                        text={'Load More'}
                        btnCl={'Crypto_btn'}
                        onClick={() => loadMoreHandler(allLotteryPoll?.page)}
                        isLoading={loadMoreLotteryPollTickets}
                     />
                  </div>
               ) : null}
            </div>
         ) : (
            <div className="text-center mt-4">
               <p className="text-sm text-gray-300">No lottery poll is live.</p>
            </div>
         )}
      </styled.div>
   );
}

export default LotteryPollCardsComponent;
