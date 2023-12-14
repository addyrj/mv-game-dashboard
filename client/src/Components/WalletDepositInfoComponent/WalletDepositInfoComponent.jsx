import React, { useState } from 'react';
import * as styled from './WalletDepositInfoComponent.style';
import TransactionPaginationComponent from '../TransactionPaginationComponent/TransactionPaginationComponent';
import TableComponent from '../TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
   depositTransactionsSelector,
   depositTransactionsLoadingSelector,
   depositTransactionsErrorSelector,
   userAccountInformationSelector,
} from './WalletDeposit.Selector.js';
import { message } from 'antd';
import {
   getUserCryptoDepositTransactions,
   getUserFiatTransaction,
} from '../../App/Features/userManagement/userManagementActions';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import dayjs from 'dayjs';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import { useParams } from 'react-router';

const ROW = [{ heading: 'Time' }, { heading: 'Amount' }, { heading: 'Status' }];

function WalletDepositInfoComponent() {
   const [SelectedCurrency, setSelectedCurrency] = useState('Fiat');

   const dispatch = useDispatch();
   const param = useParams();

   const depositTransactions = useSelector(depositTransactionsSelector);
   const depositTransactionsLoading = useSelector(depositTransactionsLoadingSelector);
   const depositTransactionsError = useSelector(depositTransactionsErrorSelector);
   const userAccountInformation = useSelector(userAccountInformationSelector);

   const fetchFiatTransaction = function (page) {
      if (!!param && param?.id) {
         dispatch(getUserFiatTransaction({ userId: param?.id, page: page }));
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
            getUserCryptoDepositTransactions({
               userId: userAccountInformation?.data?.item?.userId,
               page: page,
            })
         );
      } else {
         message.error('You have to login first');
      }
   };

   return (
      <div className="tr_div">
         <styled.div>
            <div className="py-2 mt-2 screen_div">
               {depositTransactionsError && <p className="text-sm error_cl">{depositTransactionsError}</p>}
               {depositTransactionsLoading && <SpinnerComponent />}
               {!!depositTransactions && depositTransactions?.success && depositTransactions?.transactions.length ? (
                  <TableComponent row={ROW}>
                     {depositTransactions?.transactions.map((el) => (
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
      </div>
   );
}

export default WalletDepositInfoComponent;
