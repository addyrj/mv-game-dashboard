import React, { useEffect } from 'react';
import * as styled from './UserBlcCharComponent.style';
import BarChartComponent from '../BarChartComponent/BarChartComponent';
import { walletFiatCurrencyDataSelector, userCryptoCurrencyListSelector } from './UserBlcCharComponent.Selector';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

function UserBlcCharComponent() {
   const { setValue, control } = useForm({
      defaultValues: {
         data: [],
      },
   });

   const walletFiatCurrencyData = useSelector(walletFiatCurrencyDataSelector);
   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);

   useEffect(() => {
      if (
         !!walletFiatCurrencyData &&
         walletFiatCurrencyData?.success &&
         walletFiatCurrencyData?.walletCurrency &&
         walletFiatCurrencyData?.walletCurrency?.[0] &&
         walletFiatCurrencyData?.walletCurrency?.[0]?.wallet &&
         walletFiatCurrencyData?.walletCurrency?.[0]?.wallet.length &&
         !!userCryptoCurrencyList &&
         userCryptoCurrencyList?.success &&
         userCryptoCurrencyList?.data &&
         userCryptoCurrencyList?.data.length
      ) {
         const { wallet } = walletFiatCurrencyData?.walletCurrency?.[0];
         const balanceWalletAr = [];

         for (let i = 0; i < wallet.length; i++) {
            balanceWalletAr.push({ name: wallet[i]?.currencyName, balance: Number(wallet[i]?.balance) });
         }

         const { data } = userCryptoCurrencyList;

         for (let i = 0; i < data.length; i++) {
            balanceWalletAr.push({
               name: data[i]?.symbol,
               balance: data[i]?.balance,
            });
         }

         setValue('data', balanceWalletAr);
      }
   }, [walletFiatCurrencyData, userCryptoCurrencyList]);

   useEffect(() => {
      return () => {};
   }, []);

   return (
      <styled.div>
         <Controller
            name="data"
            control={control}
            render={({ field: { value } }) => <BarChartComponent data={value} label={'User balance'} dataKey={'balance'} />}
         />
      </styled.div>
   );
}

export default UserBlcCharComponent;
