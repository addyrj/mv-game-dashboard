import React from 'react';
import * as styled from './GameSmCardComponent.style';
import { useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function GameSmCardComponent({ data, sty }) {
   const navigation = useNavigate();

   const SinglePageNavigationHandler = function () {
      if (data?.game) {
         return navigation(
            `/game/${data?.game?.name.toLowerCase().replaceAll(' ', '-')}/${
               data?.game?._id
            }`
         );
      }

      navigation(
         `/game/${data?.name.toLowerCase().replaceAll(' ', '-')}/${data?._id}`
      );
   };

   return (
      <div className={`px-2 mb-3`}>
         <styled.div className={`shadow-lg ${sty ? sty : ' '}`}>
            {data?.game?.gameStatus === 'Blocked' ? (
               <div className="blocked bg-red-700 rounded">
                  <p className="text-gray-200">Blocked</p>
               </div>
            ) : null}
            <div
               className="imgDiv cursor-pointer "
               onClick={SinglePageNavigationHandler}
            >
               <LazyLoadImage
                  height={'100%'}
                  src={data?.game?.gameImage || data?.gameImage}
                  width={'100%'}
               />
            </div>
         </styled.div>
      </div>
   );
}

export default GameSmCardComponent;
