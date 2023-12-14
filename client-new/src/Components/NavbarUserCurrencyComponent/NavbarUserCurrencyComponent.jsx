import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { showAndHideCurrencyDropDown } from '../../App/Features/Payment/paymentSlice';
import WalletCurrencyPopup from '../WalletCurrencyPopUpComponent/WalletCurrencyPopUpComponent';
import * as styled from './NavbarUserCurrencyComponent.style';
import {
   showPaymentCurrencyDropDownSelector,
   gameSelectedCurrencySelector,
   gameSelectedCurrencyLoadingSelector,
   gameSelectedCurrencyErrorSelector,
   authSelector,
   InsufficientBlanceAlertSelector,
   showPaymentTransactionProcessSelector,
   showTransactionInfoSelector,
   moneyUpdateAnimationSelector,
   selectedCurrencySelector,
   // selectedCurrencyLoadingSelector,
   selectedCurrencyErrorSelector,
} from './Currency.Selector';
import { useSelector, useDispatch } from 'react-redux';
import { GoChevronDown } from '@react-icons/all-files/go/GoChevronDown';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   getUserSelectedCuryptoCr,
   getUserSelectedGameCurrency,
} from '../../App/Features/Payment/paymentActions';
import AlertPopupComponent from '../AlertPopupComponent/AlertPopupComponent';
import TransactionProcessPopup from '../TransactionProcessPopup/TransactionProcessPopup';
import WalletTransactionPopupComponent from '../WalletTransactionPopupComponent/WalletTransactionPopupComponent';

function NavbarUserCurrencyComponent() {
   const dispatch = useDispatch();

   const showPaymentCurrencyDropDown = useSelector(
      showPaymentCurrencyDropDownSelector
   );
   const gameSelectedCurrency = useSelector(gameSelectedCurrencySelector);
   const gameSelectedCurrencyLoading = useSelector(
      gameSelectedCurrencyLoadingSelector
   );
   const gameSelectedCurrencyError = useSelector(
      gameSelectedCurrencyErrorSelector
   );
   const auth = useSelector(authSelector);
   const InsufficientBlanceAlert = useSelector(InsufficientBlanceAlertSelector);
   const showPaymentTransactionProcess = useSelector(
      showPaymentTransactionProcessSelector
   );
   const showTransactionInfo = useSelector(showTransactionInfoSelector);
   const moneyUpdateAnimation = useSelector(moneyUpdateAnimationSelector);
   const selectedCurrency = useSelector(selectedCurrencySelector);
   const selectedCurrencyError = useSelector(selectedCurrencyErrorSelector);

   const togglePopUpHandler = () => {
      dispatch(showAndHideCurrencyDropDown(!showPaymentCurrencyDropDown));
   };

   const fetchSelectedCurrencyHandler = function (userId) {
      const { currencyType, currencyId, crSymbol } = selectedCurrency?.currency;

      if (!!currencyType && currencyType === 'fiatCurrency') {
         return dispatch(
            getUserSelectedGameCurrency({
               userId: auth?.user?._id,
               currencyId,
            })
         );
      }

      if (!!currencyType && currencyType === 'CryptoCurrency') {
         return dispatch(
            getUserSelectedCuryptoCr({
               userId: userId,
               currencyName: crSymbol,
            })
         );
      }

      dispatch(getUserSelectedGameCurrency({ userId: auth?.user?._id }));
   };

   useEffect(() => {
      if (
         auth &&
         auth?.user &&
         auth?.user?._id &&
         !!selectedCurrency &&
         selectedCurrency?.success
      ) {
         const userId = auth?.user?.userId;
         fetchSelectedCurrencyHandler(userId);
      }
   }, [auth, selectedCurrency?.success]);

   return (
      <styled.div>
         {!!gameSelectedCurrencyLoading && <SpennerComponent />}
         {gameSelectedCurrencyError && (
            <p className="error_cl text-sm">{gameSelectedCurrencyError}</p>
         )}
         {!!selectedCurrencyError && (
            <p className="error_cl text-sm">{selectedCurrencyError}</p>
         )}
         {!!gameSelectedCurrency && (
            <div className="pay_options_card_div">
               <div
                  className="flex cursor-pointer"
                  onClick={togglePopUpHandler}
               >
                  <div className="pay_icon_div">
                     <img src={gameSelectedCurrency?.currency?.icon} alt="" />
                  </div>
                  <div className="ms-2">
                     <p className="text-gray-200">
                        {gameSelectedCurrency?.currency?.currencyName}
                     </p>
                     <div className="flex items-center sub_text">
                        <p className="text-gray-400">
                           <strong className="mb-0">
                              {gameSelectedCurrency?.currency?.balance}
                           </strong>
                        </p>
                     </div>
                  </div>
                  <GoChevronDown className="text-gray-300" />
               </div>
               <AnimatePresence>
                  {!!InsufficientBlanceAlert && (
                     <AlertPopupComponent
                        heading={
                           <p className="text-gray-300 font-medium">
                              Insufficient{' '}
                              <span className="text-green-400">
                                 INRFIAT balance
                              </span>
                              . Make a deposit to keep the fun going!
                           </p>
                        }
                     />
                  )}
               </AnimatePresence>
               <AnimatePresence>
                  {!!moneyUpdateAnimation &&
                     moneyUpdateAnimation?.show &&
                     moneyUpdateAnimation?.status === 'add' && (
                        <styled.addMoneyDiv />
                     )}
               </AnimatePresence>
            </div>
         )}
         <AnimatePresence>
            {showPaymentCurrencyDropDown ? (
               <div>
                  <div className="over_lay_div" onClick={togglePopUpHandler} />
                  <motion.div
                     initial={{ opacity: 0, y: 100 }}
                     animate={{ opacity: 1, y: 10 }}
                     exit={{ opacity: 0, y: 30 }}
                     transition={{
                        duration: 0.2,
                     }}
                     className="slider_upper_div"
                  >
                     <WalletCurrencyPopup />
                  </motion.div>
               </div>
            ) : null}
         </AnimatePresence>
         <AnimatePresence>
            {showPaymentTransactionProcess && <TransactionProcessPopup />}
         </AnimatePresence>
         <AnimatePresence>
            {showTransactionInfo && <WalletTransactionPopupComponent />}
         </AnimatePresence>
      </styled.div>
   );
}

export default NavbarUserCurrencyComponent;
