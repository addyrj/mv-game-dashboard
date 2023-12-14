import React from 'react';
import * as styled from './PaymentOptionsBannerComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function PaymentOptionsBannerComponent() {
   return (
      <styled.div className="my-4 flex items-center justify-center sm:justify-start">
         <div className="text-center text-sm-start">
            <h1 className="text-xl lg:text-3xl text-gray-100 font-medium">
               Fast and Easy Way Buy Crypto Currency{' '}
            </h1>
            <h2 className="mt-3 text-gray-200 text-xl lg:text-3xl">
               Up to <span className=" font-bold">1 BTC</span> Deposit Bonus
            </h2>
            <styled.iconDiv className="sm:flex block items-center py-4 space-x-4 justify-center sm:justify-start">
               <div className="box w-auto">
                  <LazyLoadImage src="/images/google-pay-icon.png" />
               </div>
               <div className="box w-auto">
                  <LazyLoadImage src="/images/master-card-icon.png" />
               </div>
               <div className="box w-auto">
                  <LazyLoadImage src="/images/visa-card-icon.png" />
               </div>
            </styled.iconDiv>
            <div className="flex items-center justify-center sm:justify-start">
               <CustomButtonComponent btnCl={'payBtn'} text={'Buy Now'} />
            </div>
         </div>
      </styled.div>
   );
}

export default PaymentOptionsBannerComponent;
