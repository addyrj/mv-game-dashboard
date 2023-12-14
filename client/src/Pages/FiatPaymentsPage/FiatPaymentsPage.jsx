import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import * as styled from './FiatPaymentsPage.style';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFiatDepositTransactions } from '../../App/Features/Payment/paymentActions';
import {
   fiatTransactionsSelector,
   fiatTransactionsLoadingSelector,
   fiatTransactionsErrorSelector,
} from './FiatPayment.Selector';
import useRoles from '../../Hooks/useRoles';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import { BiShowAlt } from '@react-icons/all-files/bi/BiShowAlt';
import { useNavigate } from 'react-router';

const ROW = [
   { heading: 'status', id: 1 },
   { heading: 'wayName', id: 2 },
   { heading: 'orderId', id: 3 },
   { heading: 'createdAt', id: 4 },
   { heading: 'amount', id: 5 },
   { heading: 'options', id: 6 },
];

function FiatPaymentsPage() {
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [Page, setPage] = useState(0);
   const navigation = useNavigate();

   const fiatTransactions = useSelector(fiatTransactionsSelector);
   const fiatTransactionsLoading = useSelector(fiatTransactionsLoadingSelector);
   const fiatTransactionsError = useSelector(fiatTransactionsErrorSelector);

   const NextPageHandler = function () {
      setPage((prev) => prev + 1);
   };

   const PrevPageHandler = function () {
      setPage((prev) => prev - 1);
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllFiatDepositTransactions({ page: Page }));
      }
   }, [isAdmin, Page]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Fiat payments'}
               subHeading={'All users fiat payments'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-5">
               {fiatTransactionsError && <p className="text-sm error_cl">{fiatTransactionsError}</p>}
               {fiatTransactionsLoading && <SpinnerComponent />}
               {!!fiatTransactions && fiatTransactions?.success && fiatTransactions?.transactions ? (
                  <TableComponent
                     row={ROW}
                     nextHandler={NextPageHandler}
                     nextAndPrev={true}
                     prevHandler={PrevPageHandler}
                     disablePrevbtn={Page === 0 ? true : false}
                     disableNextbtn={Page >= fiatTransactions?.totalPages ? true : false}
                     tableWidth={1200}
                  >
                     {fiatTransactions?.transactions.map((el) => (
                        <tr key={el?._id}>
                           <td>
                              <div className={`status ${el?.status.replaceAll(' ', '-')}`}>
                                 <p>{el?.status}</p>
                              </div>
                           </td>
                           <td>{el?.wayName}</td>
                           <td>{el?.orderId}</td>
                           <td>{dayjs(el?.createdAt).format('DD MMMM YY h:m:s A')}</td>
                           <td>{el?.amount}</td>
                           <td>
                              <div className="flex items-center justify-center">
                                 <BiShowAlt
                                    className="cursor-pointer"
                                    onClick={() => {
                                       navigation(`/order/${el?.orderId}`);
                                    }}
                                 />
                              </div>
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default FiatPaymentsPage;
