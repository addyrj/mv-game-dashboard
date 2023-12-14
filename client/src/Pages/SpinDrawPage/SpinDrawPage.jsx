import React, { useEffect, useState } from 'react';
import * as styled from './SpinDrawPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLuckyDraw } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import useRoles from '../../Hooks/useRoles';
import { luckyDrawsSelector, luckyDrawLoadingSelector } from './SpinDraw.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import { MdModeEdit } from '@react-icons/all-files/md/MdModeEdit';

const ROW = [
   { heading: 'Spin name', id: 1 },
   { heading: 'Created At', id: 2 },
   { heading: 'Options', id: 3 },
];

function SpinDrawPage() {
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [Page, setPage] = useState(0);

   const luckyDraws = useSelector(luckyDrawsSelector);
   const luckyDrawLoading = useSelector(luckyDrawLoadingSelector);

   const createSpinItemsHandler = function () {
      navigation('/create-spin-items');
   };

   const nextPageHandler = function () {};

   const prevPageHandler = function () {};

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllLuckyDraw({ page: Page }));
      }
   }, [isAdmin, Page]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'All spin items'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
               menu={true}
               innerProps={<MenuItem onClick={createSpinItemsHandler}>Create new spin item</MenuItem>}
            />
            {!!luckyDrawLoading && <SpinnerComponent />}
            {!!luckyDraws && luckyDraws?.success && luckyDraws?.item ? (
               <div>
                  <TableComponent
                     row={ROW}
                     nextHandler={nextPageHandler}
                     nextAndPrev={true}
                     prevHandler={prevPageHandler}
                     disablePrevbtn={+Page === 0 ? true : false}
                     disableNextbtn={+Page >= luckyDraws?.totalPages ? true : false}
                  >
                     {luckyDraws?.item.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.spinName}</td>
                           <td>{dayjs(el?.createdAt).format('DD MMM YYYY h:m:s A')}</td>
                           <td>
                              <MdModeEdit
                                 className="cursor-pointer"
                                 onClick={() => navigation(`/spin/edit/${el?._id}`)}
                              />
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               </div>
            ) : (
               !luckyDrawLoading && (
                  <div className="p-2 text-center text-gray-200">
                     <p>No lucky spin draw</p>
                  </div>
               )
            )}
         </div>
      </styled.div>
   );
}

export default SpinDrawPage;
