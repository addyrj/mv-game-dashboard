import React, { useCallback, useEffect, useState } from 'react';
import MoneyDropDownComponent from '../MoneyDropDownComponent/MoneyDropDownComponent';
import * as styled from './FaitDepositComponent.style';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import {
   selectedCurrencyMethodsSelector,
   selectedCurrencyMethodsLoadingSelector,
   selectedCurrencyMethodsErrorSelector,
   authSelector,
   fiatPaymentTransactionLoadingSelector,
   fiatPaymentTransactionErrorSelector,
   selectedCurrencySelector,
   selectedCurrencyErrorSelector,
   walletFiatCurrencyDataSelector,
   walletFiatCurrencyDataLoadingSelector,
   walletFiatCurrencyDataErrorSelector,
} from './FiatDeposit.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { useDispatch } from 'react-redux';
import {
   getSelectedCurrencyPaymentOptions,
   fiatPaymentTransaction,
   getSelectedPaymentFields,
} from '../../App/Features/Payment/paymentActions';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
   selectedCurrencyAmountHandler,
   showAndHideWithdrawPopup,
} from '../../App/Features/Payment/paymentSlice';
import { checkFloatLength } from '../../helper/helper';
import {
   showAndHideInsufficientBlcHandler,
   toggleUserWalletHandler,
} from '../../App/Features/Client/clientSlice';

function FiatDepositComponent({ type }) {
   const [ActivePaymentMethod, setActivePaymentMethod] = useState(null);
   const [SelectedCurrency, setSelectedCurrency] = useState('');
   const [AmountAr, setAmountAr] = useState([]);

   const { control, setValue, getValues } = useForm({
      defaultValues: {
         amount: '',
      },
   });

   const dispatch = useDispatch();

   const selectedCurrencyMethods = useSelector(selectedCurrencyMethodsSelector);
   const selectedCurrencyMethodsLoading = useSelector(
      selectedCurrencyMethodsLoadingSelector
   );
   const selectedCurrencyMethodsError = useSelector(
      selectedCurrencyMethodsErrorSelector
   );
   const auth = useSelector(authSelector);
   const fiatPaymentTransactionLoading = useSelector(
      fiatPaymentTransactionLoadingSelector
   );
   const fiatPaymentTransactionError = useSelector(
      fiatPaymentTransactionErrorSelector
   );
   const selectedCurrency = useSelector(selectedCurrencySelector);
   const selectedCurrencyError = useSelector(selectedCurrencyErrorSelector);
   const walletFiatCurrencyData = useSelector(walletFiatCurrencyDataSelector);
   const walletFiatCurrencyDataLoading = useSelector(
      walletFiatCurrencyDataLoadingSelector
   );
   const walletFiatCurrencyDataError = useSelector(
      walletFiatCurrencyDataErrorSelector
   );

   const withdrawTabHandler = function (value) {
      const currencyItems = walletFiatCurrencyData?.walletCurrency[0]?.wallet;
      if (!currencyItems) {
         return toast.error('Please make transaction after some time.');
      }

      if (!SelectedCurrency) {
         return toast.error('Please first selecte the currency.');
      }

      const selectedCurrecyObject = currencyItems.find(
         (el) => el?._id === SelectedCurrency
      );
      const currencyBalance = +selectedCurrecyObject?.balance;

      const currecyObject = {
         balance: selectedCurrecyObject?.balance,
         currencyId: selectedCurrecyObject?._id,
         paymentMethodsId: value?.paymentMethodId,
      };

      if (currencyBalance <= 1) {
         dispatch(showAndHideInsufficientBlcHandler(true));
         dispatch(toggleUserWalletHandler(false));
      } else {
         setActivePaymentMethod(value);
         dispatch(showAndHideWithdrawPopup(true));
         dispatch(
            getSelectedPaymentFields({
               selectedFiatPayment: value?.paymentMethodId,
            })
         );
         dispatch(selectedCurrencyAmountHandler(currecyObject));
      }
   };

   const tabsHandler = useCallback(
      function (value) {
         setActivePaymentMethod(value);
         const min = +value?.minPayment;
         const max = +value?.maxPayment;
         const midAmount = max / 2;
         const amountGroup = [min, midAmount, max];
         setAmountAr(amountGroup);
      },
      [ActivePaymentMethod]
   );

   const onBlur = function () {
      const amount = getValues('amount');

      const minAmount = +ActivePaymentMethod?.minPayment;
      const maxAmount = +ActivePaymentMethod?.maxPayment;

      if (amount > maxAmount) {
         return setValue('amount', String(maxAmount));
      }

      if (amount < minAmount) {
         return setValue('amount', String(minAmount));
      }

      const floatNumber = checkFloatLength(amount);
      setValue('amount', floatNumber);
   };

   const userPaymentObject = function () {
      const userId = auth?.user?._id;

      if (!userId) {
         return toast.error('You need to login first');
      }

      const amount = Number(getValues('amount'));

      if (!amount) {
         return toast.error('Amount is required');
      }

      const paymentObject = {
         userId,
         selectedCurrency: SelectedCurrency,
         paymentMethod: ActivePaymentMethod,
         amount: getValues('amount'),
         wayName: 'FIAT',
         transactionType: 'deposit',
      };

      return paymentObject;
   };

   const depositSubmitHandler = function () {
      const paymentObject = userPaymentObject();
      dispatch(fiatPaymentTransaction(paymentObject));
   };

   const currencyAmountHandler = function (selectedCurrencyId) {
      setSelectedCurrency(selectedCurrencyId);
      dispatch(
         getSelectedCurrencyPaymentOptions({
            currencyId: selectedCurrencyId,
         })
      );
   };

   const SelectedCurrencyHandler = useCallback(
      function (event) {
         const selectedCurrencyId = event.target.value;
         currencyAmountHandler(selectedCurrencyId);
      },
      [SelectedCurrency]
   );

   useEffect(() => {
      if (
         walletFiatCurrencyData &&
         !!selectedCurrency &&
         selectedCurrency?.success
      ) {
         const { currencyId, currencyType } = selectedCurrency?.currency;

         if (currencyId && currencyType === 'fiatCurrency') {
            setSelectedCurrency(currencyId);
            if (!selectedCurrencyMethods) {
               currencyAmountHandler(currencyId);
            }
         } else {
            const currencyLists =
               walletFiatCurrencyData?.walletCurrency?.[0]?.wallet;

            if (currencyLists) {
               const firstCr = currencyLists[0];
               const crId = firstCr._id;
               setSelectedCurrency(crId);

               if (!selectedCurrencyMethods) {
                  currencyAmountHandler(crId);
               }
            }
         }
      }
   }, [walletFiatCurrencyData, selectedCurrency]);

   return (
      <styled.div>
         <div>
            {walletFiatCurrencyDataLoading && !walletFiatCurrencyDataError && (
               <div className="mt-2">
                  <SpennerComponent />
               </div>
            )}
            {!!walletFiatCurrencyData &&
               walletFiatCurrencyData?.success &&
               walletFiatCurrencyData?.walletCurrency?.length && (
                  <MoneyDropDownComponent
                     currencyList={
                        walletFiatCurrencyData?.walletCurrency[0]?.wallet
                     }
                     onChange={SelectedCurrencyHandler}
                     value={SelectedCurrency}
                  />
               )}
            {!!walletFiatCurrencyDataError ? (
               <p className="text-sm error_cl">{walletFiatCurrencyDataError}</p>
            ) : null}
         </div>
         <div className="payment_method">
            {!!selectedCurrencyMethodsLoading ? <SpennerComponent /> : null}
            {!!selectedCurrencyMethodsError ? (
               <p className="text-sm error_cl">
                  {selectedCurrencyMethodsError}
               </p>
            ) : null}
            {!!selectedCurrencyError && (
               <p className="text-sm error_cl">{selectedCurrencyError}</p>
            )}
            {!!selectedCurrencyMethods &&
            selectedCurrencyMethods?.success &&
            selectedCurrencyMethods?.items &&
            selectedCurrencyMethods?.items.length &&
            selectedCurrencyMethods?.items?.[0]?.paymentMethods ? (
               <div>
                  <p className="text-sm mb-2 text-gray-300">
                     Choose a Payment Method
                  </p>
                  <div className="card_grid space-x-2">
                     {selectedCurrencyMethods?.items?.[0]?.paymentMethods.map(
                        (el) => (
                           <div
                              className={
                                 ActivePaymentMethod?.paymentMethodsId ===
                                 el?._id
                                    ? `active_payment_card payment_card shadow`
                                    : 'payment_card shadow'
                              }
                              key={el?._id}
                              onClick={
                                 type === 'withdraw'
                                    ? () =>
                                         withdrawTabHandler({
                                            paymentMethodId: el?._id,
                                            minPayment: el?.min,
                                            maxPayment: el?.max,
                                         })
                                    : () =>
                                         tabsHandler({
                                            paymentMethodId: el?._id,
                                            minPayment: el?.min,
                                            maxPayment: el?.max,
                                         })
                              }
                           >
                              <LazyLoadImage src={el?.icon} />
                              <div className="text-center">
                                 <p className="text-sm text-gray-400">
                                    {el?.min} - {el?.max}
                                 </p>
                              </div>
                           </div>
                        )
                     )}
                  </div>
               </div>
            ) : null}
         </div>
         {!!ActivePaymentMethod && !type ? (
            <div className="mt-4">
               <Box
                  component="form"
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <Controller
                     name="amount"
                     control={control}
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           label={`${
                              type === 'withdraw' ? 'withdraw' : 'Deposit'
                           } Amount`}
                           variant="outlined"
                           value={value}
                           type="number"
                           onChange={onChange}
                           onBlur={onBlur}
                        />
                     )}
                  />
               </Box>
               {AmountAr && AmountAr?.length && (
                  <div className="btn_group flex items-center space-x-2">
                     {AmountAr.map((el) => (
                        <CustomButtonComponent
                           text={el}
                           key={el}
                           btnCl={'pay_btn active_pay_button'}
                           onClick={() => setValue('amount', String(el))}
                        />
                     ))}
                  </div>
               )}
               <div className="flex item-center justify-center mt-4">
                  <CustomButtonComponent
                     text={'Confirm'}
                     btnCl={'Crypto_btn'}
                     onClick={depositSubmitHandler}
                     isLoading={fiatPaymentTransactionLoading}
                  />
                  {fiatPaymentTransactionError ? (
                     <p className="text-sm error_cl">
                        {fiatPaymentTransactionError}
                     </p>
                  ) : null}
               </div>
            </div>
         ) : null}
      </styled.div>
   );
}

export default FiatDepositComponent;
