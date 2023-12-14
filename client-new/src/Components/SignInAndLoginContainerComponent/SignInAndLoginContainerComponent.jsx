import React from 'react';
import ReactDOM from 'react-dom';
import * as styled from './SignInAndLoginContainerComponent.style';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import SignInAndLoginInputComponent from '../SignInAndLoginInputComponent/SignInAndLoginInputComponent';
import ForgetPasswordInputComponent from '../ForgetPasswordInputComponent/ForgetPasswordInputComponent';
import { useSearchParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SignInAndLoginContainerComponent({ show, showHandler, close }) {
   const [params] = useSearchParams();
   const param = params.get('p');

   return ReactDOM.createPortal(
      <styled.div
         show={show}
         onClick={(event) => showHandler(event, 'overlay')}
         id="_singin_popUp"
      >
         <styled.mainDiv show={show}>
            <div className="close_button">
               <VscClose
                  className="text-gray-400"
                  onClick={() => {
                     // showHandler();
                     close();
                  }}
               />
            </div>
            <div className="img_prv_div">
               <div className="welcome_bg_img">
                  <LazyLoadImage src="/images/welcome.png" alt="" />
               </div>
            </div>
            {param === 'signIn' || param === 'signUp' ? (
               <SignInAndLoginInputComponent closeHandler={showHandler} />
            ) : param === 'forgetPassword' ? (
               <ForgetPasswordInputComponent />
            ) : null}
         </styled.mainDiv>
      </styled.div>,
      document.getElementById('signInPortal')
   );
}

export default SignInAndLoginContainerComponent;
