import React, { useState } from 'react';
import * as styled from './WalletDepositInfoComponent.style';
import TransactionPaginationComponent from '../TransactionPaginationComponent/TransactionPaginationComponent';
import TableComponent from '../TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
   authSelector,
   depositTransactionsSelector,
   depositTransactionsLoadingSelector,
   depositTransactionsErrorSelector,
   // showTransactionInfoSelector,
} from './WalletDeposit.Selector.js';
import toast from 'react-hot-toast';
import {
   getSelectedCryptoTransactionInfo,
   getSelectedTransactionInfo,
   getUserCryptoDepositTransactions,
   getUserFiatTransaction,
} from '../../App/Features/Payment/paymentActions';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import dayjs from 'dayjs';
import TransactionInfoPopUpComponent from '../TransactionInfoPopUpComponent/TransactionInfoPopUpComponent';
import { AnimatePresence, motion } from 'framer-motion';
import NoDataComponent from '../NoDataComponent/NoDataComponent';

const ROW = [
   { name: 'Time' },
   { name: 'Amount' },
   { name: 'Status' },
   { name: 'Transaction' },
];

function WalletDepositInfoComponent() {
   const dispatch = useDispatch();
   const [ShowInfo, setShowInfo] = useState(false);
   const [SelectedCurrency, setSelectedCurrency] = useState('Fiat');

   const auth = useSelector(authSelector);
   const depositTransactions = useSelector(depositTransactionsSelector);
   const depositTransactionsLoading = useSelector(
      depositTransactionsLoadingSelector
   );
   const depositTransactionsError = useSelector(
      depositTransactionsErrorSelector
   );

   const fetchFiatTransaction = function (page) {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(
            getUserFiatTransaction({ userId: auth?.user?._id, page: page })
         );
      } else {
         toast.error('You have to login first');
      }
   };

   const fetchCryptoTransaction = function (page) {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(
            getUserCryptoDepositTransactions({
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

   const selectedTransactionHandler = function (transactionId) {
      dispatch(getSelectedTransactionInfo({ transactionId }));
   };

   const getMoreInfo = function (el) {
      showAndHideHandler();
      if (SelectedCurrency === 'Fiat') {
         return selectedTransactionHandler(el?._id);
      }

      dispatch(getSelectedCryptoTransactionInfo({ transactionId: el?._id }));
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 1 }}
         exit={{ opacity: 0, y: -20 }}
         className="tr_div"
      >
         <styled.div>
            <AnimatePresence>
               {ShowInfo && (
                  <TransactionInfoPopUpComponent close={showAndHideHandler} />
               )}
            </AnimatePresence>
            <div className="px-4 py-2 mt-2 screen_div">
               {depositTransactionsError && (
                  <p className="text-sm error_cl">{depositTransactionsError}</p>
               )}
               {depositTransactionsLoading && <SpennerComponent />}
               {!!depositTransactions &&
               depositTransactions?.success &&
               depositTransactions?.transactions.length ? (
                  <TableComponent row={ROW}>
                     {depositTransactions?.transactions.map((el) => (
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
                              <p
                                 className="info"
                                 onClick={() => getMoreInfo(el)}
                              >
                                 Click for detail
                              </p>
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : !depositTransactionsError && !depositTransactionsLoading ? (
                  <div className="center">
                     <NoDataComponent bg={'none'} />
                  </div>
               ) : null}
            </div>
            <TransactionPaginationComponent
               totalPages={depositTransactions?.totalPages}
               fnFiatAction={fetchFiatTransaction}
               fnCryptoAction={fetchCryptoTransaction}
               selectedCurrency={SelectedCurrency}
               state={setSelectedCurrency}
               loading={depositTransactionsLoading}
            />
         </styled.div>
      </motion.div>
   );
}

export default WalletDepositInfoComponent;
