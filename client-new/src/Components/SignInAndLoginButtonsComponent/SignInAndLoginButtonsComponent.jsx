import React, { Fragment, useState } from 'react';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import SignInAndLoginContainerComponent from '../SignInAndLoginContainerComponent/SignInAndLoginContainerComponent';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
   authSelector,
   showOtpVarificationPopupSelector,
} from './SignInAndLogin.Selector';
import ResetPasswordComponent from '../ResetPasswordComponent/ResetPasswordComponent';
import OtpVarificationContainerComponent from '../OtpVarificationContainerComponent/OtpVarificationContainerComponent';
import {
   removeAuthInfo,
   showOtpPopupHandler,
} from '../../App/Features/Auth/authSlice';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

function SignInAndLoginButtonsComponent() {
   const navigation = useNavigate();
   const [cookie] = useCookies();
   const [params, setSearchParams] = useSearchParams();
   const param = params.get('user');
   const [ShowPopUp, setShowPopUp] = useState(false);
   const [ShowResetPopUp, setShowResetPopUp] = useState(true);
   const [ShowOtpVarification, setShowOtpVarification] = useState(true);
   const dispatch = useDispatch();

   const decodeAccessToken =
      !!cookie && cookie?._rq_password_token
         ? jwtDecode(cookie?._rq_password_token)
         : null;
   const now = new Date();
   const decodeOtpToken =
      !!cookie && cookie?.otp_access_token
         ? jwtDecode(cookie?.otp_access_token)
         : null;

   const auth = useSelector(authSelector);
   const showOtpVarificationPopup = useSelector(
      showOtpVarificationPopupSelector
   );

   const resetPasswordModel = function () {
      setShowResetPopUp(false);
      navigation('?#');
   };

   const otpVarifcationHandler = function () {
      setShowOtpVarification(false);
      navigation('?#');
      dispatch(showOtpPopupHandler({ data: false }));
   };

   const showPopupHandler = function (event, input) {
      if (auth && !auth?.success) {
         dispatch(removeAuthInfo());
      }

      if (input === 'signIn' || input === 'signUp') {
         setSearchParams({ p: input });
      }

      if (input === 'overlay') {
         if (event.target.id === '_singin_popUp') {
            setShowPopUp(false);
            setTimeout(() => {
               setSearchParams('');
            }, 150);
         }
      } else {
         setShowPopUp(!ShowPopUp);
      }
   };

   const closeHandler = function () {
      setShowPopUp(false);
      setTimeout(() => {
         setSearchParams('');
      }, 150);
   };

   return (
      <Fragment>
         <AnimatePresence>
            {!!decodeAccessToken &&
            !!param &&
            !(decodeAccessToken.exp * 1000 < now.getTime()) &&
            cookie?._rq_password_token &&
            ShowResetPopUp ? (
               <ResetPasswordComponent close={resetPasswordModel} />
            ) : null}
         </AnimatePresence>
         <AnimatePresence>
            {
               // (!!decodeOtpToken &&
               //    !(decodeOtpToken.exp * 1000 < now.getTime()) &&
               //    cookie?._rq_password_token &&
               //    ShowOtpVarification) ||
               showOtpVarificationPopup ? (
                  <OtpVarificationContainerComponent
                     close={otpVarifcationHandler}
                  />
               ) : null
            }
         </AnimatePresence>
         {!!auth?.error || !auth ? (
            <SignInAndLoginContainerComponent
               showHandler={showPopupHandler}
               show={ShowPopUp}
               close={closeHandler}
            />
         ) : null}
         <div className="me-4">
            <p
               className="text-gray-400 cursor-pointer hover:text-gray-100 font-medium"
               onClick={(event) => showPopupHandler(event, 'signIn')}
            >
               Sign in
            </p>
         </div>
         <CustomButtonComponent
            btnCl={'singIn_button'}
            isLoading={false}
            onClick={(event) => showPopupHandler(event, 'signUp')}
         >
            <p>Sign up</p>
         </CustomButtonComponent>
      </Fragment>
   );
}

export default SignInAndLoginButtonsComponent;
