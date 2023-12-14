import React, { useEffect } from 'react';
import * as styled from './TopFavoriteGamesComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import useAdmin from '../../Hooks/useAdmin';
import { AiOutlineStar } from '@react-icons/all-files/ai/AiOutlineStar';
import { getTopFavoriteGames } from '../../App/Features/Games/GameActions';
import {
   topFavoriteGamesSelector,
   topFavoriteGamesLoadingSelector,
   topFavoriteGamesErrorSelector,
} from './Games.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';

function TopFavoriteGamesComponent() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();

   const topFavoriteGames = useSelector(topFavoriteGamesSelector);
   const topFavoriteGamesLoading = useSelector(topFavoriteGamesLoadingSelector);
   const topFavoriteGamesError = useSelector(topFavoriteGamesErrorSelector);

   useEffect(() => {
      if (isAdmin) {
         dispatch(getTopFavoriteGames());
      }
   }, [isAdmin]);

   return (
      <styled.div>
         <h5 className="text-lg text-gray-300 font-medium">Top Favorite Games</h5>
         <div className="mt-3">
            {!!topFavoriteGamesLoading ? <SpinnerComponent /> : null}
            {!!topFavoriteGamesError ? <p className="error_cl text-sm">{topFavoriteGamesError}</p> : null}
            {!!topFavoriteGames &&
            topFavoriteGames?.success &&
            topFavoriteGames?.games &&
            topFavoriteGames?.games.length ? (
               topFavoriteGames?.games.map((el) => (
                  <styled.gameCardDiv key={el?._id} className="mb-3">
                     <div className="flex items-center space-x-4">
                        <div className="gameDiv shadow">
                           <img src={el?.gameImage} alt="" />
                        </div>
                        <div className="contantDiv">
                           <h5 className="text-md text-gray-400 font-medium">{el?.name}</h5>
                           <div className="flex items-center space-x-2 mt-1">
                              <AiOutlineStar className="text-gray-500" />
                              <p className="text-gray-500 text-sm">{el?.totalFavorites}</p>
                           </div>
                        </div>
                     </div>
                  </styled.gameCardDiv>
               ))
            ) : (
               <div className="text-center">
                  <p className="text-gray-500">No Games</p>
               </div>
            )}
         </div>
      </styled.div>
   );
}

export default TopFavoriteGamesComponent;
