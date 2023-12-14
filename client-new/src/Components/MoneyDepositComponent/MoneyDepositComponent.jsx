import React, { useEffect, useState } from 'react';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import DepositCryptoQRComponent from '../DepositCryptoQRComponent/DepositCryptoQRComponent';
import * as styled from './MoneyDepositComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import {
   getUserAllCryptoCurrency,
   getUserAllFiatCurrency,
} from '../../App/Features/Payment/paymentActions';
import {
   userCryptoCurrencyListSelector,
   authSelector,
   walletFiatCurrencyDataSelector,
} from './MoneyDeposit.Selector';
import FiatDepositComponent from '../FiatDepositComponent/FiatDepositComponent';
import { useMediaQuery } from 'react-responsive';

const ButtonArray = [
   { name: 'Crypto', id: 3 },
   { name: 'Fiat', id: 4 },
];

function MoneyDepositComponent() {
   const [ActiveTab, setActiveTab] = useState('Crypto');
   const dispatch = useDispatch();
   const isMobile = useMediaQuery({ query: '(max-width: 540px)' });

   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const auth = useSelector(authSelector);
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
         <div className="flex items-center justify-center space-x-2">
            {ButtonArray.map((el) => (
               <CustomButtonComponent
                  key={el?.id}
                  text={el?.name}
                  btnCl={`money_btn dm_btn ${
                     ActiveTab === el?.name
                        ? 'dm_btn_active shadow'
                        : 'non_active'
                  }`}
                  width={isMobile && '100%'}
                  onClick={() => ActiveTabHandler(el?.name)}
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
               <DepositCryptoQRComponent />
            </div>
            <div
               className={
                  ActiveTab === 'Fiat' ? 'fiat_div active_tab' : 'fiat_div'
               }
            >
               <FiatDepositComponent />
            </div>
         </div>
      </styled.div>
   );
}

export default MoneyDepositComponent;
