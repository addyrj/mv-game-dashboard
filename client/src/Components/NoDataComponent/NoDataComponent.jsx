import React from 'react';
import * as styled from './NoDataComponent.style';

function NoDataComponent({ heading, image, center, bg }) {
   return (
      <styled.div center={center} bg={bg}>
         <p className="text-gray-400 text-sm font-medium">{heading}</p>
         <div className="ig_div">
            <img src={image ? image : '/images/empty.webp'} alt="" />
            <div className="erro_text">
               <p className="text-gray-500">Ooops! there is no data.</p>
            </div>
         </div>
      </styled.div>
   );
}

export default NoDataComponent;
