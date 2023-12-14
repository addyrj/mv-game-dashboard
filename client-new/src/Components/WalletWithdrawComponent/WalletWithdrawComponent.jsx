import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
   getSelectedCryptoTransactionInfo,
   getSelectedTransactionInfo,
   getUserCryptoWithdrawTransactions,
   getUserFiatWithdrawTransactions,
} from '../../App/Features/Payment/paymentActions';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import * as styled from './WalletWithdrawComponent.style';
import {
   authSelector,
   withdrawTransactionInfoSelector,
   withdrawTransactionLoadingSelector,
   withdrawTransactionErrorSelector,
} from './WalletWithdraw.Selector';
import { useSelector } from 'react-redux';
import TransactionPaginationComponent from '../TransactionPaginationComponent/TransactionPaginationComponent';
import { useDispatch } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import TableComponent from '../TableComponent/TableComponent';
import dayjs from 'dayjs';
import TransactionInfoPopUpComponent from '../TransactionInfoPopUpComponent/TransactionInfoPopUpComponent';
import { AnimatePresence } from 'framer-motion';

const ROW = [
   { name: 'Time' },
   { name: 'Amount' },
   { name: 'Status' },
   { name: 'Transaction type' },
   { name: 'Transaction' },
];

function WalletWithdrawComponent() {
   const dispatch = useDispatch();
   const [ShowInfo, setShowInfo] = useState(false);
   const [SelectedCurrency, setSelectedCurrency] = useState('Fiat');

   const auth = useSelector(authSelector);
   const withdrawTransactionInfo = useSelector(withdrawTransactionInfoSelector);
   const withdrawTransactionLoading = useSelector(
      withdrawTransactionLoadingSelector
   );
   const withdrawTransactionError = useSelector(
      withdrawTransactionErrorSelector
   );

   const fetchFiatTransaction = function (page) {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(
            getUserFiatWithdrawTransactions({
               userId: auth?.user?._id,
               page: page,
            })
         );
      } else {
         toast.error('You have to login first');
      }
   };

   const fetchCryptoTransaction = function (page) {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(
            getUserCryptoWithdrawTransactions({
               page: page,
            })
         );
      } else {
         toast.error('You have to login first');
      }
   };

   const showAndHideHandler = function () {
      setShowInfo(!ShowInfo);
   };

   const getMoreInfo = function (el) {
      showAndHideHandler();
      if (SelectedCurrency === 'Fiat') {
         return dispatch(
            getSelectedTransactionInfo({ transactionId: el?._id })
         );
      }

      dispatch(getSelectedCryptoTransactionInfo({ transactionId: el?._id }));
   };

   return (
      <styled.div>
         <AnimatePresence>
            {ShowInfo && (
               <TransactionInfoPopUpComponent close={showAndHideHandler} />
            )}
         </AnimatePresence>
         {!!withdrawTransactionLoading && <SpennerComponent />}
         <div className="px-4 py-2 mt-2 screen_div">
            {withdrawTransactionError && (
               <p className="text-sm error_cl">{withdrawTransactionError}</p>
            )}
            {!!withdrawTransactionInfo &&
            withdrawTransactionInfo?.success &&
            withdrawTransactionInfo?.transactions.length ? (
               <TableComponent row={ROW}>
                  {withdrawTransactionInfo?.transactions.map((el) => (
                     <tr key={el?._id}>
                        <td>
                           <p>
                              {dayjs(el?.createdAt).format(
                                 'DD MMMM YY h:m:s A'
                              )}
                           </p>
                        </td>
                        <td>
                           <div className="flex items-center space-x-2">
                              <div className="ic_div shadow">
                                 <img src={el?.currencyIcon} alt="" />
                              </div>
                              <p>{el?.amount}</p>
                           </div>
                        </td>
                        <td>
                           <div
                              className={`${el?.status.replaceAll(
                                 ' ',
                                 '-'
                              )} status`}
                           >
                              <p>{el?.status}</p>
                           </div>
                        </td>
                        <td>
                           <p>{el?.transactionType}</p>
                        </td>
                        <td>
                           <p className="info" onClick={() => getMoreInfo(el)}>
                              Click for detail
                           </p>
                        </td>
                     </tr>
                  ))}
               </TableComponent>
            ) : !withdrawTransactionLoading && !withdrawTransactionError ? (
               <div className="center">
                  <NoDataComponent bg={'none'} />
               </div>
            ) : null}
         </div>
         <TransactionPaginationComponent
            totalPages={withdrawTransactionInfo?.totalPages}
            fnFiatAction={fetchFiatTransaction}
            fnCryptoAction={fetchCryptoTransaction}
            selectedCurrency={SelectedCurrency}
            state={setSelectedCurrency}
            loading={withdrawTransactionLoading}
         />
      </styled.div>
   );
}

export default WalletWithdrawComponent;
