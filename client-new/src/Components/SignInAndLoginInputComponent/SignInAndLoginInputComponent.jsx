import React, { useState, useEffect } from 'react';
import * as styled from './SignInAndLoginInputComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signUp, signIn } from '../../App/Features/Auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, Typography } from '@mui/material';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import SignUpOptionsComponent from '../SignUpOptionsComponent/SignUpOptionsComponent';
import { AiOutlineEyeInvisible } from '@react-icons/all-files/ai/AiOutlineEyeInvisible';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
   otpVarificationShowHandler,
   removeAuthErrorHandler,
   removeAuthInfo,
   removeSignUpError,
   showOtpPopupHandler,
} from '../../App/Features/Auth/authSlice';
import {
   authSelector,
   signUpInfoSelector,
   signUpLoadingSelector,
   signUpErrorSelector,
   authFetchErrorSelector,
   authLoadingSelector,
   invalidAuthErrorsSelector,
   showOtpVarificationNotificationSelector,
} from './SignInAndLogin.Selector';
import toast from 'react-hot-toast';

const signUpSchema = yup.object({
   email: yup.string().email().required('Please enter your email').lowercase(),
   password: yup
      .string()
      .required('Account password is required')
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
         'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
   // check: yup.boolean().isTrue().required('Confirm the user Agreement'),
});

const signInSchema = yup.object({
   email: yup.string().email().required('Please enter your email').lowercase(),
   password: yup.string().required('Account password is required'),
});

function SignInAndLoginInputComponent({ closeHandler }) {
   const [AuthForm, setAuthForm] = useState(false);
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      control,
      getValues,
   } = useForm({
      resolver: yupResolver(!AuthForm ? signUpSchema : signInSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });
   const dispatch = useDispatch();
   const [ShowPwd, setShowPwd] = useState(false);
   const [params] = useSearchParams();
   const popUp = params.get('p');
   const navigation = useNavigate();
   const [cookie] = useCookies(['account_varification']);

   const auth = useSelector(authSelector);
   const signUpInfo = useSelector(signUpInfoSelector);
   const signUpLoading = useSelector(signUpLoadingSelector);
   const signUpError = useSelector(signUpErrorSelector);
   const authFetchError = useSelector(authFetchErrorSelector);
   const authLoading = useSelector(authLoadingSelector);
   const invalidAuthErrors = useSelector(invalidAuthErrorsSelector);
   const showOtpVarificationNotification = useSelector(
      showOtpVarificationNotificationSelector
   );

   const ShowAndHidePassword = function () {
      setShowPwd(!ShowPwd);
   };

   const onSubmit = function (data) {
      if (!AuthForm) {
         if (!data?.check) {
            return toast.error('Please confirm the checkbox.');
         }
         dispatch(signUp(data));
      } else {
         dispatch(signIn(data));
      }
   };

   const ChangeAuthForm = function (data) {
      if (signUpInfo) {
         dispatch(removeSignUpError());
      }
      if (auth && !auth?.success) {
         dispatch(removeAuthInfo());
      }
      setAuthForm(data);
      reset();
   };

   const OtpVarificationHandler = function () {
      closeHandler();
      navigation('/');
      dispatch(removeAuthErrorHandler());
      dispatch(showOtpPopupHandler({ data: true }));
   };

   useEffect(() => {
      if (!!popUp) {
         if (popUp === 'signIn') {
            setAuthForm(true);
         } else if (popUp === 'signUp') {
            setAuthForm(false);
         }
      }
   }, [popUp]);

   useEffect(() => {
      return () => {
         reset();
         dispatch(removeSignUpError());
      };
   }, []);

   useEffect(() => {
      if (!!authFetchError && authFetchError?.otp_token) {
         dispatch(otpVarificationShowHandler({ data: true }));
      }
   }, [authFetchError]);

   return (
      <styled.div className="form_input_div">
         <div className="form_div p-3 mt-3">
            <h5 className="text-white text-lg mb-3">
               {AuthForm ? 'Sign In' : 'Sign Up'}
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Box
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                     padding: '5px',
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <Controller
                     name="email"
                     control={control}
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           label="Email Address"
                           variant="outlined"
                           onChange={onChange}
                           value={value}
                        />
                     )}
                  />
                  {errors?.email ? (
                     <p className="text-red-400 text-sm">
                        {errors?.email?.message}
                     </p>
                  ) : null}
                  {/* under process */}
                  <Controller
                     name="password"
                     control={control}
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           onChange={onChange}
                           value={value}
                           label="Login Password"
                           variant="outlined"
                           type={ShowPwd ? 'text' : 'password'}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    {ShowPwd ? (
                                       <AiOutlineEyeInvisible
                                          onClick={ShowAndHidePassword}
                                          className=" cursor-pointer"
                                       />
                                    ) : (
                                       <FaEye
                                          onClick={ShowAndHidePassword}
                                          className=" cursor-pointer"
                                       />
                                    )}
                                 </InputAdornment>
                              ),
                           }}
                        />
                     )}
                  />
                  {/* under process */}
                  {errors?.password ? (
                     <p className="text-red-400 text-sm">
                        {errors?.password?.message}
                     </p>
                  ) : null}
                  {!AuthForm ? (
                     <>
                        <div className="flex items-start mb-3">
                           <Checkbox size="small" {...register('check')} />
                           <p className="text-gray-500 text-sm mb-0">
                              I agree to the{' '}
                              <strong className="text-white">
                                 User Agreement
                              </strong>{' '}
                              & confirm I am at least 18 years old
                           </p>
                        </div>
                     </>
                  ) : (
                     <div className="flex justify-end forget_password">
                        <p
                           className="text-gray-400 text-sm hover:text-sky-500"
                           onClick={() => navigation('?p=forgetPassword')}
                        >
                           Forgot password?
                        </p>
                     </div>
                  )}
                  <div>
                     <div className="flex align-items-center justify-content-center mt-4 button_group">
                        {AuthForm ? (
                           <CustomButtonComponent
                              text={'Sign In'}
                              btnCl={
                                 !AuthForm ? `bg_none` : `SignUp_large_button`
                              }
                              type={AuthForm ? 'submit' : 'button'}
                              isLoading={AuthForm ? authLoading : null}
                              width={'100%'}
                           />
                        ) : (
                           <CustomButtonComponent
                              text={'Sign Up'}
                              btnCl={
                                 AuthForm ? `bg_none` : `SignUp_large_button`
                              }
                              type={!AuthForm ? 'submit' : 'button'}
                              isLoading={signUpLoading}
                              width={'100%'}
                           />
                        )}
                     </div>
                     {AuthForm ? (
                        <div className="text-center flex items-center mt-4 justify-center">
                           <p className="text-gray-100 text-sm">
                              New to Mv.Games?
                           </p>
                           <p
                              className="text-green-500 text-sm ms-2 cursor-pointer"
                              onClick={() => ChangeAuthForm(false)}
                           >
                              Create account
                           </p>
                        </div>
                     ) : (
                        <div className="text-center flex items-center mt-4 justify-center">
                           <p className="text-gray-100 text-sm">
                              Already have an account?
                           </p>
                           <p
                              className="text-green-500 text-sm ms-2 cursor-pointer"
                              onClick={() => ChangeAuthForm(true)}
                           >
                              Sign in
                           </p>
                        </div>
                     )}
                     {
                        // (!signUpInfo &&
                        //    !!cookie &&
                        //    cookie?.account_varification) ||
                        showOtpVarificationNotification && (
                           <div className="text-center p-2">
                              <span
                                 className="text-sky-500 text-sm cursor-pointer"
                                 onClick={OtpVarificationHandler}
                              >
                                 Click here to verify otp
                              </span>
                           </div>
                        )
                     }
                     {!!signUpInfo && signUpInfo?.success ? (
                        <p className="text-sm text-center mt-2 text-gray-300">
                           {signUpInfo?.message}{' '}
                           <span
                              className="text-sky-500 text-sm cursor-pointer"
                              onClick={OtpVarificationHandler}
                           >
                              Click here to verify
                           </span>
                        </p>
                     ) : null}
                     {!!signUpInfo && signUpInfo?.error ? (
                        <p className="text-sm error_cl text-center mt-2 text-gray-300">
                           {signUpInfo?.message}
                        </p>
                     ) : null}
                     <div>
                        <styled.Loginwith
                           className={`${
                              AuthForm ? '_margin mg' : 'login_with mg'
                           } `}
                        >
                           <div className="border-b-neutral-800 border-bottom _parent">
                              <Typography className="_para" component="p">
                                 Or login with
                              </Typography>
                           </div>
                           <SignUpOptionsComponent />
                        </styled.Loginwith>
                     </div>
                  </div>
                  {!!auth?.error ? (
                     <p className="text-center error_cl mt-3">{auth.message}</p>
                  ) : null}
                  {!!signUpError ? (
                     <p className="text-sm error_cl mt-3">{signUpError}</p>
                  ) : null}
                  {!!authFetchError ? (
                     <p className="text-center error_cl mt-3">
                        {authFetchError?.message}
                     </p>
                  ) : null}
                  {!!invalidAuthErrors && invalidAuthErrors?.error
                     ? invalidAuthErrors?.error.map((el, i) => (
                          <div key={i}>
                             <p className="error_cl mt-3">{el.msg}</p>
                          </div>
                       ))
                     : null}
               </Box>
            </form>
         </div>
      </styled.div>
   );
}

export default SignInAndLoginInputComponent;
