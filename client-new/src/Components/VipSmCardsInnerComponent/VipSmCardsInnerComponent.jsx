import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as styled from './VipSmCardsInnerComponent.style';

function VipSmCardsInnerComponent({
   heading,
   subHeading,
   imgSrc,
   cl,
   onClick,
}) {
   return (
      <styled.div className="flex items-center pb-2">
         <div className={`flex items-center sp_div ${cl}`} onClick={onClick}>
            <div className="icons_div">
               <LazyLoadImage src={imgSrc} alt="spin image" />
            </div>
            <div className="ms-3">
               <h5 className="text-gray-100">{heading}</h5>
               <span className="text-gray-500">{subHeading}</span>
            </div>
         </div>
      </styled.div>
   );
}

export default VipSmCardsInnerComponent;
