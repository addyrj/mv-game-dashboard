import React, { useEffect, useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import * as styled from './OtpVarificationComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp, verifyOtp } from '../../App/Features/Auth/authActions';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   removeOtpErrors,
   removeOtpInfo,
} from '../../App/Features/Auth/authSlice';
import { useNavigate } from 'react-router';
import {
   authSelector,
   authLoadingSelector,
   otpErrorSelector,
   resendOtpInfoSelector,
   resendOtpLoadingSelector,
   resendOtpErrorSelector,
} from './OtpVarification.Selector';

function OtpVarificationComponent({ close }) {
   const [otp, setOtp] = useState('');
   const [cookie] = useCookies(['otp_access_token']);
   const [Error, setError] = useState(null);
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const auth = useSelector(authSelector);
   const authLoading = useSelector(authLoadingSelector);
   const otpError = useSelector(otpErrorSelector);
   const resendOtpInfo = useSelector(resendOtpInfoSelector);
   const resendOtpLoading = useSelector(resendOtpLoadingSelector);
   const resendOtpError = useSelector(resendOtpErrorSelector);

   const handleChange = (newValue) => {
      setOtp(newValue);
   };

   const decodeUserToken = function (token) {
      const decodeAccessToken = jwtDecode(token);
      return decodeAccessToken;
   };

   const VerifyHandler = function () {
      if (otp.length !== 6) {
         return setError('Please fill valid otp');
      }

      const otpAccessToken = cookie?.otp_access_token;

      if (!otpAccessToken) {
         return setError('No otp access token');
      }

      dispatch(verifyOtp({ otp, token: otpAccessToken }));
      navigation('/');
      dispatch(removeOtpInfo());
   };

   const ResendOtpHandler = function () {
      const otpAccessToken = cookie?.otp_access_token;
      const decodeAccessToken = decodeUserToken(otpAccessToken);
      const { _id, userId, email } = decodeAccessToken;
      dispatch(resendOtp({ _id, userId, email }));
      setError(null);
   };

   useEffect(() => {
      if (!!auth && auth?.success && auth?.user) {
         close();
      }
   }, [auth]);

   useEffect(() => {
      return () => {
         dispatch(removeOtpErrors());
      };
   }, []);

   return (
      <styled.div>
         <div>
            <h5 className="text-gray-300 text-2xl font-bold">OTP Verfiation</h5>
            <p className="text-gray-400 mt-3">
               Enter your OTP you received. <b>otp expire in 5 minutes</b>
            </p>
            <p className="text-gray-500 text-sm mt-1">
               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="mt-4 mb-4">
               <MuiOtpInput value={otp} length={6} onChange={handleChange} />
            </div>
            <CustomButtonComponent
               btnCl={'large_btn large_sn_btn'}
               text={'verify'}
               onClick={VerifyHandler}
               isLoading={authLoading}
            />
            {/* {!Error && !!authFetchError ? (
               <p className="text-center mt-2 text-sm error_cl">
                  {authFetchError}
               </p>
            ) : null} */}
            {!!resendOtpLoading ? <SpennerComponent /> : null}
            <div className="flex items-center justify-center mt-3">
               {!!otpError ? (
                  <p className="text-center error_cl">{otpError}</p>
               ) : null}
               {!!otpError ? (
                  <p
                     onClick={ResendOtpHandler}
                     className="text-sky-500 ms-2 text-center cursor-pointer"
                  >
                     Resend otp
                  </p>
               ) : null}
            </div>
            {!Error && !!resendOtpInfo && resendOtpInfo?.success ? (
               <p className="text-sm text-gray-200 text-center">
                  {resendOtpInfo?.message}
               </p>
            ) : null}
            {!!resendOtpError ? (
               <p className="text-sm mt-2 error_cl">{resendOtpError}</p>
            ) : null}
         </div>
      </styled.div>
   );
}

export default OtpVarificationComponent;
