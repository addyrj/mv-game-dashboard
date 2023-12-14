import React from 'react';
import { useSelector } from 'react-redux';
import * as styled from './ComminSoonGamesSliderComponent.style';
import CommingSoonGamesComponent from '../CommingSoonGamesComponent/CommingSoonGamesComponent';
import {
   commingSoonGamesSelector,
   commingSoonGamesLoadingSelector,
   commingSoonGamesErrorSelector,
} from './CommingSoon.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';

function ComminSoonGamesSliderComponent() {
   const commingSoonGames = useSelector(commingSoonGamesSelector);
   const commingSoonGamesLoading = useSelector(commingSoonGamesLoadingSelector);
   const commingSoonGamesError = useSelector(commingSoonGamesErrorSelector);

   return (
      <styled.div>
         {!!commingSoonGamesError ? (
            <p className="text-sm error_cl">{commingSoonGamesError}</p>
         ) : null}
         {!!commingSoonGamesLoading ? <SpennerComponent /> : null}
         {!!commingSoonGames &&
         commingSoonGames?.success &&
         commingSoonGames?.games.length ? (
            commingSoonGames.games.map((el) => (
               <CommingSoonGamesComponent key={el._id} data={el} />
            ))
         ) : (
            <p className="text-gray-300 text-sm">No Upcoming games</p>
         )}
      </styled.div>
   );
}

export default ComminSoonGamesSliderComponent;
