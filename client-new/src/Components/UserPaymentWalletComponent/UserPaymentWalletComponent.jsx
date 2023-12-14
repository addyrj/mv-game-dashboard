import React from 'react';
import { BiWallet } from '@react-icons/all-files/bi/BiWallet';
import { AnimatePresence } from 'framer-motion';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import PaymentOptionsComponent from '../PaymentOptionsComponent/PaymentOptionsComponent';
import { toggleUserWalletInfoSelector } from './Wallet.Selector';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUserWalletHandler } from '../../App/Features/Client/clientSlice';

function UserPaymentWalletComponent() {
   const dispatch = useDispatch();

   const toggleUserWalletInfo = useSelector(toggleUserWalletInfoSelector);

   const showAndHidePaymentOptions = function () {
      dispatch(toggleUserWalletHandler(!toggleUserWalletInfo));
   };

   return (
      <div>
         <div className="d-none d-xl-block" onClick={showAndHidePaymentOptions}>
            <CustomButtonComponent btnCl={'Wallet_button'} isLoading={false}>
               <BiWallet />
               <p>Wallet</p>
            </CustomButtonComponent>
         </div>
         <AnimatePresence>
            {!!toggleUserWalletInfo ? (
               <PaymentOptionsComponent close={showAndHidePaymentOptions} />
            ) : null}
         </AnimatePresence>
      </div>
   );
}

export default UserPaymentWalletComponent;
