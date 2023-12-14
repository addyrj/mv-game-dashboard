import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFiatWithdrawTransaction } from '../../App/Features/Payment/paymentActions';
import {
   fiatWithdrawTransactionSelector,
   fiatWithdrawTransactionLoadingSelector,
   fiatWithdrawTransactionErrorSelector,
} from './FiatWithdraw.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import { AiOutlineInfoCircle } from '@react-icons/all-files/ai/AiOutlineInfoCircle';
import { useNavigate } from 'react-router';

const ROW = [
   { heading: 'name', id: 1 },
   { heading: 'avatar', id: 2 },
   { heading: 'userId', id: 3 },
   { heading: 'Status', id: 4 },
   { heading: 'Way name', id: 5 },
   { heading: 'Order id', id: 6 },
   { heading: 'Transaction type', id: 7 },
   { heading: 'Amount', id: 8 },
   { heading: 'Options', id: 9 },
];

function FiatWithdrawTransactionPage() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();
   const [Page, setPage] = useState(0);
   const navigation = useNavigate();

   const fiatWithdrawTransaction = useSelector(fiatWithdrawTransactionSelector);
   const fiatWithdrawTransactionLoading = useSelector(fiatWithdrawTransactionLoadingSelector);
   const fiatWithdrawTransactionError = useSelector(fiatWithdrawTransactionErrorSelector);

   const NextPageHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   const PrevPageHandler = function () {
      setPage((prevState) => prevState - 1);
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllFiatWithdrawTransaction({ page: Page }));
      }
   }, [isAdmin, Page]);

   return (
      <div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               heading={`Fiat withdraw transaction`}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-5">
               {fiatWithdrawTransactionLoading && <SpinnerComponent />}
               {fiatWithdrawTransactionError && <p className="text-sm error_cl">{fiatWithdrawTransactionError}</p>}
               {!!fiatWithdrawTransaction &&
               fiatWithdrawTransaction?.success &&
               fiatWithdrawTransaction?.transactions &&
               fiatWithdrawTransaction?.transactions.length ? (
                  <TableComponent
                     row={ROW}
                     nextHandler={NextPageHandler}
                     nextAndPrev={true}
                     prevHandler={PrevPageHandler}
                     disablePrevbtn={Page === 0 ? true : false}
                     disableNextbtn={Page >= fiatWithdrawTransaction?.totalPages ? true : false}
                     tableWidth={1500}
                  >
                     {fiatWithdrawTransaction?.transactions.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.name}</td>
                           <td>
                              <div className="pr_div shadow">
                                 <img src={el?.avatar} />
                              </div>
                           </td>
                           <td>{el?.userId}</td>
                           <td>
                              <div className={`status ${el?.status.replaceAll(' ', '-')}`}>
                                 <p>{el?.status}</p>
                              </div>
                           </td>
                           <td>{el?.wayName}</td>
                           <td>{el?.orderId}</td>
                           <td>{el?.transactionType}</td>
                           <td>{el?.amount}</td>
                           <td>
                              <AiOutlineInfoCircle
                                 className=" cursor-pointer text-gray-300"
                                 onClick={() => {
                                    navigation(`/order/${el?.orderId}`);
                                 }}
                              />
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : (
                  <p className="text-center text-gray-400">No withdraw transaction</p>
               )}
            </div>
         </div>
      </div>
   );
}

export default FiatWithdrawTransactionPage;
