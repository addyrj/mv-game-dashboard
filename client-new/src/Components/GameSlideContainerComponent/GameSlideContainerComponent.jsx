import React, { useEffect } from 'react';
import * as styled from './GameSlideContainerComponent.style';
import GameCartComponent from '../GameCartComponent/GameCartComponent';
import { useSelector } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   allGamesListSelector,
   allGamesListLoadingSelector,
   allGamesListErrorSelector,
} from './GameSlide.Selector';
import { getAllGames } from '../../App/Features/Client/clientActions';
import { useDispatch } from 'react-redux';

function GameSlideContainerComponent() {
   const dispatch = useDispatch();
   const allGamesList = useSelector(allGamesListSelector);
   const allGamesListLoading = useSelector(allGamesListLoadingSelector);
   const allGamesListError = useSelector(allGamesListErrorSelector);

   useEffect(() => {
      if (!allGamesList) {
         dispatch(getAllGames());
      }
   }, []);

   return (
      <styled.div>
         {allGamesListLoading ? <SpennerComponent /> : null}
         {!!allGamesList &&
         allGamesList?.success &&
         allGamesList?.gamesLists?.length
            ? allGamesList?.gamesLists.map((el) => (
                 <GameCartComponent key={el?._id} data={el} />
              ))
            : null}
         {!!allGamesListError ? (
            <p className="text-sm error_cl">{allGamesListError}</p>
         ) : null}
      </styled.div>
   );
}

export default React.memo(GameSlideContainerComponent);
