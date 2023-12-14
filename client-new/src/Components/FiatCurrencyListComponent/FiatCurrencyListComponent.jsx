import React from 'react';
import CurrencyLgComponent from '../CurrencyLgComponent/CurrencyLgComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
   showAndHideCurrencyDropDown,
   userGameSelectedCurrency,
} from '../../App/Features/Payment/paymentSlice';
import {
   authSelector,
   selectedCurrencySelector,
} from './FiatCurrency.Selector';
import { setUserSelectedCurrency } from '../../App/Features/Client/clientActions';

function FiatCurrencyListComponent({ data }) {
   const dispatch = useDispatch();

   const auth = useSelector(authSelector);
   const selectedCurrency = useSelector(selectedCurrencySelector);

   const SelectedCurrency = function (currency) {
      dispatch(showAndHideCurrencyDropDown(false));
      dispatch(userGameSelectedCurrency({ ...currency, type: 'fiatCurrency' }));
      const userId = auth?.user?._id;

      if (currency?._id !== selectedCurrency?.currency?.currencyId) {
         dispatch(
            setUserSelectedCurrency({
               currencyId: currency?._id,
               currencyType: 'fiatCurrency',
               userId,
               crSymbol: currency?.name,
            })
         );
      }
   };

   return (
      <div>
         {!!data && data?.success && data?.walletCurrency
            ? data?.walletCurrency?.[0]?.wallet.map((el) => (
                 <CurrencyLgComponent
                    _id={el?._id}
                    key={el?._id}
                    icon={el?.icon}
                    name={el?.currencyName}
                    amount={el?.balance}
                    locked={el?.locked}
                    onClick={SelectedCurrency}
                 />
              ))
            : null}
      </div>
   );
}

export default FiatCurrencyListComponent;
