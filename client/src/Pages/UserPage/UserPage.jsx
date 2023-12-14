import React, { useEffect } from 'react';
import * as styled from './UserPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { getAllUsers } from '../../App/Features/Admin/adminActions';
import { useSearchParams } from 'react-router-dom';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import { usersSelector, userLoadingSelector, userErrorsSelector, userRolesListSelector } from './User.Selector';
import { ROW } from './UserTable';
import { useNavigate } from 'react-router-dom';
import { VscEdit } from '@react-icons/all-files/vsc/VscEdit';
import { getUserRoleLists } from '../../App/Features/userManagement/userManagementActions';

function UserPage() {
   const {
      userRoles: { isAdmin },
   } = useRoles();
   const dispatch = useDispatch();
   const [params] = useSearchParams();
   const page = params.get('page');
   const navigation = useNavigate();

   const users = useSelector(usersSelector);
   const userLoading = useSelector(userLoadingSelector);
   const userErrors = useSelector(userErrorsSelector);
   const userRolesList = useSelector(userRolesListSelector);

   const NextPageHandler = function () {
      navigation(`?page=${+page + 1}`);
   };

   const PrevPageHandler = function () {
      navigation(`?page=${+page - 1}`);
   };

   const editAccountHandler = function (userId) {
      navigation(`/players-accounts/edit/${userId}`);
   };

   const profileHandler = function (id) {
      navigation(`/player-status/show/${id}`);
   };

   useEffect(() => {
      if (page && isAdmin) {
         dispatch(getAllUsers({ page: page }));
         if (!userRolesList) {
            dispatch(getUserRoleLists());
         }
      }
   }, [page, isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'User'}
               subHeading={'All Users'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-5">
               {!!userErrors ? <p className="text-sm error_cl">{userErrors}</p> : null}
               {userLoading ? <SpinnerComponent /> : null}
               {!!users && users?.success && users?.users ? (
                  <div>
                     <TableComponent
                        row={ROW}
                        nextHandler={NextPageHandler}
                        nextAndPrev={true}
                        prevHandler={PrevPageHandler}
                        disablePrevbtn={+page === 0 ? true : false}
                        disableNextbtn={+page >= users?.totalPages ? true : false}
                        tableWidth={1400}
                     >
                        {users?.users.map((el) => (
                           <tr key={el?._id}>
                              <td>{el?.name}</td>
                              <td>{el?.email}</td>
                              <td>
                                 <div className="user_profile_div" onClick={() => profileHandler(el?._id)}>
                                    <img src={el?.avatar} alt="" />
                                 </div>
                              </td>
                              <td>{el?.userId}</td>
                              <td className={`${el?.createdBy}_cl`}>
                                 <div className="box_div shadow">
                                    <p>{el?.createdBy}</p>
                                 </div>
                              </td>
                              {/* <td>{!!el?.statisticsHidden && el?.statisticsHidden.toString()}</td>
                           <td>{!!el?.privateChat && el?.privateChat.toString()}</td>
                           <td>{!!el?.online && el?.online.toString()}</td>
                           <td>{!!el?.newFriendRequest && el?.newFriendRequest.toString()}</td>
                           <td>{!!el?.hideUser && el?.hideUser.toString()}</td>
                           <td>{!!el?.active && el?.active.toString()}</td>
                           <td>{!!el?.level && el?.level}</td>
                           <td>{!!el?.todaySpin && el?.todaySpin.toString()}</td> */}
                              <td>{dayjs(el?.createdAt).format('DD MMMM YYYY hh:mm:ss A')}</td>
                              {/* <td>{dayjs(el?.spinTimePeriod).format('DD MMMM YYYY hh:mm:ss A')}</td> */}
                              <td>{dayjs(el?.updatedAt).format('DD MMMM YYYY hh:mm:ss A')}</td>
                              <td>
                                 <div>
                                    <VscEdit className="cursor-pointer" onClick={() => editAccountHandler(el?._id)} />
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </TableComponent>
                  </div>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default UserPage;
