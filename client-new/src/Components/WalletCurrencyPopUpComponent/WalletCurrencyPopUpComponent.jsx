import React, { useEffect, useState } from 'react';
import * as styled from './WalletCurrencyPopUpComponent.Style';
import { Box } from '@mui/system';
import { Fragment } from 'react';
// import SearchBarComponent from '../SearchBarComponent/SearchBarComponent';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { AnimatePresence, motion } from 'framer-motion';
import FiatCurrencyListComponent from '../FiatCurrencyListComponent/FiatCurrencyListComponent';
import CryptoCurrencyListComponent from '../CryptoCurrencyListComponent/CryptoCurrencyListComponent';
import {
   getUserAllFiatCurrency,
   getUserAllCryptoCurrency,
} from '../../App/Features/Payment/paymentActions';
import { useDispatch, useSelector } from 'react-redux';
import {
   walletFiatCurrencyDataSelector,
   walletFiatCurrencyDataLoadingSelector,
   walletFiatCurrencyDataErrorSelector,
   userCryptoCurrencyListSelector,
   authSelector,
   selectedCurrencySelector,
   selectedCurrencyErrorSelector,
} from './WalletCurrency.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';

// const sty = { border: 'none', width: '100%' };

const ButtonArray = [
   { name: 'Crypto', id: 1 },
   { name: 'Fiat', id: 2 },
];

const MotionDivCm = function ({ children }) {
   return (
      <motion.div
         initial={{ opacity: 0.1, y: 40 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
            duration: 0.3,
            damping: 200,
         }}
      >
         {children}
      </motion.div>
   );
};

const WalletCurrencyPopup = () => {
   const [ActiveTab, setActiveTab] = useState('Fiat');
   const dispatch = useDispatch();

   const walletFiatCurrencyData = useSelector(walletFiatCurrencyDataSelector);
   const walletFiatCurrencyDataLoading = useSelector(
      walletFiatCurrencyDataLoadingSelector
   );
   const walletFiatCurrencyDataError = useSelector(
      walletFiatCurrencyDataErrorSelector
   );
   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const auth = useSelector(authSelector);
   const selectedCurrency = useSelector(selectedCurrencySelector);
   const selectedCurrencyError = useSelector(selectedCurrencyErrorSelector);

   const ActiveButtonHandler = function (value) {
      if (ActiveTab !== value) {
         setActiveTab(value);
      }
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

   useEffect(() => {
      const { currencyType } = selectedCurrency?.currency;

      if (currencyType) {
         if (currencyType === 'CryptoCurrency') setActiveTab('Crypto');
         if (currencyType === 'fiatCurrency') setActiveTab('Fiat');
      }
   }, []);

   return (
      <Fragment>
         <styled.MainDiv className="main_parent">
            {!!selectedCurrencyError && (
               <p className="text-sm error_cl">{selectedCurrencyError}</p>
            )}
            {/* <styled.Div>
               <SearchBarComponent sty={sty} cl={'in_'} />
            </styled.Div> */}
            <Box className="tabtopParent" sx={{ px: 2 }}>
               <styled.buttonDiv>
                  {ButtonArray.map((el) => (
                     <CustomButtonComponent
                        text={el?.name}
                        key={el?.id}
                        btnCl={
                           ActiveTab === el?.name
                              ? `tab_button tab_button_active`
                              : 'tab_button'
                        }
                        width={'100%'}
                        onClick={() => ActiveButtonHandler(el?.name)}
                     />
                  ))}
               </styled.buttonDiv>
               <styled.currencyDiv>
                  <AnimatePresence>
                     {!!ActiveTab && ActiveTab === 'Crypto' ? (
                        <MotionDivCm>
                           <CryptoCurrencyListComponent />
                        </MotionDivCm>
                     ) : null}
                  </AnimatePresence>
                  {walletFiatCurrencyDataLoading ? (
                     <SpennerComponent />
                  ) : (
                     <AnimatePresence>
                        {!!ActiveTab && ActiveTab === 'Fiat' ? (
                           <MotionDivCm>
                              {!!walletFiatCurrencyDataError ? (
                                 <p className="text-sm error_cl">
                                    {walletFiatCurrencyDataError}
                                 </p>
                              ) : null}

                              <FiatCurrencyListComponent
                                 data={walletFiatCurrencyData}
                              />
                           </MotionDivCm>
                        ) : null}
                     </AnimatePresence>
                  )}
               </styled.currencyDiv>
            </Box>
         </styled.MainDiv>
      </Fragment>
   );
};

export default WalletCurrencyPopup;
