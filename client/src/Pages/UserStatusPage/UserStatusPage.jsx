import React, { useEffect } from 'react';
import * as styled from './UserStatusPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllGlobalChatGroups,
   getPrivacyFieldStatus,
   getUserAllCryptoCurrency,
   getUserAllFiatCurrency,
   getUserFriendList,
   getUserSingleAccountInformation,
} from '../../App/Features/userManagement/userManagementActions';
import UserProfileCardComponent from '../../Components/UserProfileCardComponent/UserProfileCardComponent';
import { userAccountInformationSelector } from './UserStatus.Selector';
import WalletTransactionComponent from '../../Components/WalletTransactionComponent/WalletTransactionComponent';
import UserSettingsCardComponent from '../../Components/UserSettingsCardComponent/UserSettingsCardComponent';
import GlobalChatComponent from '../../Components/GlobalChatComponent/GlobalChatComponent';
import { removeGroupMessage } from '../../App/Features/userManagement/userManagementSlice';
import FriendsListComponent from '../../Components/FriendsListComponent/FriendsListComponent';
import UserBlcCharComponent from '../../Components/UserBlcCharComponent/UserBlcCharComponent';
import UserFiatWalletDataComponent from '../../Components/UserFiatWalletDataComponent/UserFiatWalletDataComponent';
import UserCryptoWalletDataComponent from '../../Components/UserCryptoWalletDataComponent/UserCryptoWalletDataComponent';
import UserWageredAmountChatComponent from '../../Components/UserWageredAmountChatComponent/UserWageredAmountChatComponent';

function UserStatusPage() {
   const dispatch = useDispatch();
   const params = useParams();
   const {
      userRoles: { isAdmin },
   } = useRoles();

   const userAccountInformation = useSelector(userAccountInformationSelector);

   useEffect(() => {
      if (!!isAdmin && !!params && params?.id) {
         dispatch(getUserSingleAccountInformation({ userId: params?.id }));
         dispatch(getUserAllFiatCurrency({ userId: params?.id }));
         dispatch(getPrivacyFieldStatus({ userId: params?.id }));
         dispatch(getAllGlobalChatGroups());
         dispatch(getUserFriendList({ userId: params?.id }));
      }
   }, [isAdmin, params]);

   useEffect(() => {
      if (
         !!params &&
         params?.id &&
         !!userAccountInformation &&
         userAccountInformation?.success &&
         userAccountInformation?.data &&
         userAccountInformation?.data?.item
      ) {
         dispatch(getUserAllCryptoCurrency({ userId: userAccountInformation?.data?.item?.userId }));
      }
   }, [userAccountInformation]);

   useEffect(() => {
      return () => {
         dispatch(removeGroupMessage());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <div className="px-2">
               <UserProfileCardComponent />
               <p className="text-gray-300 font-medium text-xl mt-4 mb-3">User global settings</p>
               <UserSettingsCardComponent />
               <UserFiatWalletDataComponent />
               <UserCryptoWalletDataComponent />
               <div className="flex space-x-4 py-3">
                  <UserBlcCharComponent />
                  <UserWageredAmountChatComponent />
               </div>
               <p className="text-gray-300 font-medium text-xl mt-4 mb-4">Wallet transactions</p>
               <WalletTransactionComponent />
               <div className="flex w-full">
                  <div className="px-2 pb-4 pt-2 w-full">
                     <p className="text-gray-300 font-medium text-xl mt-4 mb-4">Global chats</p>
                     <div className="mt-4 mb-4">
                        <GlobalChatComponent />
                     </div>
                  </div>
                  <div className="w-full p-2">
                     <p className="text-gray-300 font-medium text-xl mt-4 mb-4">User friends list</p>
                     <FriendsListComponent />
                  </div>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default UserStatusPage;
