import React from 'react';
import * as styled from './ForgetPasswordInputComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../App/Features/Auth/authActions';
import { useNavigate } from 'react-router';
import {
   forgetPasswordInfoSelector,
   forgetPasswordLoadingSelector,
   forgetPasswordFetchErrorSelector,
} from './ForgetPassword.Selector';

const schema = yup.object({
   email: yup.string().email().required('Please enter your email'),
});

function ForgetPasswordInputComponent() {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const navigation = useNavigate();
   const forgetPasswordInfo = useSelector(forgetPasswordInfoSelector);
   const forgetPasswordLoading = useSelector(forgetPasswordLoadingSelector);
   const forgetPasswordFetchError = useSelector(
      forgetPasswordFetchErrorSelector
   );

   const dispatch = useDispatch();

   const onSubmit = function (data) {
      dispatch(forgetPassword(data));
   };

   return (
      <styled.div>
         <div className="inner_div">
            <p
               className="text-blue-500 backbtn"
               onClick={() => navigation('?p=signIn')}
            >
               Back to login
            </p>
            <h5 className="text-gray-200 font-normal text-2xl mt-2 mb-2">
               Forgot Password
            </h5>
            <span className="text-gray-400 text-sm">
               Send a link to your email to reset your password
            </span>
            <div className="mt-4">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField
                        {...register('email')}
                        label="Email"
                        variant="outlined"
                        required
                     />
                     {errors?.email ? (
                        <p className="text-red-400 text-sm">
                           {errors?.email?.message}
                        </p>
                     ) : null}
                     <CustomButtonComponent
                        text={'Send Resent Link'}
                        type={'submit'}
                        btnCl={'large_btn mt-3 large_sn_btn'}
                        isLoading={forgetPasswordLoading}
                     />
                     {!!forgetPasswordFetchError ? (
                        <p className="text-sm error_cl">
                           {forgetPasswordFetchError}
                        </p>
                     ) : null}
                     {!!forgetPasswordInfo && forgetPasswordInfo?.success ? (
                        <p className="text-gray-400 text-sm mt-2">
                           {forgetPasswordInfo?.msg}
                        </p>
                     ) : null}
                  </Box>
               </form>
            </div>
         </div>
      </styled.div>
   );
}

export default ForgetPasswordInputComponent;
