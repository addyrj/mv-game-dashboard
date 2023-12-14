import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import * as styled from './MoneyWithdraw.Style';
import {
   getUserAllCryptoCurrency,
   getUserAllFiatCurrency,
} from '../../App/Features/Payment/paymentActions';
import {
   authSelector,
   walletFiatCurrencyDataSelector,
   userCryptoCurrencyListSelector,
   fiatPaymentWithDrawPopupSelector,
} from './MoneyWithdraw.Selector';
import FiatDepositComponent from '../FiatDepositComponent/FiatDepositComponent';
import WithdrawFiatAmountPopupComponent from '../WithdrawFiatAmountPopupComponent/WithdrawFiatAmountPopupComponent';
import { AnimatePresence } from 'framer-motion';
import DepositCryptoQRComponent from '../DepositCryptoQRComponent/DepositCryptoQRComponent';
import { useMediaQuery } from 'react-responsive';

const ButtonArray = [
   { name: 'Crypto', id: 3 },
   { name: 'Fiat', id: 4 },
];

function MoneyWithdrawComponent() {
   const [ActiveTab, setActiveTab] = useState('Crypto');
   const dispatch = useDispatch();
   const isMobile = useMediaQuery({ query: '(max-width: 540px)' });

   const auth = useSelector(authSelector);
   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const fiatPaymentWithDrawPopup = useSelector(
      fiatPaymentWithDrawPopupSelector
   );
   const walletFiatCurrencyData = useSelector(walletFiatCurrencyDataSelector);

   const ActiveTabHandler = function (value) {
      setActiveTab(value);
   };

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?.userId) {
         if (ActiveTab === 'Crypto' && !userCryptoCurrencyList) {
            dispatch(getUserAllCryptoCurrency({ userId: auth?.user?.userId }));
         }

         if (ActiveTab === 'Fiat' && !walletFiatCurrencyData) {
            dispatch(getUserAllFiatCurrency({ userId: auth?.user?._id }));
         }
      }
   }, [ActiveTab]);

   return (
      <styled.div>
         <AnimatePresence>
            {fiatPaymentWithDrawPopup && <WithdrawFiatAmountPopupComponent />}
         </AnimatePresence>
         <div className="flex items-center justify-center space-x-2">
            {ButtonArray.map((el) => (
               <CustomButtonComponent
                  key={el?.id}
                  text={el?.name}
                  btnCl={`money_btn dm_btn ${
                     ActiveTab === el?.name ? 'dm_btn_active' : 'non_active'
                  }`}
                  onClick={() => ActiveTabHandler(el?.name)}
                  width={isMobile && '100%'}
               />
            ))}
         </div>
         <div className="tab_div">
            <div
               className={
                  ActiveTab === 'Crypto'
                     ? 'crpto_qr_div mt-3 w-full'
                     : 'crpto_qr_div non_active_tab'
               }
            >
               <DepositCryptoQRComponent type={'withdraw'} />
            </div>
            <div
               className={
                  ActiveTab === 'Fiat' ? 'fiat_div active_tab' : 'fiat_div'
               }
            >
               <FiatDepositComponent type={'withdraw'} />
            </div>
         </div>
      </styled.div>
   );
}

export default MoneyWithdrawComponent;
