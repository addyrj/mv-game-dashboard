import React, { useState } from 'react';
import {
   getSelectedCryptoTransactionInfo,
   getUserCryptoWithdrawTransactions,
   getUserFiatWithdrawTransactions,
} from '../../App/Features/userManagement/userManagementActions';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import * as styled from './WalletWithdrawComponent.style';
import {
   withdrawTransactionInfoSelector,
   withdrawTransactionLoadingSelector,
   withdrawTransactionErrorSelector,
   userAccountInformationSelector,
} from './WalletWithdraw.Selector';
import { useSelector } from 'react-redux';
import TransactionPaginationComponent from '../TransactionPaginationComponent/TransactionPaginationComponent';
import { useDispatch } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import TableComponent from '../TableComponent/TableComponent';
import dayjs from 'dayjs';
import { message } from 'antd';
import { useParams } from 'react-router';

const ROW = [{ heading: 'Time' }, { heading: 'Amount' }, { heading: 'Status' }, { heading: 'Transaction type' }];

function WalletWithdrawComponent() {
   const [SelectedCurrency, setSelectedCurrency] = useState('Fiat');

   const withdrawTransactionInfo = useSelector(withdrawTransactionInfoSelector);
   const withdrawTransactionLoading = useSelector(withdrawTransactionLoadingSelector);
   const withdrawTransactionError = useSelector(withdrawTransactionErrorSelector);
   const userAccountInformation = useSelector(userAccountInformationSelector);

   const dispatch = useDispatch();
   const param = useParams();

   const fetchFiatTransaction = function (page) {
      if (!!param && param?.id) {
         dispatch(
            getUserFiatWithdrawTransactions({
               userId: param?.id,
               page: page,
            })
         );
      } else {
         message.error('You have to login first');
      }
   };

   const fetchCryptoTransaction = function (page) {
      if (
         !!param &&
         param?.id &&
         !!userAccountInformation &&
         userAccountInformation?.success &&
         userAccountInformation?.data &&
         userAccountInformation?.data?.item
      ) {
         dispatch(
            getUserCryptoWithdrawTransactions({
               userId: userAccountInformation?.data?.item?.userId,
               page: page,
            })
         );
      } else {
         message.error('You have to login first');
      }
   };

   return (
      <styled.div>
         {!!withdrawTransactionLoading && <SpinnerComponent />}
         <div className="px-4 py-2 mt-2 screen_div">
            {withdrawTransactionError && <p className="text-sm error_cl">{withdrawTransactionError}</p>}
            {!!withdrawTransactionInfo && withdrawTransactionInfo?.success && withdrawTransactionInfo?.transactions.length ? (
               <TableComponent row={ROW}>
                  {withdrawTransactionInfo?.transactions.map((el) => (
                     <tr key={el?._id}>
                        <td>
                           <p>{dayjs(el?.createdAt).format('DD MMMM YY h:m:s A')}</p>
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
                           <div className={`${el?.status.replaceAll(' ', '-')} status`}>
                              <p>{el?.status}</p>
                           </div>
                        </td>
                        <td>
                           <p>{el?.transactionType}</p>
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
