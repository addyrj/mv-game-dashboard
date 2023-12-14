import React from 'react';
import * as styeld from './UserProfileCardComponent.style';
import UserProfileComponent from '../UserProfileComponent/UserProfileComponent';
import {
   userAccountInformationSelector,
   userAccountInformationLoadingSelector,
   userAccountInformationErrorSelector,
} from './UserProfile.Selector';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import dayjs from 'dayjs';

function UserProfileCardComponent() {
   const userAccountInformation = useSelector(userAccountInformationSelector);
   const userAccountInformationLoading = useSelector(userAccountInformationLoadingSelector);
   const userAccountInformationError = useSelector(userAccountInformationErrorSelector);

   return (
      <styeld.div>
         <div className="bg_div" />
         <div>
            {!!userAccountInformationLoading && (
               <div className="flex">
                  <SpinnerComponent />
               </div>
            )}
            {!!userAccountInformationError && <p className="text-sm error_cl">{userAccountInformationError}</p>}
            {!!userAccountInformation && userAccountInformation?.data && userAccountInformation?.success && (
               <div className="user_profile_bg_div pt-5">
                  <UserProfileComponent
                     user={{
                        logo: userAccountInformation?.data?.item?.avatar,
                        email: userAccountInformation?.data?.item?.email,
                        providerName: userAccountInformation?.data?.item?.name,
                     }}
                  />
                  <div className="content px-2">
                     <h4 className="text-gray-300 font-medium text-xl mb-4">Information</h4>
                     <div className="flex items-center">
                        <div className="box_div">
                           <h5 className="text-gray-300 font-medium">User Id</h5>
                        </div>
                        <div>
                           <p className="text-gray-300">{userAccountInformation?.data?.item?.userId}</p>
                        </div>
                     </div>
                     <div className="flex items-center mt-3">
                        <div className="box_div">
                           <h5 className="text-gray-300 font-medium">Active</h5>
                        </div>
                        <div>
                           <p className="text-gray-300">
                              {!!userAccountInformation?.data?.item?.active ? 'Yes' : 'No'}
                           </p>
                        </div>
                     </div>
                     <div className="flex items-center mt-3">
                        <div className="box_div">
                           <h5 className="text-gray-300 font-medium">Created At</h5>
                        </div>
                        <div>
                           <p className="text-gray-300">
                              {dayjs(userAccountInformation?.data?.item?.createdAt).format('MMM DD YYYY h:m:s A')}
                           </p>
                        </div>
                     </div>
                     <div className="flex items-center mt-3">
                        <div className="box_div">
                           <h5 className="text-gray-300 font-medium">Created By</h5>
                        </div>
                        <div>
                           <p className="text-gray-300">{userAccountInformation?.data?.item?.createdBy}</p>
                        </div>
                     </div>
                     {!!userAccountInformation?.data?.roles && userAccountInformation?.data?.roles.length && (
                        <div className="mt-5 pt-3">
                           <h4 className="text-gray-300 font-medium text-xl">Roles</h4>
                           <div className="flex items-center mt-3 space-x-3">
                              {userAccountInformation?.data?.roles.map((el) => (
                                 <div className="card_div" key={el?.roleName}>
                                    <h4 className="text-gray-100 text-lg">{el?.roleName}</h4>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>
      </styeld.div>
   );
}

export default UserProfileCardComponent;
