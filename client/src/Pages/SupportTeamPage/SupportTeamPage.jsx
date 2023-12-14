import React, { useEffect } from 'react';
import * as styled from './SupportTeamPage.style';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByRoles } from '../../App/Features/userManagement/userManagementActions';
import {
   supportTeamUsersSelector,
   supportTeamUsersLoadingSelector,
   supportTeamUsersErrorSelector,
} from './SupportTeam.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router';

const Row = [{ heading: 'Name' }, { heading: 'Avatar' }, { heading: 'email' }, { heading: 'Options' }];

function SupportTeamPage() {
   const {
      userRoles: { isAdmin, isSubAdmin },
   } = useRoles();

   const navigation = useNavigate();
   const dispatch = useDispatch();
   const supportTeamUsers = useSelector(supportTeamUsersSelector);
   const supportTeamUsersLoading = useSelector(supportTeamUsersLoadingSelector);
   const supportTeamUsersError = useSelector(supportTeamUsersErrorSelector);

   const navigationHandler = function (id) {
      navigation(`/support/team/${id}`);
   };

   useEffect(() => {
      if (isAdmin || isSubAdmin) {
         dispatch(getUserByRoles({ filter: 'support' }));
      }
   }, [isAdmin, isSubAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Support Team'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-3">
               {!!supportTeamUsersLoading && <SpinnerComponent />}
               {!!supportTeamUsersError && <p className="error_cl text-sm">{supportTeamUsersError}</p>}
               {!!supportTeamUsers &&
               supportTeamUsers?.success &&
               supportTeamUsers?.users &&
               supportTeamUsers?.users.length ? (
                  <TableComponent row={Row}>
                     {supportTeamUsers?.users.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.name}</td>
                           <td>
                              <div className="user_profile">
                                 <img src={el?.avatar} />
                              </div>
                           </td>
                           <td>{el?.email}</td>
                           <td>
                              <RemoveRedEyeIcon
                                 onClick={() => navigationHandler(el?._id)}
                                 className="text-gray-200 cursor-pointer"
                              />
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : (
                  !supportTeamUsersLoading && (
                     <div className="text-center">
                        <p className="text-gray-300 font-medium">No more support team</p>
                     </div>
                  )
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default SupportTeamPage;
