import React, { useEffect } from 'react';
import * as styled from './MyFavouriteGamesPage.style';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteGames } from '../../App/Features/Game/gameAction';
import {
   authSelector,
   favoriteGamesListSelector,
   favoriteGamesListLoadingSelector,
   favoriteGamesListErrorSelector,
} from './MyFavourite.Selector';
import SpennerComponent from '../../Components/SpennerComponent/SpennerComponent';
import GameListCartComponent from '../../Components/GameListCartComponent/GameListCartComponent';

function MyFavouriteGamesPage() {
   const dispatch = useDispatch();

   const auth = useSelector(authSelector);
   const favoriteGamesList = useSelector(favoriteGamesListSelector);
   const favoriteGamesListLoading = useSelector(
      favoriteGamesListLoadingSelector
   );
   const favoriteGamesListError = useSelector(favoriteGamesListErrorSelector);

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(getFavoriteGames({ userId: auth?.user?._id }));
      }
   }, [auth]);

   return (
      <styled.div className="sm_container">
         <h1 className="text-xl lg:text-4xl text-gray-300 font-medium">
            My Favourite Games
         </h1>
         <p className="mt-3 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            minima illum consequatur iusto. Deserunt dolorem cumque amet qui ea
            mollitia, est optio fugiat.
         </p>
         <div className="mt-4">
            {!!favoriteGamesListLoading ? <SpennerComponent /> : null}
            {!!favoriteGamesListError ? (
               <p className="text-sm error_cl">{favoriteGamesListError}</p>
            ) : null}
            {!!favoriteGamesList &&
            favoriteGamesList?.success &&
            favoriteGamesList?.games &&
            favoriteGamesList?.games[0]?.gamesList.length ? (
               <styled.boxDiv>
                  {favoriteGamesList.games[0]?.gamesList.map((el) => (
                     <GameListCartComponent
                        menu={true}
                        key={el?._id}
                        data={el}
                        sty={'styled_two'}
                        favorite={true}
                     />
                  ))}
               </styled.boxDiv>
            ) : (
               !favoriteGamesListLoading &&
               !favoriteGamesListError && (
                  <div>
                     <p className="text-gray-400 text-xl">
                        No favourite games play
                     </p>
                  </div>
               )
            )}
         </div>
      </styled.div>
   );
}

export default MyFavouriteGamesPage;
