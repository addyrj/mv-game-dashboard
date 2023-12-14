import React, { useEffect, useState } from 'react';
import * as styled from './SupportApprovalPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { getQueryUsersLists, updatedUserQuery } from '../../App/Features/LiveSupport/liveSupportActions';
import {
   authSelector,
   allQueryUserListsSelector,
   allQueryUserListsLoadingSelector,
   allQueryUserListsErrorSelector,
   showReasonPopupSelector,
} from './Support.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import RejectionReasonPopUpComponent from '../../Components/RejectionReasonPopUpComponent/RejectionReasonPopUpComponent';
import { AnimatePresence } from 'framer-motion';
import { selectedQueryHandler, showAndHideReasonPopup } from '../../App/Features/LiveSupport/liveSupportSlice';

const ROW = [
   { heading: 'Name' },
   { heading: 'Avatar' },
   { heading: 'User id' },
   { heading: 'Is assigned' },
   { heading: 'Is approved' },
   { heading: 'Rejected by' },
   { heading: 'Rejected by user id' },
   { heading: 'Rejected by user avatar' },
   { heading: 'Approved by' },
   { heading: 'Approved by user id' },
   { heading: 'Approved by user avatar' },
   { heading: 'Options' },
];

function SupportApprovalPage() {
   const {
      userRoles: { isAdmin, isSupport },
   } = useRoles();
   const [page, setPage] = useState(0);
   const dispatch = useDispatch();

   const allQueryUserLists = useSelector(allQueryUserListsSelector);
   const allQueryUserListsLoading = useSelector(allQueryUserListsLoadingSelector);
   const allQueryUserListsError = useSelector(allQueryUserListsErrorSelector);
   const showReasonPopup = useSelector(showReasonPopupSelector);
   const auth = useSelector(authSelector);

   const nextPageHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   const prevPageHandler = function () {
      setPage((prevState) => prevState - 1);
   };

   const approvedHandler = function (queryId) {
      const { _id } = auth?.user;
      dispatch(updatedUserQuery({ queryId, approvedBy: _id }));
   };

   const rejectedHandler = function (queryId) {
      dispatch(showAndHideReasonPopup(true));
      dispatch(selectedQueryHandler(queryId));
   };

   useEffect(() => {
      if (isAdmin || isSupport) {
         dispatch(getQueryUsersLists({ page }));
      }
   }, [isAdmin, isSupport]);

   return (
      <styled.div>
         <AnimatePresence>{!!showReasonPopup && <RejectionReasonPopUpComponent />}</AnimatePresence>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Query users lists'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div>
               {!!allQueryUserListsLoading && <SpinnerComponent />}
               {!!allQueryUserListsError && <p className="text-sm error_cl">{allQueryUserListsError}</p>}
               {!!allQueryUserLists &&
               allQueryUserLists?.success &&
               !!allQueryUserLists?.items &&
               allQueryUserLists?.items.length ? (
                  <TableComponent
                     row={ROW}
                     nextHandler={nextPageHandler}
                     nextAndPrev={true}
                     prevHandler={prevPageHandler}
                     disablePrevbtn={+page === 0 ? true : false}
                     disableNextbtn={+page >= allQueryUserLists?.totalPages ? true : false}
                     tableWidth={1700}
                  >
                     {allQueryUserLists?.items.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.user?.name}</td>
                           <td>
                              <div className="user_profile_div">
                                 <img src={el?.user?.avatar} alt="" />
                              </div>
                           </td>
                           <td>{el?.user?.userId}</td>
                           <td>{el?.isAssigned ? 'Yes' : 'No'}</td>
                           <td>{el?.isApproved ? 'Yes' : 'No'}</td>
                           <td>{el?.rejectedBy?.name}</td>
                           <td>{el?.rejectedBy?.userId}</td>
                           <td>
                              {el?.rejectedBy && (
                                 <div className="user_profile_div">
                                    <img src={el?.rejectedBy?.avatar} alt="" />
                                 </div>
                              )}
                           </td>
                           <td>{el?.approvedBy?.name}</td>
                           <td>{el?.approvedBy?.userId}</td>
                           <td>
                              <div className="user_profile_div">
                                 {el?.approvedBy && <img src={el?.approvedBy?.avatar} alt="" />}
                              </div>
                           </td>
                           <td>
                              {el?.isRejected ? (
                                 <CustomButtonComponent text={'Already Rejected'} btnCl={'rejected round'} />
                              ) : el?.isApproved ? (
                                 <CustomButtonComponent text={'Already Approved'} btnCl={'rejected round'} />
                              ) : (
                                 <div className="flex items-center space-x-3">
                                    <CustomButtonComponent
                                       onClick={() => approvedHandler(el?.user?._id)}
                                       text={'Approved'}
                                       btnCl={'approved round'}
                                    />
                                    <CustomButtonComponent
                                       onClick={() => rejectedHandler(el?.user?._id)}
                                       text={'Rejected'}
                                       btnCl={'rejected round'}
                                    />
                                 </div>
                              )}
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : (
                  !allQueryUserListsLoading && (
                     <div className="text-center">
                        <p className="text-gray-200">No documents</p>
                     </div>
                  )
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default SupportApprovalPage;
