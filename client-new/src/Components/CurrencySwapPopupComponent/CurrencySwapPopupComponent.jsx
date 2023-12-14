import React, { useEffect } from 'react';
import * as styled from './CurrencySwapPopupComponent.style';
import ReactDOM from 'react-dom';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
   showAndHideInsufficientBlcHandler,
   showAndHideSwapPopupHandler,
} from '../../App/Features/Client/clientSlice';
import {
   userCryptoCurrencyListSelector,
   userCryptoCurrencyListLoadingSelector,
   userCryptoCurrencyListErrorSelector,
   authSelector,
} from './Swap.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { getUserAllCryptoCurrency } from '../../App/Features/Payment/paymentActions';
import MoneyDropDownComponent from '../MoneyDropDownComponent/MoneyDropDownComponent';
import { MdSwapCalls } from '@react-icons/all-files/md/MdSwapCalls';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { toast } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

function CurrencySwapPopupComponent() {
   const dispatch = useDispatch();
   const { getValues, control, setValue } = useForm({
      defaultValues: {
         price: '0.0000',
         isSwap: false,
         from: '',
         to: '',
         CryptoCr: [],
         VCurreny: [],
         fromPrice: '',
         toPrice: '',
      },
   });

   const auth = useSelector(authSelector);
   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const userCryptoCurrencyListLoading = useSelector(
      userCryptoCurrencyListLoadingSelector
   );
   const userCryptoCurrencyListError = useSelector(
      userCryptoCurrencyListErrorSelector
   );

   const close = function () {
      dispatch(showAndHideSwapPopupHandler(false));
   };

   const swapHandler = function () {
      const isSwapValue = getValues('isSwap');
      setValue('isSwap', !isSwapValue);

      const from = getValues('from');
      const to = getValues('to');
      const cryptoCr = getValues('CryptoCr');
      const vCurreny = getValues('VCurreny');
      let findCurrency = vCurreny.find((el) => el?.symbol === to);
      const findConvertToCurrency = cryptoCr.find((el) => el?.symbol === from);

      setValue('CryptoCr', vCurreny);
      setValue('VCurreny', cryptoCr);
      setValue('from', to);
      setValue('to', from);
      setValue('fromPrice', findCurrency.balance);
      setValue('toPrice', findConvertToCurrency?.balance);
   };

   const currencySelectedHandler = function (event, type) {
      if (auth && !!auth?.user && auth?.user?.userId) {
         const { value } = event.target;
         const cryptoCr = getValues('CryptoCr');
         const isSwapValue = getValues('isSwap');
         const vCurreny = getValues('VCurreny');
         let findCurrencyObject;

         setValue('CryptoCr', cryptoCr);
         setValue('from', value);

         if (!isSwapValue) {
            findCurrencyObject = cryptoCr.find((el) => el?.symbol === value);
         } else {
            findCurrencyObject = vCurreny.find((el) => el?.symbol === value);
         }

         setValue('fromPrice', findCurrencyObject?.balance);
         setValue('price', 0);
      }
   };

   const submitHandler = function () {
      return toast.error('This feature in under process');

      if (auth && !!auth?.user && auth?.user?.userId) {
         const priceValue = +getValues('price');
         const cryptoCr = getValues('CryptoCr');
         const from = getValues('from');
         const to = getValues('to');

         const findCurrencyObject = cryptoCr.find((el) => el?.symbol === from);

         if (priceValue <= 0) {
            return toast.error('Please select currency price grater then 0');
         }

         if (+findCurrencyObject?.balance < priceValue) {
            dispatch(showAndHideSwapPopupHandler(false));
            return dispatch(showAndHideInsufficientBlcHandler(true));
         }

         const selectedObject = {
            userId: auth?.user?.userId,
            price: priceValue,
            from,
            to,
         };

         //  console.log(selectedObject);
      } else {
         toast.error('need to login first');
      }
   };

   const inputCurrencyChangeHandler = function (event, onChange) {
      onChange(event);
      const fromPrice = +getValues('fromPrice');
      const toPrice = +getValues('toPrice');
      const price = +getValues('price');

      //   console.log(fromPrice - price);

      if (!price) {
         const from = getValues('from');
         const to = getValues('to');
         const cryptoCr = getValues('CryptoCr');
         const vCurreny = getValues('VCurreny');

         const findCryptoCurrency = cryptoCr.find((el) => el?.symbol === from);
         let findVCurrency = vCurreny.find((el) => el?.symbol === to);

         setValue('fromPrice', findCryptoCurrency?.balance);
         setValue('toPrice', findVCurrency?.balance);
      } else {
         let conversionPrice = 1; // let convert price is
         const convertPrice = price * conversionPrice;
         const fromWithConvertPrice = fromPrice - price;
         const toWithConvertPrice = toPrice + convertPrice;

         //  setValue('fromPrice', fromWithConvertPrice);
         //  setValue('toPrice', toWithConvertPrice);
      }
   };

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?.userId) {
         if (!userCryptoCurrencyList) {
            dispatch(getUserAllCryptoCurrency({ userId: auth?.user?.userId }));
         }
      }
   }, [auth]);

   useEffect(() => {
      if (
         userCryptoCurrencyList &&
         userCryptoCurrencyList?.data &&
         userCryptoCurrencyList?.data.length &&
         !!auth?.user &&
         auth?.user?.userId
      ) {
         const lotteryCurrencys = userCryptoCurrencyList?.data.filter(
            (el) => el?.lotteryCurrency
         );
         const cryptoCurrency = userCryptoCurrencyList?.data.filter(
            (el) => !el?.lotteryCurrency
         );

         setValue('CryptoCr', cryptoCurrency);
         setValue('VCurreny', lotteryCurrencys);
         setValue('from', cryptoCurrency?.[0].symbol);
         setValue('to', lotteryCurrencys?.[0].symbol);
         setValue('fromPrice', cryptoCurrency?.[0].balance);
         setValue('toPrice', lotteryCurrencys?.[0].balance);
      }
   }, [userCryptoCurrencyList]);

   return ReactDOM.createPortal(
      <styled.div>
         <div className="overFlow" onClick={close}></div>
         <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="main_div"
         >
            <ModelHeaderComponent
               heading={'MV swap'}
               backIcon={false}
               back={close}
            />
            {!!userCryptoCurrencyListLoading && <SpennerComponent />}
            {!!userCryptoCurrencyListError && (
               <p className="text-sm error_cl">{userCryptoCurrencyListError}</p>
            )}
            {!!userCryptoCurrencyList &&
               userCryptoCurrencyList?.success &&
               userCryptoCurrencyList?.data.length && (
                  <div className="swap_div px-4 pt-3">
                     <div className="flex items-center justify-between">
                        <p className="text-gray-300 text-sm font-medium">
                           You get Approximately
                        </p>
                        <p className="text-gray-300 text-sm font-medium">
                           Record
                        </p>
                     </div>
                     <div className="mt-4">
                        <div className="flex items-center justify-between">
                           <div className="w-7/12">
                              <Controller
                                 name="CryptoCr"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <MoneyDropDownComponent
                                       onChange={currencySelectedHandler}
                                       currencyList={value}
                                       value={getValues('from')}
                                       item={'from'}
                                       label={'From'}
                                       hidePrice={true}
                                    />
                                 )}
                              />
                           </div>
                           <div className="flex items-center space-x-2 mb-3">
                              <Controller
                                 name="fromPrice"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <p className="text-gray-300 font-medium">
                                       {value}
                                    </p>
                                 )}
                              />
                              <Controller
                                 name="from"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <p className="text-gray-300 font-medium">
                                       {value}
                                    </p>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="swap_div flex items-center justify-center">
                           <div className="swap_n shadow" onClick={swapHandler}>
                              <MdSwapCalls className="text-gray-300 text-xl" />
                           </div>
                        </div>
                        <div className="flex items-center justify-between swap_cr">
                           <div className="w-7/12">
                              <Controller
                                 name="VCurreny"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <MoneyDropDownComponent
                                       onChange={currencySelectedHandler}
                                       currencyList={value}
                                       disabledCr={false}
                                       value={getValues('to')}
                                       item={'to'}
                                       label={'To'}
                                       hidePrice={true}
                                    />
                                 )}
                              />
                           </div>
                           <div className="flex items-center space-x-2 mb-3">
                              <Controller
                                 name="toPrice"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <p className="text-gray-300 font-medium">
                                       {value}
                                    </p>
                                 )}
                              />
                              <Controller
                                 name="to"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <p className="text-gray-300 font-medium">
                                       {value}
                                    </p>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="mb-4 w-full px-2">
                           <Box
                              sx={{
                                 '& > :not(style)': { width: '100%' },
                              }}
                              noValidate
                           >
                              <Controller
                                 name="price"
                                 control={control}
                                 render={({ field: { onChange, value } }) => (
                                    <TextField
                                       className="w-full"
                                       label="Price to convert"
                                       variant="outlined"
                                       value={value || ''}
                                       onChange={(event) => {
                                          inputCurrencyChangeHandler(
                                             event,
                                             onChange
                                          );
                                       }}
                                       type="number"
                                       onKeyPress={(event) => {
                                          if (!/[0-9]/.test(event.key)) {
                                             event.preventDefault();
                                          }
                                       }}
                                       inputProps={{
                                          min: 0,
                                          //   step: 0.0001,
                                          step: 1,
                                          autoComplete: 'off',
                                       }}
                                    />
                                 )}
                              />
                           </Box>
                        </div>
                     </div>
                     <div className="mb-4 info_div">
                        <p className="mb-4 text-gray-500 text-sm">
                           Lorem ipsum, dolor sit amet consectetur adipisicing
                           elit. Magnam doloribus voluptatem quas iure animi at
                           officia dolor delectus nesciunt excepturi!
                        </p>
                     </div>
                     <div className="flex items-center justify-center mb-4">
                        <CustomButtonComponent
                           text={'Swap Now'}
                           btnCl={'Crypto_btn'}
                           onClick={submitHandler}
                        />
                     </div>
                  </div>
               )}
         </motion.div>
      </styled.div>,
      document.getElementById('inbox')
   );
}

export default CurrencySwapPopupComponent;
