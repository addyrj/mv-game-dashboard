import React from 'react';
import * as styled from './GameListCartComponent.style';
import { BsDot } from '@react-icons/all-files/bs/BsDot';
import { AiOutlineStar } from '@react-icons/all-files/ai/AiOutlineStar';
import { AiOutlineLike } from '@react-icons/all-files/ai/AiOutlineLike';
import { useNavigate } from 'react-router';
import { AiTwotoneStar } from '@react-icons/all-files/ai/AiTwotoneStar';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function GameListCartComponent({ data, menu, subMenu, sty, favorite }) {
   const navigation = useNavigate();

   const navigationHandler = function (name, _id) {
      navigation(`/game/${name.toLowerCase().replaceAll(' ', '-')}/${_id}`);
   };

   return (
      <styled.div
         className={sty ? 'space-x-0' : 'space-x-0 md:space-x-5'}
         sty={sty}
      >
         <div>
            <styled.gameImageDiv
               sty={sty}
               onClick={() =>
                  navigationHandler(
                     data?.name || data?.gameName,
                     data?.gameId || data?._id
                  )
               }
            >
               <LazyLoadImage src={data?.gameImage} alt="" />
            </styled.gameImageDiv>
         </div>
         <styled.contentDiv className="py-3 w-full">
            <h5 className="text-gray-300 text-md md:text-lg font-medium">
               {data?.name || data?.gameName}
            </h5>
            <div className="flex items-center space-x-2 mt-2 mb-3">
               <div className="flex items-center space-x-2">
                  <AiOutlineLike className="text-gray-400" />
                  <p className="text-gray-400">{data?.totalLikes}</p>
               </div>
               <BsDot className="text-gray-400" />
               <div className="flex items-center space-x-2">
                  {favorite ? (
                     <AiTwotoneStar className="text-red-400" />
                  ) : (
                     <AiOutlineStar className="text-gray-400" />
                  )}
                  <p className="text-gray-400">{data?.totalFavorites}</p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <div className="providerImage">
                  <LazyLoadImage
                     src={
                        data?.gameProvider[0]?.logo || data?.gameProvider?.logo
                     }
                     alt=""
                  />
               </div>
               <div>
                  <h5 className="text-gray-300 text-sm font-medium">
                     {data?.gameProvider[0]?.providerName ||
                        data?.gameProvider?.providerName}
                  </h5>
               </div>
            </div>
            <p className="mt-3 text-gray-500 text-sm">
               {data?.description.length >= 200
                  ? `${data?.description.slice(0, 200)}...`
                  : data?.description}
            </p>
         </styled.contentDiv>
         {!!menu && !!subMenu ? subMenu : null}
      </styled.div>
   );
}

export default GameListCartComponent;
