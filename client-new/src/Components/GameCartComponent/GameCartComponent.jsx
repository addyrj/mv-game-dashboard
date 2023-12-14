import React from 'react';
import * as styled from './GameCartComponent.style';
import { useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function GameCartComponent({ data }) {
   const navigation = useNavigate();

   return (
      <styled.div className="mb-3 px-1">
         <div
            className=" relative cursor-pointer"
            onClick={() =>
               navigation(
                  `/game/${data.name.toLowerCase().replaceAll(' ', '-')}/${
                     data?._id
                  }`
               )
            }
         >
            <styled.imagePrv className="shadow">
               <LazyLoadImage
                  width={'100%'}
                  height={'100%'}
                  src={data?.gameImage}
               />
            </styled.imagePrv>
            <styled.cmDiv className="text-center">
               <p className="text-gray-200 font-medium">
                  {data?.name.length > 15
                     ? `${data?.name.slice(0, 15)}...`
                     : data?.name}
               </p>
            </styled.cmDiv>
         </div>
      </styled.div>
   );
}

export default GameCartComponent;
