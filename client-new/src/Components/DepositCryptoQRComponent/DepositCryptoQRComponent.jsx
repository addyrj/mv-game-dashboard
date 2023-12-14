import React, { useRef, useState, useCallback, useEffect } from 'react';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { FiCopy } from '@react-icons/all-files/fi/FiCopy';
import MoneyDropDownComponent from '../MoneyDropDownComponent/MoneyDropDownComponent';
import {
   userCryptoCurrencyListSelector,
   userCryptoCurrencyListLoadingSelector,
   userCryptoCurrencyListErrorSelector,
   authSelector,
   userCryptoWalletAddressSelector,
   userCryptoWalletAddressLoadingSelector,
   userCryptoWalletAddressErrorSelector,
   withdrawCryptoInfoSelector,
   withdrawCryptoInfoLoadingSelector,
   withdrawCryptoInfoErrorSelector,
} from './CryptoSelector';
import { useSelector, useDispatch } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   getUserCryptoWalletAddress,
   withdrawCryptoCurrency,
} from '../../App/Features/Payment/paymentActions';
import QRCode from 'react-qr-code';
import * as styled from './Deposit.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { checkFloatLength } from '../../helper/helper';
import toast from 'react-hot-toast';
import {
   showAndHideInsufficientBlcHandler,
   toggleUserWalletHandler,
} from '../../App/Features/Client/clientSlice';
import WalletNetworkComponent from '../CryptoNetworkComponent/CryptoNetworkComponent';

const schema = yup.object({
   walletAddress: yup.string().required('Wallet address is required'),
});

function DepositCryptoQRComponent({ type }) {
   const [SelectedCryptoCr, setSelectedCryptoCr] = useState('');
   const [SelectedNetwork, setSelectedNetwork] = useState({
      network: '',
      address: '',
   });
   const DepositAddresUDRef = useRef(null);
   const ButtonTextRef = useRef(null);
   const dispatch = useDispatch();
   const {
      handleSubmit,
      register,
      getValues,
      setValue,
      control,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         walletAddress: '',
         amount: '',
      },
   });

   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const userCryptoCurrencyListLoading = useSelector(
      userCryptoCurrencyListLoadingSelector
   );
   const userCryptoCurrencyListError = useSelector(
      userCryptoCurrencyListErrorSelector
   );
   const userCryptoWalletAddress = useSelector(userCryptoWalletAddressSelector);
   const userCryptoWalletAddressLoading = useSelector(
      userCryptoWalletAddressLoadingSelector
   );
   const userCryptoWalletAddressError = useSelector(
      userCryptoWalletAddressErrorSelector
   );
   const auth = useSelector(authSelector);
   const withdrawCryptoInfo = useSelector(withdrawCryptoInfoSelector);
   const withdrawCryptoInfoLoading = useSelector(
      withdrawCryptoInfoLoadingSelector
   );
   const withdrawCryptoInfoError = useSelector(withdrawCryptoInfoErrorSelector);

   const currencySelectedHandler = useCallback(
      function (event) {
         if (auth && !!auth?.user && auth?.user?.userId) {
            const { value } = event.target;
            setSelectedCryptoCr(value);
            dispatch(
               getUserCryptoWalletAddress({
                  userId: auth?.user?.userId,
                  currency: value,
               })
            );
         }
      },
      [SelectedCryptoCr]
   );

   const networkHander = function (data) {
      if (SelectedNetwork?.network !== data?.network) {
         setSelectedNetwork(data);
      }
   };

   const copyValue = function () {
      var inp = document.createElement('input');
      document.body.appendChild(inp);
      inp.value = DepositAddresUDRef.current.textContent;
      inp.select();
      document.execCommand('copy', false);
      inp.remove();
   };

   const copyText = function () {
      ButtonTextRef.current.textContent = 'COPIED';
      copyValue();
   };

   const onBlur = function () {
      const amount = getValues('amount');
      const floatNumber = checkFloatLength(amount);
      setValue('amount', floatNumber);
   };

   const onSubmit = function (data) {
      const { amount } = data;

      if (!amount || amount === 'undefined' || amount === 'null') {
         return toast.error('Withdraw amount is required');
      }

      const cryptoLists = userCryptoCurrencyList?.data;
      const findCryptoCurrency = cryptoLists.find(
         (el) => el?.symbol === SelectedCryptoCr
      );

      if (!findCryptoCurrency) {
         return toast.error('Something worng with crypto wallet');
      }

      const cryptoBalance = Number(findCryptoCurrency?.balance);

      if (cryptoBalance < 1 || +amount > cryptoBalance) {
         dispatch(showAndHideInsufficientBlcHandler(true));
         dispatch(toggleUserWalletHandler(false));
      } else {
         const userWithdrawObject = {
            ...data,
            SelectedCryptoCr,
            network: SelectedNetwork?.network,
         };
         dispatch(withdrawCryptoCurrency(userWithdrawObject));
      }
   };

   useEffect(() => {
      if (
         userCryptoCurrencyList &&
         userCryptoCurrencyList?.data &&
         userCryptoCurrencyList?.data.length &&
         !!auth?.user &&
         auth?.user?.userId
      ) {
         const fistCryptoCr = userCryptoCurrencyList.data[0];
         const cr = fistCryptoCr.currencyId;
         setSelectedCryptoCr(cr);
         if (!userCryptoWalletAddress)
            dispatch(
               getUserCryptoWalletAddress({
                  userId: auth?.user?.userId,
                  currency: cr,
               })
            );
      }
   }, [userCryptoCurrencyList]);

   useEffect(() => {
      if (
         !!userCryptoWalletAddress &&
         userCryptoWalletAddress?.success &&
         userCryptoWalletAddress?.data
      ) {
         setSelectedNetwork(userCryptoWalletAddress?.data?.[0]);
      }
   }, [userCryptoWalletAddress]);

   return (
      <styled.div>
         <div>
            {!!userCryptoCurrencyListLoading && <SpennerComponent />}
            {userCryptoCurrencyListError && (
               <p>{userCryptoCurrencyListError}</p>
            )}
            {!!userCryptoCurrencyList &&
               userCryptoCurrencyList?.success &&
               userCryptoCurrencyList?.data.length && (
                  <MoneyDropDownComponent
                     onChange={currencySelectedHandler}
                     value={SelectedCryptoCr}
                     currencyList={userCryptoCurrencyList?.data}
                     disabledCr={true}
                  />
               )}
         </div>
         {!!type &&
            type === 'withdraw' &&
            userCryptoWalletAddress &&
            userCryptoWalletAddress?.success &&
            !!userCryptoWalletAddress?.data && (
               <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                  >
                     <WalletNetworkComponent
                        selectedNetwork={SelectedNetwork}
                        wallet={userCryptoWalletAddress}
                        hander={networkHander}
                     />
                     <TextField
                        label="Wallet Address"
                        name="walletAddress"
                        {...register('walletAddress')}
                        variant="outlined"
                        type={'text'}
                     />
                     {!!errors && errors?.walletAddress?.message && (
                        <p className="text-sm error_cl">
                           {errors?.walletAddress?.message}
                        </p>
                     )}
                     <Controller
                        name="amount"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <TextField
                              label="Wallet Address"
                              value={value}
                              onChange={onChange}
                              type={'number'}
                              onBlur={onBlur}
                           />
                        )}
                     />
                     {!!errors && errors?.amount?.message && (
                        <p className="text-sm error_cl">
                           {errors?.amount?.message}
                        </p>
                     )}
                     <div className="flex items-center justify-center">
                        <CustomButtonComponent
                           text={'Withdraw'}
                           btnCl={'Crypto_btn mt-3'}
                           type={'submit'}
                           isLoading={withdrawCryptoInfoLoading}
                        />
                        {!!withdrawCryptoInfoError && (
                           <p className="tex-sm error_cl">
                              {withdrawCryptoInfoError}
                           </p>
                        )}
                     </div>
                  </Box>
               </form>
            )}
         {!!userCryptoWalletAddressError ? (
            <p className="error_cl text-sm">{userCryptoWalletAddressError}</p>
         ) : null}
         {!!userCryptoWalletAddressLoading && <SpennerComponent />}
         {type !== 'withdraw' &&
            userCryptoWalletAddress &&
            userCryptoWalletAddress?.success &&
            !!userCryptoWalletAddress?.data && (
               <div>
                  <WalletNetworkComponent
                     selectedNetwork={SelectedNetwork}
                     wallet={userCryptoWalletAddress}
                     hander={networkHander}
                  />
                  <div className="py-3 px-4 flex items-center justify-between space-x-4">
                     <div className=" w-7/12">
                        <p className="text-sm text-gray-400">
                           Deposit Address ( Bitcoin )
                        </p>
                        <h5
                           className="text-gray-300 font-medium text-sm mt-2 network_address"
                           ref={DepositAddresUDRef}
                        >
                           {SelectedNetwork?.address}
                        </h5>
                        <CustomButtonComponent
                           btnCl={'copyBtn mt-3 shadow'}
                           onClick={copyText}
                        >
                           <FiCopy />
                           <p className="text-sm ms-2 " ref={ButtonTextRef}>
                              COPY
                           </p>
                        </CustomButtonComponent>
                     </div>
                     <div className="qr_n_div w-5/12">
                        <QRCode
                           value={SelectedNetwork?.address}
                           style={{
                              height: 'auto',
                              maxWidth: '100%',
                              width: '100%',
                              borderRadius: '5px',
                           }}
                        />
                     </div>
                  </div>
               </div>
            )}
      </styled.div>
   );
}

export default DepositCryptoQRComponent;
