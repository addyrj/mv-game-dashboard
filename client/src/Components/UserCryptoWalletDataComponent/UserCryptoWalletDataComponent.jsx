import React from 'react';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import UserCurrencyCardComponent from '../UserCurrencyCardComponent/UserCurrencyCardComponent';
import {
   userCryptoCurrencyListSelector,
   userCryptoCurrencyListLoadingSelector,
   userCryptoCurrencyListErrorSelector,
} from './UserCryptoWallet.Selector';
import { useSelector } from 'react-redux';

function UserCryptoWalletDataComponent() {
   const userCryptoCurrencyList = useSelector(userCryptoCurrencyListSelector);
   const userCryptoCurrencyListLoading = useSelector(userCryptoCurrencyListLoadingSelector);
   const userCryptoCurrencyListError = useSelector(userCryptoCurrencyListErrorSelector);

   return (
      <div>
         <p className="text-gray-300 font-medium text-xl mt-4">Crypto wallet currency data</p>
         {!!userCryptoCurrencyListLoading && <SpinnerComponent />}
         {!!userCryptoCurrencyListError && <p className="error_cl">{userCryptoCurrencyListError}</p>}
         {!!userCryptoCurrencyList &&
            userCryptoCurrencyList?.success &&
            userCryptoCurrencyList?.data &&
            userCryptoCurrencyList?.data.length && (
               <div className="mt-4 grid_div">
                  {userCryptoCurrencyList?.data.map((el) => (
                     <UserCurrencyCardComponent data={el} key={el?.currencyId} />
                  ))}
               </div>
            )}
      </div>
   );
}

export default UserCryptoWalletDataComponent;
