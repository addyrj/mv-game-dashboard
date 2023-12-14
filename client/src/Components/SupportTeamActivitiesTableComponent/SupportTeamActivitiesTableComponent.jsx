import React, { useEffect, useState } from 'react';
import * as styled from './SupportTeamActivitiesTableComponent.style';
import TableComponent from '../TableComponent/TableComponent';
import useRoles from '../../Hooks/useRoles';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

function SupportTeamActivitiesTableComponent({ row, action, filter, items, totalPages, loading }) {
   const [page, setPage] = useState(0);
   const {
      userRoles: { isAdmin, isSubAdmin },
   } = useRoles();
   const param = useParams();
   const dispatch = useDispatch();

   const nextPageHandler = function () {
      setPage((prv) => prv + 1);
   };

   const prevPageHandler = function () {
      setPage((prv) => prv - 1);
   };

   useEffect(() => {
      if (!!param && param?.id) {
         if (isAdmin | isSubAdmin) {
            dispatch(action({ filter, page: page, supportTeamUserId: param?.id }));
         }
      }
   }, [isAdmin, isSubAdmin, param, page]);

   return (
      <styled.div>
         {!!items && items?.length ? (
            <TableComponent
               row={row}
               nextHandler={nextPageHandler}
               nextAndPrev={true}
               prevHandler={prevPageHandler}
               disablePrevbtn={page === 0 ? true : false}
               disableNextbtn={page >= totalPages ? true : false}
            >
               {items?.map((el) => (
                  <tr key={el?._id}>
                     <td>{el?.name}</td>
                     <td>
                        <div className="profile_div">
                           <img src={el?.avatar} alt="" />
                        </div>
                     </td>
                     <td>{el?.userId}</td>
                  </tr>
               ))}
            </TableComponent>
         ) : (
            !loading && (
               <div>
                  <p className="text-gray-200">No data</p>
               </div>
            )
         )}
      </styled.div>
   );
}

export default SupportTeamActivitiesTableComponent;
