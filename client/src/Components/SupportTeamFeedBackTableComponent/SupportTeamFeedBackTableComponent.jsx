import React, { useEffect, useState } from 'react';
import * as styled from './SupportTeamFeedBackTableComponent.style';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSupportTeamFeedbacks } from '../../App/Features/LiveSupport/liveSupportActions';
import {
   supportTeamFeedBacksSelector,
   supportTeamFeedBacksLoadingSelector,
   supportTeamFeedBacksErrorSelector,
} from './SupportTeamFeedBackTableComponent.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import TableComponent from '../TableComponent/TableComponent';
import { RiChatSmile3Line } from '@react-icons/all-files/ri/RiChatSmile3Line';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';

const Row = [
   { heading: 'Name' },
   { heading: 'Avatar' },
   { heading: 'User id' },
   { heading: 'Feed back' },
   { heading: 'Options' },
];

function SupportTeamFeedBackTableComponent() {
   const {
      userRoles: { isAdmin, isSubAdmin },
   } = useRoles();
   const dispatch = useDispatch();
   const param = useParams();
   const [page, setPage] = useState(0);
   const navigation = useNavigate();

   const supportTeamFeedBacks = useSelector(supportTeamFeedBacksSelector);
   const supportTeamFeedBacksLoading = useSelector(supportTeamFeedBacksLoadingSelector);
   const supportTeamFeedBacksError = useSelector(supportTeamFeedBacksErrorSelector);

   const nextPageHandler = function () {
      setPage((prev) => prev + 1);
   };

   const prevPageHandler = function () {
      setPage((prev) => prev - 1);
   };

   useEffect(() => {
      if (isAdmin || isSubAdmin) {
         dispatch(getSupportTeamFeedbacks({ supportTeamUserId: param?.id, page: 0 }));
      }
   }, [isAdmin, isSubAdmin]);

   return (
      <styled.div>
         <p className="text-gray-300 font-medium text-xl">Feed backs</p>
         {!!supportTeamFeedBacksLoading && <SpinnerComponent />}
         {!!supportTeamFeedBacksError && <p className="text-sm error_cl">{supportTeamFeedBacksError}</p>}
         {!!supportTeamFeedBacks &&
         supportTeamFeedBacks?.success &&
         supportTeamFeedBacks?.items &&
         supportTeamFeedBacks?.items.length ? (
            <TableComponent
               row={Row}
               nextHandler={nextPageHandler}
               nextAndPrev={true}
               prevHandler={prevPageHandler}
               disablePrevbtn={page === 0 ? true : false}
               disableNextbtn={page >= supportTeamFeedBacks?.totalPages ? true : false}
            >
               {supportTeamFeedBacks?.items.map((el) => (
                  <tr key={el?._id}>
                     <td>{el?.name}</td>
                     <td>
                        <div className="pr_div">
                           <img src={el?.avatar} alt="" />
                        </div>
                     </td>
                     <td>{el?.userId}</td>
                     <td>
                        <div className="flex">
                           <div className={el?.feedBack}>
                              <p>{el?.feedBack}</p>
                           </div>
                        </div>
                     </td>
                     <td>
                        <Tooltip title="Show chats">
                           <IconButton onClick={() => navigation(`/support/team/feedback/${el?._id}`)}>
                              <RiChatSmile3Line className="cursor-pointer" />
                           </IconButton>
                        </Tooltip>
                     </td>
                  </tr>
               ))}
            </TableComponent>
         ) : (
            !supportTeamFeedBacksLoading && <p className="text-gray-200">No Data</p>
         )}
      </styled.div>
   );
}

export default SupportTeamFeedBackTableComponent;
