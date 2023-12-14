import React from 'react';
import * as styled from './WithdrawFiatAmountPopupComponent.style';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { showAndHideWithdrawPopup } from '../../App/Features/Payment/paymentSlice';
import { motion } from 'framer-motion';
import {
   selectedPaymentFieldsSelector,
   selectedPaymentFieldsLoadingSelector,
   selectedPaymentFieldsErrorSelector,
   authSelector,
   fiatTransactionsWithdrawErrorSelector,
   fiatTransactionsWithdrawLoadingSelector,
   selectedCurrencyWithAmountSelector,
} from './WithdrawFiatAmount.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { camelCase, checkFloatLength } from '../../helper/helper';
import toast from 'react-hot-toast';
import { makeUserFiatWithdrawTransaction } from '../../App/Features/Payment/paymentActions';

const minAmount = 100;

function WithdrawFiatAmountPopupComponent() {
   const {
      control,
      formState: { errors },
      handleSubmit,
      getValues,
      setValue,
   } = useForm({
      defaultValues: {
         amount: '',
      },
   });
   const dispatch = useDispatch();

   const selectedPaymentFields = useSelector(selectedPaymentFieldsSelector);
   const selectedPaymentFieldsLoading = useSelector(
      selectedPaymentFieldsLoadingSelector
   );
   const selectedPaymentFieldsError = useSelector(
      selectedPaymentFieldsErrorSelector
   );
   const auth = useSelector(authSelector);
   const fiatTransactionsWithdrawError = useSelector(
      fiatTransactionsWithdrawErrorSelector
   );
   const fiatTransactionsWithdrawLoading = useSelector(
      fiatTransactionsWithdrawLoadingSelector
   );
   const selectedCurrencyWithAmount = useSelector(
      selectedCurrencyWithAmountSelector
   );

   const closeHandler = function () {
      dispatch(showAndHideWithdrawPopup(false));
   };

   const onBlur = function () {
      const amount = getValues('amount');
      if (amount < minAmount) {
         return setValue('amount', String(minAmount));
      }

      const floatNumber = checkFloatLength(amount);
      setValue('amount', floatNumber);
   };

   const onSubmit = function (data) {
      const userId = auth?.user?._id;

      if (!userId) {
         return toast.error('you have to login first');
      }

      const currencyId = selectedCurrencyWithAmount?.currencyId;

      if (!currencyId) {
         return toast.error(
            'Please first selecte currency and then make transaction.'
         );
      }
      const userCurrencyBalance = +selectedCurrencyWithAmount?.balance;
      const amount = +getValues('amount');

      if (amount > userCurrencyBalance) {
         return toast.error("You don't have enough money to withdraw");
      }

      const paymentObject = {
         withdrawInformation: { ...data },
         transactionType: 'withdraw',
         userId,
         currencyId: selectedCurrencyWithAmount?.currencyId,
         paymentMethodId: selectedCurrencyWithAmount?.paymentMethodsId,
      };

      dispatch(makeUserFiatWithdrawTransaction(paymentObject));
   };

   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
               duration: 0.3,
            }}
            className="am_pop_up"
         >
            <ModelHeaderComponent
               heading={`Fiat Withdraw`}
               backIcon={false}
               back={closeHandler}
            />
            <div className="p-3">
               {selectedPaymentFieldsLoading && <SpennerComponent />}
               {selectedPaymentFieldsError && (
                  <p className="text-sm error_cl">
                     {selectedPaymentFieldsError}
                  </p>
               )}
               {!!selectedPaymentFields &&
               selectedPaymentFields?.success &&
               !!selectedPaymentFields?.items &&
               selectedPaymentFields?.items.length ? (
                  <div>
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                           sx={{
                              '& > :not(style)': { my: 1, width: '100%' },
                           }}
                        >
                           {selectedPaymentFields?.items.map((el) => (
                              <Controller
                                 key={el?.labelKey}
                                 name={camelCase(el?.label)}
                                 control={control}
                                 render={({ field: { onChange, value } }) => (
                                    <TextField
                                       required
                                       label={el?.label}
                                       value={value || ''}
                                       onChange={onChange}
                                       variant="outlined"
                                       type={el?.fieldType}
                                    />
                                 )}
                              />
                           ))}
                           <Controller
                              name="amount"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    label="Amount"
                                    value={value}
                                    onChange={onChange}
                                    variant="outlined"
                                    type={'number'}
                                    required
                                    onBlur={onBlur}
                                 />
                              )}
                           />
                           <p className="text-sm text-gray-400">
                              Amount min - ({minAmount})
                           </p>
                           {!!errors && errors?.amount?.message ? (
                              <p className="error_cl text-sm">
                                 {errors?.amount?.message}
                              </p>
                           ) : null}
                        </Box>
                        <div className="flex items-center justify-center py-2">
                           <CustomButtonComponent
                              text={'Confirm'}
                              btnCl={'Crypto_btn'}
                              type={'submit'}
                              isLoading={fiatTransactionsWithdrawLoading}
                           />
                           {fiatTransactionsWithdrawError ? (
                              <p className="text-sm error_cl">
                                 {fiatTransactionsWithdrawError}
                              </p>
                           ) : null}
                        </div>
                     </form>
                  </div>
               ) : null}
            </div>
         </motion.div>
      </styled.div>,
      document.getElementById('withdraw')
   );
}

export default WithdrawFiatAmountPopupComponent;
