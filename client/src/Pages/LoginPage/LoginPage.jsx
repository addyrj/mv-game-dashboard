import React, { useEffect } from 'react';
import * as styled from './LoginPage.style';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../App/Features/Auth/authActions';
import { useNavigate } from 'react-router';
import { authSelector, authLoadingSelector, authErrorSelector } from './Login.Selector';

const schema = yup.object({
   email: yup.string().email().required('Please enter your email'),
   password: yup
      .string()
      .required('Account password is required')
      .matches(
         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
         'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
});

function LoginPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: yupResolver(schema) });
   const navigation = useNavigate();

   const auth = useSelector(authSelector);
   const authLoading = useSelector(authLoadingSelector);
   const authError = useSelector(authErrorSelector);

   const dispatch = useDispatch();

   const onSubmit = function (data) {
      dispatch(login(data));
   };

   useEffect(() => {
      if (!!auth && auth?.success && auth?.user) {
         navigation('/');
      }
   }, [auth]);

   return (
      <styled.div>
         <styled.loginFormDiv className=" shadow-lg">
            <styled.loginInputGroups>
               <img src="/images/logo_blc.png" alt="logo" />
               <div className="login_div">
                  <div className="form_group">
                     <h1 className="text-5xl text-gray-100 font-bold">Welcome back,</h1>
                     <p className="text-gray-200  mt-2">Welcome back! Please enter your details</p>
                     <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <Box
                           sx={{
                              '& > :not(style)': { my: 1, width: '100%' },
                           }}
                           noValidate
                           autoComplete="off"
                        >
                           <TextField label="Email" type={'email'} variant="standard" {...register('email')} />
                           {errors?.email ? <p className="text-red-400 text-sm">{errors?.email?.message}</p> : null}
                           <TextField label="Password" type={'password'} variant="standard" {...register('password')} />
                           {errors?.password ? (
                              <p className="text-red-400 text-sm">{errors?.password?.message}</p>
                           ) : null}
                        </Box>
                        <CustomButtonComponent
                           type={'submit'}
                           btnCl={'login_btn mt-4'}
                           text={'Log in'}
                           isLoading={authLoading}
                        />
                        <p className="mt-3 text-sm text-gray-500">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, labore.
                        </p>
                        {!!authError ? <p className="text-sm error_cl mt-2">{authError}</p> : null}
                        {!!auth && !auth?.success ? <p className="text-sm error_cl mt-2">{auth?.message}</p> : null}
                     </form>
                  </div>
               </div>
            </styled.loginInputGroups>
            <styled.imgPrvDiv />
         </styled.loginFormDiv>
      </styled.div>
   );
}

export default LoginPage;
