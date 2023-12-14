import React from 'react';
import * as styled from './SignUpOptionsComponent.style';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { GrTwitter } from '@react-icons/all-files/gr/GrTwitter';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import {
   signUpWithGoogle,
   signInWithMetaMask,
} from '../../App/Features/Auth/authActions';
import jwtDecode from 'jwt-decode';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { signInWithMetaMaskHandler } from '../../blockchain/userAuth';
import toast from 'react-hot-toast';

function SignUpOptionsComponent() {
   const dispatch = useDispatch();

   const credentialResponse = function (data) {
      const decodeValues = jwtDecode(data?.credential);
      dispatch(signUpWithGoogle(decodeValues));
   };

   const metaMaskHandler = async function () {
      const varifyRespsoe = await signInWithMetaMaskHandler();

      if (!varifyRespsoe?.walletAddress) {
         return toast.error(varifyRespsoe?.message);
      }

      dispatch(signInWithMetaMask({ data: varifyRespsoe }));
   };

   // const FbLoginSuccessHandler = function (data) {
   //    console.log(data);
   // };

   // const FbLoginRejectHandler = function (data) {
   //    console.log(data);
   // };

   return (
      <styled.div>
         <div className="social_login">
            {/* <LoginSocialFacebook
               appId={process.env.REACT_APP_FACEBOOK_APP_ID}
               onResolve={FbLoginSuccessHandler}
               onReject={FbLoginRejectHandler}
            >
               <div className="_link _fb">
                  <FaFacebookF className="_icon" />
               </div>
            </LoginSocialFacebook> */}
            <div className="_link _google">
               <GoogleLogin
                  onSuccess={credentialResponse}
                  type="icon"
                  shape="circle"
               />
            </div>
            <div
               className="_link _meta_marks _icon_div"
               onClick={() => metaMaskHandler()}
            >
               <img src="/images/Metamask-icon.svg" alt="" />
            </div>
            {/* <div className="_link _twitter">
               <GrTwitter className="_icon" />
            </div> */}
         </div>
      </styled.div>
   );
}

export default SignUpOptionsComponent;
