import React, { useEffect, useState } from 'react';
import * as styled from './LotteryPollUsersListComponent.style';
import {
   singleLotteryPollUsersSelector,
   singleLotteryPollUsersLoadingSelector,
   singleLotteryPollUsersErrorSelector,
} from './LotteryPoll.Selector';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import UserTicketListComponent from '../UserTicketListComponent/UserTicketListComponent';
import TableComponent from '../TableComponent/TableComponent';
import useRoles from '../../Hooks/useRoles';
import { useParams } from 'react-router';
import { getSingleLotteryDrawUsersList } from '../../App/Features/LuckyDraw/LuckyDrawActions';

const ROW = [
   { heading: 'Avatar' },
   { heading: 'Name' },
   { heading: 'Tickets' },
   { heading: 'Numbers of tickets' },
   { heading: 'Price' },
   { heading: 'Is used' },
   { heading: 'Is refund ticket' },
   { heading: 'Created at' },
];

function LotteryPollUsersListComponent({ filter }) {
   const [Page, setPage] = useState(0);

   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const params = useParams();
   const dispatch = useDispatch();

   const id = params?.id;

   const singleLotteryPollUsers = useSelector(singleLotteryPollUsersSelector);
   const singleLotteryPollUsersLoading = useSelector(singleLotteryPollUsersLoadingSelector);
   const singleLotteryPollUsersError = useSelector(singleLotteryPollUsersErrorSelector);

   const nextPageHandler = function () {
      setPage((prev) => prev + 1);
   };

   const prevPageHandler = function () {
      setPage((prev) => prev - 1);
   };

   useEffect(() => {
      if (!!isAdmin && id) {
         dispatch(
            getSingleLotteryDrawUsersList({
               gameId: id,
               filter: filter,
               page: Page,
            })
         );
      }
   }, [isAdmin, Page]);

   return (
      <styled.div>
         {!!singleLotteryPollUsersLoading && (
            <div className="w-full h-full flex items-center justify-center p-5">
               <SpinnerComponent />
            </div>
         )}
         {!!singleLotteryPollUsersError && <p className="text-sm error_cl">{singleLotteryPollUsersError}</p>}

         {!!singleLotteryPollUsers &&
         singleLotteryPollUsers?.success &&
         singleLotteryPollUsers?.item &&
         singleLotteryPollUsers?.item?.lotteryPollData?.length ? (
            <TableComponent
               row={ROW}
               nextHandler={nextPageHandler}
               nextAndPrev={true}
               prevHandler={prevPageHandler}
               disablePrevbtn={Page === 0 ? true : false}
               disableNextbtn={Page >= singleLotteryPollUsers?.totalPages ? true : false}
               tableWidth={1400}
            >
               {singleLotteryPollUsers?.item?.lotteryPollData.map((el, idx) => (
                  <UserTicketListComponent
                     key={el?.items?._id}
                     user={el?.user}
                     lotteryPollNumbers={el?.items?.lotteryPollNumbers}
                     isUsed={el?.items?.isUsed}
                     numberOfTickets={el?.items?.numberOfTickets}
                     price={el?.items?.price}
                     refundTicket={el?.items?.refundTicket}
                     _id={el?.items?._id}
                     createdAt={el?.items?.createdAt}
                  />
               ))}
            </TableComponent>
         ) : (
            <div className="text-center w-full">
               <p className="text-gray-400 text-sm">No tickets placed</p>
            </div>
         )}
      </styled.div>
   );
}

export default LotteryPollUsersListComponent;
