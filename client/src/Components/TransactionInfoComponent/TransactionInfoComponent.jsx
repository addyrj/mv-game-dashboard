import React, { Fragment } from 'react';
import * as styled from './TransactionInfoComponent.style';
import ReactDOM from 'react-dom';
import { VscChromeClose } from '@react-icons/all-files/vsc/VscChromeClose';
import { motion } from 'framer-motion';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useSelector } from 'react-redux';
import {
   selectedTransactionSelector,
   selectedTransactionLoadingSelector,
   selectedTransactionErrorSelector,
} from './Transaction.Selector';
import dayjs from 'dayjs';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';

function TransactionInfoComponent({ close }) {
   const selectedTransaction = useSelector(selectedTransactionSelector);
   const selectedTransactionLoading = useSelector(selectedTransactionLoadingSelector);
   const selectedTransactionError = useSelector(selectedTransactionErrorSelector);

   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
               transaction: 0.2,
            }}
            className="info_div"
         >
            <div className="cl_btn" onClick={close}>
               <VscChromeClose className="text-gray-400" />
            </div>
            <styled.statusDiv className="mt-4">
               {selectedTransactionError && <p className="text-sm error_cl">{selectedTransactionError}</p>}
               {selectedTransactionLoading && <SpinnerComponent />}
               {!!selectedTransaction && selectedTransaction?.success && selectedTransaction?.transaction && (
                  <Fragment>
                     <div className="box">
                        <div className="_left">
                           <p>Status</p>
                        </div>
                        <div className="_right">
                           <p className="st">{selectedTransaction?.transaction?.status}</p>
                        </div>
                     </div>
                     {!!selectedTransaction?.transaction?.orderId && (
                        <div className="box">
                           <div className="_left">
                              <p>Order ID</p>
                           </div>
                           <div className="_right">
                              <p>{selectedTransaction?.transaction?.orderId}</p>
                           </div>
                        </div>
                     )}
                     {!!selectedTransaction?.transaction?.transactionHash && (
                        <div className="box">
                           <div className="_left">
                              <p>Transaction hash</p>
                           </div>
                           <div className="_right">
                              {selectedTransaction?.transaction?.transactionUrl ? (
                                 <a
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    href={selectedTransaction?.transaction?.transactionUrl}
                                    className="text-gray-300 text-sm"
                                 >
                                    {selectedTransaction?.transaction?.transactionHash}
                                 </a>
                              ) : (
                                 <p>{selectedTransaction?.transaction?.transactionHash}</p>
                              )}
                           </div>
                        </div>
                     )}
                     {!!selectedTransaction?.transaction?.wayName && (
                        <div className="box">
                           <div className="_left">
                              <p>Way name</p>
                           </div>
                           <div className="_right">
                              <p>{selectedTransaction?.transaction?.wayName}</p>
                           </div>
                        </div>
                     )}
                     {!!selectedTransaction?.transaction?.network && (
                        <div className="box">
                           <div className="_left">
                              <p>Network</p>
                           </div>
                           <div className="_right">
                              <p>{selectedTransaction?.transaction?.network}</p>
                           </div>
                        </div>
                     )}
                     <div className="box">
                        <div className="_left">
                           <p>Currency</p>
                        </div>
                        <div className="_right flex items-center space-x-3">
                           <p>{selectedTransaction?.transaction?.currencyName}</p>
                           <div className="in_Div">
                              <img src={selectedTransaction?.transaction?.currencyIcon} alt="" />
                           </div>
                        </div>
                     </div>
                     <div className="box">
                        <div className="_left">
                           <p>Amount</p>
                        </div>
                        <div className="_right">
                           <p>{selectedTransaction?.transaction?.amount}</p>
                        </div>
                     </div>
                     <div className="box">
                        <div className="_left">
                           <p>Time</p>
                        </div>
                        <div className="_right">
                           <p>{dayjs(selectedTransaction?.transaction?.createdAt).format('DD MMMM YY h:m:s A')}</p>
                        </div>
                     </div>
                     <CustomButtonComponent onClick={close} text={'Done'} btnCl={'large_btn py-3 mt-3'} />
                  </Fragment>
               )}
            </styled.statusDiv>
         </motion.div>
      </styled.div>,
      document.getElementById('inbox')
   );
}

export default TransactionInfoComponent;
