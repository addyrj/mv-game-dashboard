import React, { useEffect } from 'react';
import * as styled from './UserRolePage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { ROW } from './RoleTable';
import TableComponent from '../../Components/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { getAllUserRoles, deleteUserRole } from '../../App/Features/Admin/adminActions';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { Popconfirm } from 'antd';
import { rolesSelector, getRolesLoadingSelector, getRolesErrorSelector } from './UserRole.Selector';

function UserRolePage() {
   const {
      userRoles: { isAdmin },
   } = useRoles();
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const [params] = useSearchParams();
   const page = params.get('page');

   const roles = useSelector(rolesSelector);
   const getRolesLoading = useSelector(getRolesLoadingSelector);
   const getRolesError = useSelector(getRolesErrorSelector);

   const CreateUserRoleHandler = function () {
      navigation('/user-roles/create');
   };

   const EditRoleHandler = function (id) {
      navigation(`/user-roles/${id}`);
   };

   const DeleteRolesHandler = function (roleId) {
      if (isAdmin) {
         dispatch(deleteUserRole({ roleId }));
      }
   };

   const NextPageHandler = function () {
      navigation(`?page=${+page + 1}`);
   };

   const PrevPageHandler = function () {
      navigation(`?page=${+page - 1}`);
   };

   useEffect(() => {
      if (isAdmin && page) {
         dispatch(getAllUserRoles({ page: page }));
      }
   }, [isAdmin, page]);

   return (
      <styled.div>
         <NavbarComponent />
         <styled.container className="container_div">
            <PageHeadingComponent
               pageName={'User Roles'}
               subHeading={'All Users Roles'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
               menu={true}
               innerProps={<MenuItem onClick={CreateUserRoleHandler}>Create users roles</MenuItem>}
            />
            <styled.contentDiv className="mt-5">
               <div className="mt-5">
                  {!!getRolesLoading ? <SpinnerComponent /> : null}
                  {!!getRolesError ? <p className="text-sm error_cl">{getRolesError}</p> : null}
                  {!!roles && roles?.success && roles?.roles ? (
                     <TableComponent
                        row={ROW}
                        nextAndPrev={true}
                        nextHandler={NextPageHandler}
                        prevHandler={PrevPageHandler}
                        disablePrevbtn={+page === 0 ? true : false}
                        disableNextbtn={+page >= roles?.totalPages ? true : false}
                     >
                        {roles?.roles.map((el) => (
                           <tr key={el?._id}>
                              <td>{el?._id}</td>
                              <td>{el?.roleName}</td>
                              <td>{dayjs(el?.createdAt).format('DD MMMM YYYY m:h:ss A')}</td>
                              <td>
                                 {el?.updatedAt ? dayjs(el?.updatedAt).format('DD MMMM YYYY h:m:ss A') : '--- ---'}
                              </td>
                              {el?.default ? (
                                 <td>Default roles</td>
                              ) : (
                                 <td className="flex items-center space-x-2">
                                    <Popconfirm
                                       title="Delete the task"
                                       description="Are you sure to delete this task?"
                                       okText="Yes"
                                       cancelText="No"
                                       onConfirm={() => DeleteRolesHandler(el._id)}
                                    >
                                       <p className="text-red-500 font-medium">Delete</p>
                                    </Popconfirm>
                                    <p onClick={() => EditRoleHandler(el._id)}>Edit</p>
                                 </td>
                              )}
                           </tr>
                        ))}
                     </TableComponent>
                  ) : null}
               </div>
            </styled.contentDiv>
         </styled.container>
      </styled.div>
   );
}

export default UserRolePage;
