import React from 'react';
import * as styled from './TransactionProcessPopup.style';
import ReactDOM from 'react-dom';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { showAndHidePaymentTransactionPopup } from '../../App/Features/Payment/paymentSlice';

function TransactionProcessPopup() {
   const dispatch = useDispatch();

   const closeHandler = function () {
      dispatch(showAndHidePaymentTransactionPopup(false));
   };

   return ReactDOM.createPortal(
      <styled.div>
         <div className="over_lay_div" onClick={closeHandler} />
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="pv_div text-center"
         >
            <CgClose className="text-gray-400 cl_btn" onClick={closeHandler} />
            <p className="text-gray-300 text-sm font-medium mt-4 mb-3">
               To check the result of deposit, please go to{' '}
               <span className="text-green-500">Transaction</span> panel. Feel
               free to contact our customer service.
            </p>
            <CustomButtonComponent
               text="OK"
               btnCl={'large_btn mt-5'}
               onClick={closeHandler}
            />
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default TransactionProcessPopup;
