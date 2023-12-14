import React, { useEffect } from 'react';
import * as styled from './GlobalSettingPrivacyComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import {
   authSelector,
   userProfilePrivacyInfoSelector,
   userProfilePrivacyInfoLoadingSelector,
   userProfilePrivacyInfoFetchErrorSelector,
} from './Setting.Selector';
import { getPrivacyFieldStatus } from '../../App/Features/Client/clientActions';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import PrivacySettingListComponent from '../PrivacySettingListComponent/PrivacySettingListComponent';

function GlobalSettingPrivacyComponent() {
   const dispatch = useDispatch();

   const auth = useSelector(authSelector);
   const userProfilePrivacyInfo = useSelector(userProfilePrivacyInfoSelector);
   const userProfilePrivacyInfoLoading = useSelector(
      userProfilePrivacyInfoLoadingSelector
   );
   const userProfilePrivacyInfoFetchError = useSelector(
      userProfilePrivacyInfoFetchErrorSelector
   );

   useEffect(() => {
      if (auth && auth?.user && auth?.user?._id) {
         dispatch(getPrivacyFieldStatus({ userId: auth?.user?._id }));
      }
   }, [auth]);

   return (
      <styled.div>
         {!!userProfilePrivacyInfoLoading ? (
            <div className="w-100 h-100 flex items-center justify-center">
               <SpennerComponent center={true} />
            </div>
         ) : null}
         {!!userProfilePrivacyInfoFetchError ? (
            <p className="error_cl">{userProfilePrivacyInfoFetchError}</p>
         ) : null}
         {!!userProfilePrivacyInfo &&
            userProfilePrivacyInfo?.success &&
            userProfilePrivacyInfo?.response && (
               <PrivacySettingListComponent
                  userProfilePrivacyInfo={userProfilePrivacyInfo}
               />
            )}
      </styled.div>
   );
}

export default GlobalSettingPrivacyComponent;
