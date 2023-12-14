import React from 'react';
import SmTbCardComponent from '../SmTbCardComponent/SmTbCardComponent';
import { currencyData } from './ViewInFiatData';
import * as styled from './ViewInFiat.style';
import {
   userProfilePrivacyInfoSelector,
   userProfilePrivacyInfoFetchErrorSelector,
   authSelector,
} from './Tab.Selector';
import { useSelector, useDispatch } from 'react-redux';
import { profilePrivacyHandler } from '../../App/Features/Client/clientActions';

function ViewInFiatComponent({ close }) {
   const dispatch = useDispatch();

   const userProfilePrivacyInfo = useSelector(userProfilePrivacyInfoSelector);
   const userProfilePrivacyInfoFetchError = useSelector(
      userProfilePrivacyInfoFetchErrorSelector
   );
   const auth = useSelector(authSelector);

   const changeUserViewCurrencyHandler = function (cr) {
      close();
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(
            profilePrivacyHandler({
               field: 'conversionCurrency',
               value: cr,
               userId: auth?.user?._id,
            })
         );
      }
   };

   return (
      <styled.div>
         {!!userProfilePrivacyInfoFetchError && (
            <p className="text-sm error_cl">
               {userProfilePrivacyInfoFetchError}
            </p>
         )}
         {!!userProfilePrivacyInfo &&
            userProfilePrivacyInfo?.success &&
            userProfilePrivacyInfo?.response &&
            currencyData.map((el, index) => (
               <SmTbCardComponent
                  active={
                     el?.name ===
                     userProfilePrivacyInfo?.response?.conversionCurrency
                  }
                  key={(el + index).toString()}
                  data={el}
                  action={() => changeUserViewCurrencyHandler(el?.name)}
               />
            ))}
      </styled.div>
   );
}

export default ViewInFiatComponent;
