import React from 'react';
import * as styled from './GameInfoComponent.style';
import { useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function GameInfoComponent({ image, name, by, description, _id }) {
   const navigation = useNavigate();

   const navigateToProviderPage = function () {
      navigation(`/provider/${by}?page=0`);
   };

   return (
      <styled.div className="mt-4">
         <div className="d-block d-md-flex items-center">
            <div className="image-div">
               <LazyLoadImage src={image} alt="" />
            </div>
            <div className="content_div ms-0 ms-md-4 mt-3 mt-md-0">
               <h5 className="text-gray-100 text-3xl">{name}</h5>
               <p className="text-gray-400 mt-2 font-medium">
                  By :{' '}
                  <span
                     className="text-gray-200 ms-2 cursor-pointer"
                     onClick={navigateToProviderPage}
                  >
                     {by}
                  </span>
               </p>
               <p className="mt-2 text-gray-500 font-medium">Release:--</p>
            </div>
         </div>
         <p className="mt-3 text-gray-400">{description}</p>
      </styled.div>
   );
}

export default GameInfoComponent;
