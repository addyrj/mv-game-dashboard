import React from 'react';
import * as styled from './UserSettingsCardComponent.style';
import {
   userProfilePrivacyInfoSelector,
   userProfilePrivacyInfoLoadingSelector,
   userProfilePrivacyInfoFetchErrorSelector,
} from './UserSettingsCardComponent.Selector';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import { Switch } from 'antd';

function UserSettingsCardComponent() {
   const userProfilePrivacyInfo = useSelector(userProfilePrivacyInfoSelector);
   const userProfilePrivacyInfoLoading = useSelector(userProfilePrivacyInfoLoadingSelector);
   const userProfilePrivacyInfoFetchError = useSelector(userProfilePrivacyInfoFetchErrorSelector);

   return (
      <styled.div>
         <div className="content">
            {!!userProfilePrivacyInfoLoading && <SpinnerComponent />}
            {!!userProfilePrivacyInfoFetchError && <p className="text-sm error_cl">{userProfilePrivacyInfoFetchError}</p>}
            {!!userProfilePrivacyInfo && userProfilePrivacyInfo?.success && userProfilePrivacyInfo?.response && (
               <>
                  <h1 className="text-gray-100">Settings</h1>
                  {Object.keys(userProfilePrivacyInfo?.response).map((el) => (
                     <div className="mt-3" key={el}>
                        <div className="flex items-center">
                           <div className="box_div">
                              <p className="text-gray-300">{el}</p>
                           </div>
                           <p className="text-gray-400 ">
                              {typeof userProfilePrivacyInfo?.response[el] === 'string' ? (
                                 userProfilePrivacyInfo?.response[el]
                              ) : (
                                 <Switch
                                    checkedChildren="Yes"
                                    unCheckedChildren="No"
                                    checked={userProfilePrivacyInfo?.response[el]}
                                 />
                              )}
                           </p>
                        </div>
                     </div>
                  ))}
               </>
            )}
         </div>
      </styled.div>
   );
}

export default UserSettingsCardComponent;
