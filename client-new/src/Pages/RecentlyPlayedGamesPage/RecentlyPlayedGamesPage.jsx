import React, { useEffect } from 'react';
import * as styled from './RecentlyPlayedGamesPage.style';
import {
   authSelector,
   recentPlayGamesListSelector,
   recentPlayGamesListLoadingSelector,
   recentPlayGamesListErrorSelector,
} from './Recently.Selector';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleRecentGame } from '../../App/Features/Game/gameAction';
import SpennerComponent from '../../Components/SpennerComponent/SpennerComponent';
import GameListCartComponent from '../../Components/GameListCartComponent/GameListCartComponent';
import IsolatedMenu from './MenuItems';
import toast from 'react-hot-toast';
import { getRecentPlayGames } from '../../App/Features/Game/gameAction';

function RecentlyPlayedGamesPage() {
   const dispatch = useDispatch();

   const auth = useSelector(authSelector);
   const recentPlayGamesListLoading = useSelector(
      recentPlayGamesListLoadingSelector
   );
   const recentPlayGamesList = useSelector(recentPlayGamesListSelector);
   const recentPlayGamesListError = useSelector(
      recentPlayGamesListErrorSelector
   );

   const deleteSingleGame = function (gameId) {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(deleteSingleRecentGame({ gameId, userId: auth?.user?._id }));
      } else {
         toast.error('Need to login first');
      }
   };

   const shareGameHandler = function () {
      console.log('share game');
   };

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(getRecentPlayGames({ userId: auth?.user?._id }));
      }
   }, [auth]);

   return (
      <styled.div className="sm_container">
         <h1 className="text-xl lg:text-4xl text-gray-300 font-medium">
            Recent Play Games
         </h1>
         <p className="mt-3 text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            minima illum consequatur iusto. Deserunt dolorem cumque amet qui ea
            mollitia, est optio fugiat.
         </p>
         {!!recentPlayGamesListLoading ? <SpennerComponent /> : null}
         {!!recentPlayGamesListError ? (
            <p className="error_cl">{recentPlayGamesListError}</p>
         ) : null}
         {!!recentPlayGamesList &&
         recentPlayGamesList?.success &&
         recentPlayGamesList?.games &&
         recentPlayGamesList?.games[0]?.gamesList.length
            ? recentPlayGamesList.games[0]?.gamesList.map((el) => (
                 <GameListCartComponent
                    menu={true}
                    key={el?._id}
                    data={el}
                    subMenu={
                       <IsolatedMenu
                          gameId={el.gameId}
                          deleteSingleHandler={deleteSingleGame}
                          ShareGameHandler={shareGameHandler}
                       />
                    }
                 />
              ))
            : !recentPlayGamesListLoading &&
              !recentPlayGamesListError && (
                 <div>
                    <p className="text-gray-400 text-xl">No Recent game play</p>
                 </div>
              )}
      </styled.div>
   );
}

export default RecentlyPlayedGamesPage;
