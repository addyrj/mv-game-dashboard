import React from 'react';
import * as styled from './AlertPopupComponent.style';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
   showAndHideInsufficientBlcHandler,
   toggleUserWalletHandler,
} from '../../App/Features/Client/clientSlice';

function AlertPopupComponent({ heading }) {
   const dispatch = useDispatch();

   const CloseHandler = function () {
      dispatch(showAndHideInsufficientBlcHandler(false));
   };

   const ShowAndHidePaymentOptions = function () {
      dispatch(toggleUserWalletHandler(true));
      dispatch(showAndHideInsufficientBlcHandler(false));
   };

   return (
      <styled.div>
         <motion.div
            className="main_div sm_shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
               duration: 0.2,
            }}
         >
            <div className="triangle-top" />
            <div className="text-center">
               <CgClose
                  className="cls_btn text-gray-300"
                  onClick={CloseHandler}
               />
               <div>{heading}</div>
            </div>
            <div className="flex items-center justify-center mt-2">
               <CustomButtonComponent
                  text={'Deposit'}
                  btnCl={'tab_button_active px-5 mt-2'}
                  onClick={ShowAndHidePaymentOptions}
               />
            </div>
         </motion.div>
      </styled.div>
   );
}

export default AlertPopupComponent;
