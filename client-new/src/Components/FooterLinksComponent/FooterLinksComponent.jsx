import React from 'react';
import * as styled from './FooterLinksComponent.style';
import uuid from 'react-uuid';
import { ListArOne, sportsAr, promoAr, SupportAr, AboutAr } from './FooterAr';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function FooterLinksComponent() {
   return (
      <styled.div className="mb-5">
         <div className="list_div mb-2 mb-md-0">
            <h1 className="text-red-500 font-medium">CASINO</h1>
            <div className="my-3 my-md-4">
               {ListArOne.map((el) => (
                  <p className="text-gray-400 text-md mb-3" key={uuid()}>
                     {el.name}
                  </p>
               ))}
            </div>
         </div>
         <div className="list_div mb-2 mb-md-0">
            <h1 className="text-red-500 font-medium">SPORTS</h1>
            <div className="my-3 my-md-4">
               {sportsAr.map((el) => (
                  <p className="text-gray-400 text-md mb-3" key={uuid()}>
                     {el.name}
                  </p>
               ))}
            </div>
         </div>
         <div className="list_div mb-2 mb-md-0">
            <h1 className="text-red-500 font-medium">PROMO</h1>
            <div className="my-3 my-md-4">
               {promoAr.map((el) => (
                  <p className="text-gray-400 text-md mb-3" key={uuid()}>
                     {el.name}
                  </p>
               ))}
            </div>
         </div>
         <div className="list_div mb-2 mb-md-0">
            <h1 className="text-red-500 font-medium">SUPPORT / LEGAL</h1>
            <div className="my-3 my-md-4">
               {SupportAr.map((el) => (
                  <p className="text-gray-400 text-md mb-3" key={uuid()}>
                     {el.name}
                  </p>
               ))}
            </div>
         </div>
         <div className="list_div flex flex-column justify-between">
            <div>
               <h1 className="text-red-500 font-medium">ABOUT US</h1>
               <div className="my-4">
                  {AboutAr.map((el) => (
                     <p className="text-gray-400 text-md mb-3" key={uuid()}>
                        {el.name}
                     </p>
                  ))}
               </div>
            </div>
            <styled.footerIconDiv className="space-x-5 icons_div">
               <div className="icon fb_icon">
                  <LazyLoadImage src="/images/facebook-icon.png" alt="" />
               </div>
               <div className="icon td_icon">
                  <LazyLoadImage src="/images/insta-icon.png" alt="" />
               </div>
               <div className="icon in_icon">
                  <LazyLoadImage src="/images/twitter-icon.png" alt="" />
               </div>
               <div className="icon wd_icon">
                  <LazyLoadImage src="/images/whats-app-icon.png" alt="" />
               </div>
            </styled.footerIconDiv>
         </div>
      </styled.div>
   );
}

export default FooterLinksComponent;
