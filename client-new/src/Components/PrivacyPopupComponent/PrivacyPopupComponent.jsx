import React, { useEffect } from 'react';
import * as styled from './PrivacyPopupComponent.style';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getPrivacyFieldStatus } from '../../App/Features/Client/clientActions';
import { useCookies } from 'react-cookie';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   userProfilePrivacyInfoSelector,
   userProfilePrivacyInfoLoadingSelector,
   userProfilePrivacyInfoFetchErrorSelector,
} from './Privacy.Selector';
import PrivacySettingListComponent from '../PrivacySettingListComponent/PrivacySettingListComponent';

function PrivacyPopupComponent({ back }) {
   const dispatch = useDispatch();
   const [cookie] = useCookies();

   const userProfilePrivacyInfo = useSelector(userProfilePrivacyInfoSelector);
   const userProfilePrivacyInfoLoading = useSelector(
      userProfilePrivacyInfoLoadingSelector
   );
   const userProfilePrivacyInfoFetchError = useSelector(
      userProfilePrivacyInfoFetchErrorSelector
   );

   useEffect(() => {
      if (cookie && cookie?._mv_games_auth && cookie?._mv_games_auth?._id) {
         dispatch(
            getPrivacyFieldStatus({ userId: cookie?._mv_games_auth?._id })
         );
      }
   }, []);

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
         userProfilePrivacyInfo?.response ? (
            <>
               <ModelHeaderComponent
                  heading={'Privacy'}
                  backIcon={true}
                  back={back}
               />
               <PrivacySettingListComponent
                  userProfilePrivacyInfo={userProfilePrivacyInfo}
               />
            </>
         ) : null}
      </styled.div>
   );
}

export default PrivacyPopupComponent;
