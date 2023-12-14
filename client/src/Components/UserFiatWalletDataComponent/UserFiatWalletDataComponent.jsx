import React from 'react';
import UserCurrencyCardComponent from '../UserCurrencyCardComponent/UserCurrencyCardComponent';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import { useSelector } from 'react-redux';
import {
   walletFiatCurrencyDataSelector,
   walletFiatCurrencyDataLoadingSelector,
   walletFiatCurrencyDataErrorSelector,
} from './UserFiatWallet.Selector';

function UserFiatWalletDataComponent() {
   const walletFiatCurrencyData = useSelector(walletFiatCurrencyDataSelector);
   const walletFiatCurrencyDataLoading = useSelector(walletFiatCurrencyDataLoadingSelector);
   const walletFiatCurrencyDataError = useSelector(walletFiatCurrencyDataErrorSelector);

   return (
      <div>
         <div className="px-2 pb-4 pt-2">
            <p className="text-gray-300 font-medium text-xl mt-4">Fiat wallet currency data</p>
            {!!walletFiatCurrencyDataLoading && <SpinnerComponent />}
            {!!walletFiatCurrencyDataError && <p className="error_cl">{walletFiatCurrencyDataError}</p>}
            {!!walletFiatCurrencyData &&
               walletFiatCurrencyData?.success &&
               walletFiatCurrencyData?.walletCurrency &&
               walletFiatCurrencyData?.walletCurrency?.[0] &&
               walletFiatCurrencyData?.walletCurrency?.[0]?.wallet &&
               walletFiatCurrencyData?.walletCurrency?.[0]?.wallet.length && (
                  <div className="mt-4 grid_div">
                     {walletFiatCurrencyData?.walletCurrency?.[0]?.wallet.map((el) => (
                        <UserCurrencyCardComponent data={el} key={el?._id} />
                     ))}
                  </div>
               )}
         </div>
      </div>
   );
}

export default UserFiatWalletDataComponent;
