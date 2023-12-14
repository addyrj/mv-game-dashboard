import React, { useState } from 'react';
import {
   userCryptoCurrencyListSelector,
   userCryptoCurrencyListLoadingSelector,
   userCryptoCurrencyListErrorSelector,
   authSelector,
   selectedCurrencySelector,
} from './CryptoCurrency.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { useSelector, useDispatch } from 'react-redux';
import CurrencyLgComponent from '../CurrencyLgComponent/CurrencyLgComponent';
import {
   showAndHideCurrencyDropDown,
   userGameSelectedCurrency,
} from '../../App/Features/Payment/paymentSlice';
import { setUserSelectedCurrency } from '../../App/Features/Client/clientActions';

function CryptoCurrencyListComponent() {
   const dispatch = useDispatch();
   const [ActiveTab, setActiveTab] = useState('');

   const userCryptoCurrencyListError = useSelector(
      userCryptoCurrencyListErrorSelector
   );
   const userCryptoCurrencyListLoading = useSelector(
      userCryptoCurrencyListLoadingSelector
   );
   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const auth = useSelector(authSelector);
   const selectedCurrency = useSelector(selectedCurrencySelector);

   const SelectedCurrency = function (currency) {
      dispatch(
         userGameSelectedCurrency({ ...currency, type: 'CryptoCurrency' })
      );
      dispatch(showAndHideCurrencyDropDown(false));
      const userId = auth?.user?._id;

      if (currency?.name !== selectedCurrency?.currency?.crSymbol) {
         dispatch(
            setUserSelectedCurrency({
               crSymbol: currency?.name,
               currencyType: 'CryptoCurrency',
               userId,
               currencyId: currency?.currencyId,
            })
         );
      }

      setActiveTab({ name: currency?.name });
   };

   return (
      <div>
         {!!userCryptoCurrencyListError ? (
            <p className="text-sm error_cl">{userCryptoCurrencyListError}</p>
         ) : null}
         {userCryptoCurrencyListLoading ? <SpennerComponent /> : null}
         {!!userCryptoCurrencyList &&
         userCryptoCurrencyList?.success &&
         userCryptoCurrencyList?.data
            ? userCryptoCurrencyList?.data.map((el) => (
                 <CurrencyLgComponent
                    currencyId={el?.currencyId}
                    icon={el?.icon}
                    name={el?.symbol}
                    amount={el?.balance}
                    key={el?.symbol}
                    onClick={SelectedCurrency}
                    active={ActiveTab}
                    locked={el?.lotteryCurrency}
                 />
              ))
            : null}
      </div>
   );
}

export default CryptoCurrencyListComponent;
