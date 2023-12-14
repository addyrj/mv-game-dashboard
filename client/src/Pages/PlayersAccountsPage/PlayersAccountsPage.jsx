import React, { useEffect } from 'react';
import * as styled from './PlayersAccountsPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Switch, message } from 'antd';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
   createPlayerAccount,
   getUserRoleLists,
   getUserSingleAccount,
   updatePlayerAccount,
} from '../../App/Features/userManagement/userManagementActions';
import {
   createPlayerAccountInfoSelector,
   createPlayerAccountLoadingSelector,
   createPlayerAccountErrorSelector,
   createPlayerAccountInvalidErrorsSelector,
   singleUserAccountInfoSelector,
   singleUserAccountLoadingSelector,
   singleUserAccountErrorSelector,
   showSetPasswordPopupSelector,
   pickedImageSelector,
   userRolesListSelector,
   userRolesListLoadingSelector,
} from './PlayersAccount.Selector';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { removeAccountErrors } from '../../App/Features/userManagement/userManagementSlice';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import SetAccountPasswordPopupComponent from '../../Components/SetAccountPasswordPopupComponent/SetAccountPasswordPopupComponent';
import { AnimatePresence } from 'framer-motion';
import { showAndHidePwdPopupHandler } from '../../App/Features/Admin/adminSlice';
import { removePickedImage, showPickerPopUpHandler } from '../../App/Features/Media/MediaSlice';
import { CgColorPicker } from '@react-icons/all-files/cg/CgColorPicker';
import AutoCompleteTagComponent from '../../Components/AutoCompleteTagComponent/AutoCompleteTagComponent';

const schema = yup.object({
   name: yup.string().required('Name is reuqired'),
   email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
   roles: yup
      .array()
      .of(
         yup.object().shape({
            _id: yup.string(),
            roleName: yup.string(),
         })
      )
      .required('Roles is a required filed')
      .min(1),
});

function PlayersAccountsPage() { 
   const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
      reset,
      getValues,
   } = useForm({
      defaultValues: {
         name: '',
         email: '',
         active: false,
         avatar: '',
         accountEnable: true,
         roles: null,
      },
      resolver: yupResolver(schema),
   });

   const {
      userRoles: { isAdmin },
   } = useRoles();
   const dispatch = useDispatch();
   const param = useParams();

   const createPlayerAccountInfo = useSelector(createPlayerAccountInfoSelector);
   const createPlayerAccountLoading = useSelector(createPlayerAccountLoadingSelector);
   const createPlayerAccountError = useSelector(createPlayerAccountErrorSelector);
   const createPlayerAccountInvalidErrors = useSelector(createPlayerAccountInvalidErrorsSelector);
   const singleUserAccountInfo = useSelector(singleUserAccountInfoSelector);
   const singleUserAccountLoading = useSelector(singleUserAccountLoadingSelector);
   const singleUserAccountError = useSelector(singleUserAccountErrorSelector);
   const showSetPasswordPopup = useSelector(showSetPasswordPopupSelector);
   const pickedImage = useSelector(pickedImageSelector);
   const userRolesList = useSelector(userRolesListSelector);
   const userRolesListLoading = useSelector(userRolesListLoadingSelector);

   const createHandler = function (data) {
      if (isAdmin) {
         if (!!param && param?.id) {
            dispatch(updatePlayerAccount(Object.assign(data, { userId: param?.id })));
         } else {
            const { email, name } = data;
            if (!email || !name) return message.error(`${(!name && 'name') || (!email && 'email')} is required`);
            dispatch(createPlayerAccount(data));
            dispatch(removeAccountErrors());
         }
      } else {
         return message.error('You need to login first');
      }
   };

   const setPasswordHandler = function () {
      dispatch(showAndHidePwdPopupHandler(true));
   };

   const pickedImageHander = function () {
      dispatch(showPickerPopUpHandler(true));
   };

   useEffect(() => {
      if (isAdmin) {
         if (!!param && param?.id) {
            dispatch(getUserSingleAccount({ userId: param?.id }));
         } else {
            reset();
         }

         if (!userRolesList) {
            dispatch(getUserRoleLists());
         }
      }
   }, [isAdmin, param]);

   useEffect(() => {
      if (!!singleUserAccountInfo && singleUserAccountInfo?.success && singleUserAccountInfo?.item) {
         const { item, roles } = singleUserAccountInfo?.item;
         setValue('name', item?.name);
         setValue('active', item?.active);
         setValue('email', item?.email);
         setValue('avatar', item?.avatar);
         setValue('accountEnable', item?.accountEnable);
         setValue('roles', !!roles && roles.length ? roles : null);
      }
   }, [singleUserAccountInfo]);

   useEffect(() => {
      if (pickedImage) {
         setValue('avatar', pickedImage);
      }
   }, [pickedImage]);

   useEffect(() => {
      return () => {
         dispatch(removeAccountErrors());
         dispatch(removePickedImage());
      };
   }, []);

   return (
      <styled.div>
         <AnimatePresence>{!!showSetPasswordPopup && <SetAccountPasswordPopupComponent />}</AnimatePresence>
         <NavbarComponent />
         <div className="container_div">
            {!!singleUserAccountLoading && <SpinnerComponent />}
            {!!singleUserAccountError && <p className="text-sm error_cl">{singleUserAccountError}</p>}
            <PageHeadingComponent
               pageName={'Players Accounts'}
               heading={!!param && param?.id ? 'Update players accounts' : 'Create players accounts'}
               para={
                  'Please Note: Please first manually verify player accounts by reviewing and approving required documents or identification proofs. then create the player account'
               }
            />
            <div className="py-3">
               <form onSubmit={handleSubmit(createHandler)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <div className="flex items-center space-x-2">
                        <div className="w-full">
                           <Controller
                              name="name"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    onChange={onChange}
                                    value={value}
                                    className="w-full"
                                    label="User name"
                                    variant="outlined"
                                 />
                              )}
                           />
                           {!!errors?.name?.message && <p className="text-sm error_cl">{errors?.name?.message}</p>}
                        </div>
                        <div className="w-full">
                           <Controller
                              name="email"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    onChange={onChange}
                                    value={value}
                                    className="w-full"
                                    label="Account email"
                                    variant="outlined"
                                 />
                              )}
                           />
                           {!!errors?.email?.message && <p className="text-sm error_cl">{errors?.email?.message}</p>}
                        </div>
                        <div className="w-full">
                           {!!userRolesListLoading && <SpinnerComponent />}
                           {!!userRolesList && userRolesList?.success && userRolesList?.items && (
                              <Controller
                                 name="roles"
                                 control={control}
                                 render={({ field: { onChange, value } }) => (
                                    <AutoCompleteTagComponent
                                       value={value}
                                       onChange={onChange}
                                       setValue={setValue}
                                       getValues={getValues}
                                       items={userRolesList?.items}
                                       filed={'roles'}
                                       label={'Role'}
                                       fieldName={'roleName'}
                                    />
                                 )}
                              />
                           )}
                           {errors?.roles?.message && <p className="text-sm error_cl">{errors?.roles?.message}</p>}
                        </div>
                     </div>
                     <div className="flex items-center space-x-5">
                        <div className="flex items-center space-x-4 pt-2">
                           <Controller
                              name="active"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <Switch
                                    onChange={onChange}
                                    checked={value}
                                    checkedChildren={'Yes'}
                                    unCheckedChildren={'No'}
                                    defaultChecked
                                 />
                              )}
                           />
                           <p className="text-gray-300 font-medium">Account active</p>
                        </div>
                        <div className="flex items-center space-x-4 pt-2">
                           <Controller
                              name="accountEnable"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <Switch
                                    onChange={onChange}
                                    checked={value}
                                    checkedChildren={'Yes'}
                                    unCheckedChildren={'No'}
                                    defaultChecked
                                 />
                              )}
                           />
                           <p className="text-gray-300 font-medium">Account enable</p>
                        </div>
                     </div>
                     <div className="py-4">
                        <div className="image_picker">
                           <CgColorPicker
                              className="text-gray-200 text-xl cursor-pointer"
                              onClick={() => pickedImageHander()}
                           />
                        </div>
                        <p className="text-gray-300 font-medium mb-2 mt-2">User profile</p>
                        <div className="image_prev mt-2">
                           <Controller
                              name="avatar"
                              control={control}
                              render={({ field: { value } }) => !!value && <img src={value} />}
                           />
                        </div>
                     </div>
                     <div className="pt-2 flex items-center space-x-2">
                        <div>
                           <div className="flex items-center space-x-3">
                              <CustomButtonComponent
                                 isLoading={createPlayerAccountLoading}
                                 type={'submit'}
                                 text={!!param && param?.id ? 'Updated' : 'Create'}
                                 btnCl={'Publish'}
                              />
                              <CustomButtonComponent onClick={() => reset()} text={'Clear'} btnCl={'Publish'} />
                           </div>
                        </div>
                        {!!param &&
                           param?.id &&
                           !!singleUserAccountInfo &&
                           singleUserAccountInfo?.success &&
                           singleUserAccountInfo?.item && (
                              <CustomButtonComponent
                                 onClick={setPasswordHandler}
                                 text={'Set Password'}
                                 btnCl={'Publish'}
                              />
                           )}
                     </div>
                     <div>
                        {!!createPlayerAccountError && (
                           <div className="py-2">
                              <p className="text-sm error_cl">{createPlayerAccountError}</p>
                           </div>
                        )}
                        {!!createPlayerAccountInfo && createPlayerAccountInfo?.error && (
                           <p className="py-2 text-sm error_cl">{createPlayerAccountInfo?.message}</p>
                        )}
                     </div>
                  </Box>
               </form>
               {!!createPlayerAccountInvalidErrors && createPlayerAccountInvalidErrors?.error && (
                  <div className="w-6/12 py-4">
                     <Stack spacing={1}>
                        {createPlayerAccountInvalidErrors?.error.map((el) => (
                           <Alert key={el?.value + el?.param} severity="error">
                              {el?.msg}
                           </Alert>
                        ))}
                     </Stack>
                  </div>
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default PlayersAccountsPage;
