import React from 'react';
import ReactDOM from 'react-dom';
import * as styled from './SetAccountPasswordPopupComponent.style';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { showAndHidePwdPopupHandler } from '../../App/Features/Admin/adminSlice';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { message } from 'antd';
import { setPlayerAccountPassword } from '../../App/Features/userManagement/userManagementActions';
import {
   accountPasswordChangeLoadingSelector,
   accountPasswordChangeErrorSelector,
} from './SetAccountPassword.Selector';

const schema = yup.object({
   password: yup
      .string()
      .required('Account password is required')
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
         'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
});

function SetAccountPasswordPopupComponent() {
   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm({
      defaultValues: {
         password: '',
      },
      resolver: yupResolver(schema),
   });

   const param = useParams();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();

   const accountPasswordChangeLoading = useSelector(accountPasswordChangeLoadingSelector);
   const accountPasswordChangeError = useSelector(accountPasswordChangeErrorSelector);

   const closeHandler = function () {
      dispatch(showAndHidePwdPopupHandler(false));
   };

   const onSubmitHandler = function (data) {
      if (!isAdmin) return message.error('You need to login first');
      dispatch(
         setPlayerAccountPassword({
            password: data?.password,
            accountId: param?.id,
         })
      );
   };

   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="popDiv"
         >
            <div className="close_div">
               <VscClose onClick={closeHandler} />
            </div>
            <div className="over_flow" onClick={closeHandler} />
            <div className="content">
               <p className="text-gray-200 font-medium mb-4">Set account password</p>
               <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className="w-full">
                     <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <TextField
                              onChange={onChange}
                              value={value}
                              className="w-full"
                              label="Account password"
                              variant="outlined"
                           />
                        )}
                     />
                     {!!errors?.password?.message && <p className="text-sm error_cl">{errors?.password?.message}</p>}
                  </div>
                  <div className="pt-4 pb-3">
                     <div className="flex">
                        <CustomButtonComponent
                           isLoading={accountPasswordChangeLoading}
                           type={'submit'}
                           text={'Set'}
                           btnCl={'Publish'}
                        />
                     </div>
                     {!!accountPasswordChangeError && <p className="text-sm error_cl">{accountPasswordChangeError}</p>}
                  </div>
               </form>
            </div>
         </motion.div>
      </styled.div>,
      document.getElementById('pwd')
   );
}

export default SetAccountPasswordPopupComponent;
