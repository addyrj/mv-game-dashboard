import React from 'react';
import * as styled from './ResetPasswordComponent.style';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../App/Features/Auth/authActions';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { motion } from 'framer-motion';
import {
   resetPasswordInfoSelector,
   resetPasswordLoadingSelector,
   resetPasswordFetchErrorSelector,
} from './ResetPassword.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const schema = yup.object({
   password: yup
      .string()
      .required('Account password is required')
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
         'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
   passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function ResetPasswordComponent({ close }) {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ resolver: yupResolver(schema) });
   const dispatch = useDispatch();

   const resetPasswordInfo = useSelector(resetPasswordInfoSelector);
   const resetPasswordLoading = useSelector(resetPasswordLoadingSelector);
   const resetPasswordFetchError = useSelector(resetPasswordFetchErrorSelector);

   const onSubmit = function (data) {
      dispatch(
         resetPassword({
            password: data.password,
         })
      );
   };

   return ReactDOM.createPortal(
      <styled.div>
         <div className="overLay" onClick={close}></div>
         <motion.div
            initial={{ opacity: 0.4, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.6 }}
            transition={{
               duration: 0.2,
            }}
            className="mainDiv"
         >
            <div className="closeBtn" onClick={close}>
               <VscClose />
            </div>
            <div className="w-50 img_div">
               <div className="img_pc">
                  <LazyLoadImage src="/images/welcome.png" alt="" />
               </div>
            </div>
            <div className="w-50 content_div_parent">
               <div className="content_div">
                  {/* <p className="text-blue-500">Back to login</p> */}
                  <h5 className="text-gray-200 text-2xl my-1">
                     Reset Password
                  </h5>
                  <span className="text-gray-500">
                     Please enter a new password
                  </span>
                  <div className="form_div mt-3">
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                           sx={{
                              '& > :not(style)': { my: 1, width: '100%' },
                           }}
                           noValidate
                           autoComplete="off"
                        >
                           <TextField
                              name="password"
                              {...register('password')}
                              label="New Password"
                              variant="outlined"
                              type={'password'}
                              required
                           />
                           {errors?.password ? (
                              <p className="error_cl text-sm">
                                 {errors?.password?.message}
                              </p>
                           ) : null}
                           <TextField
                              name="passwordConfirmation"
                              {...register('passwordConfirmation')}
                              label="Confirm Password"
                              variant="outlined"
                              type={'password'}
                              required
                           />
                           {errors?.passwordConfirmation ? (
                              <p className="error_cl text-sm">
                                 {errors?.passwordConfirmation?.message}
                              </p>
                           ) : null}
                           <CustomButtonComponent
                              type={'submit'}
                              text={'Save New Password'}
                              btnCl={'large_btn large_sn_btn mt-3'}
                              isLoading={resetPasswordLoading}
                           />
                           {!!resetPasswordFetchError ? (
                              <p className="error_cl text-sm">
                                 {resetPasswordFetchError?.message}
                              </p>
                           ) : null}
                           {!!resetPasswordInfo &&
                           resetPasswordInfo?.success ? (
                              <p className="text-gray-200">
                                 {resetPasswordInfo?.message}
                              </p>
                           ) : null}
                        </Box>
                     </form>
                  </div>
               </div>
            </div>
         </motion.div>
      </styled.div>,
      document.getElementById('reset_password')
   );
}

export default ResetPasswordComponent;
