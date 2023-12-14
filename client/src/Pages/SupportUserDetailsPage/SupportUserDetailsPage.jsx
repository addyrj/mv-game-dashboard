import React, { useEffect } from 'react';
import * as styled from './SupportUserDetailsPage.style';
import {
   supportTeamUserInfoSelector,
   supportTeamUserInfoLoadingSelector,
   supportTeamUserInfoErrorSelector,
   supportTeamApprovedUsersSelector,
   supportTeamApprovedUsersLoadingSelector,
   supportTeamApprovedUsersErrorSelector,
} from './SupportUserDetails.Selector';
import { useParams } from 'react-router';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { getSupportTeamApprovedUsers, getSupportTeamUserInfo } from '../../App/Features/LiveSupport/liveSupportActions';
import UserProfileComponent from '../../Components/UserProfileComponent/UserProfileComponent';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import SupportTeamActivitiesTableComponent from '../../Components/SupportTeamActivitiesTableComponent/SupportTeamActivitiesTableComponent';
import SupportTeamFeedBackTableComponent from '../../Components/SupportTeamFeedBackTableComponent/SupportTeamFeedBackTableComponent';

const Row = [{ heading: 'Name' }, { heading: 'Avatar' }, { heading: 'User id' }];

function SupportUserDetailsPage() {
   const params = useParams();
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSubAdmin },
   } = useRoles();

   const supportTeamUserInfo = useSelector(supportTeamUserInfoSelector);
   const supportTeamUserInfoLoading = useSelector(supportTeamUserInfoLoadingSelector);
   const supportTeamUserInfoError = useSelector(supportTeamUserInfoErrorSelector);
   const supportTeamApprovedUsers = useSelector(supportTeamApprovedUsersSelector);
   const supportTeamApprovedUsersLoading = useSelector(supportTeamApprovedUsersLoadingSelector);
   const supportTeamApprovedUsersError = useSelector(supportTeamApprovedUsersErrorSelector);

   useEffect(() => {
      if (!!params && params?.id) {
         if (isAdmin | isSubAdmin) {
            dispatch(getSupportTeamUserInfo({ userId: params?.id }));
         }
      }
   }, [isAdmin, isSubAdmin, params]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <div className="flex">
               {!!supportTeamUserInfoError && <p className="text-sm error_cl">{supportTeamUserInfoError}</p>}
               {!!supportTeamUserInfoLoading && <SpinnerComponent />}
               {!!supportTeamUserInfo && supportTeamUserInfo?.success && supportTeamUserInfo?.info && (
                  <UserProfileComponent
                     user={{
                        logo: supportTeamUserInfo?.info?.avatar,
                        email: supportTeamUserInfo?.info?.email,
                        providerName: supportTeamUserInfo?.info?.name,
                     }}
                  />
               )}
            </div>
            <div className="mt-4">
               <div>
                  <p className="text-gray-300 text-xl font-medium">Approved Users List</p>
                  {!!supportTeamApprovedUsersLoading && <SpinnerComponent />}
                  {!!supportTeamApprovedUsersError && (
                     <p className="text-sm error_cl">{supportTeamApprovedUsersError}</p>
                  )}
                  <SupportTeamActivitiesTableComponent
                     filter={'approved'}
                     action={getSupportTeamApprovedUsers}
                     row={Row}
                     items={supportTeamApprovedUsers?.info?.approved}
                     totalPages={supportTeamApprovedUsers?.totalPages}
                     totalDocuments={supportTeamApprovedUsers?.totalDocuments}
                     loading={supportTeamApprovedUsersLoading}
                  />
               </div>
               <div className="mt-4">
                  <SupportTeamFeedBackTableComponent />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default SupportUserDetailsPage;
