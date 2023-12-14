import React, { useEffect, useState } from 'react';
import * as styled from './GamesListPage.style';
import { useSearchParams } from 'react-router-dom';
import GameListCartComponent from '../../Components/GameListCartComponent/GameListCartComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getQeuryGames } from '../../App/Features/Game/gameAction';
import {
   queryGameListsSelector,
   queryGameListsLoadingSelector,
   queryGameListsErrorSelector,
} from './GameList.Selector';
import SpennerComponent from '../../Components/SpennerComponent/SpennerComponent';

function GamesListPage() {
   const [params] = useSearchParams();
   const query = params.get('q');
   const dispatch = useDispatch();
   const [Page, setPage] = useState(0);

   const queryGameLists = useSelector(queryGameListsSelector);
   const queryGameListsLoading = useSelector(queryGameListsLoadingSelector);
   const queryGameListsError = useSelector(queryGameListsErrorSelector);

   useEffect(() => {
      dispatch(getQeuryGames({ query, page: Page }));
   }, []);

   return (
      <styled.div className="sm_container">
         {!!queryGameListsLoading ? <SpennerComponent center={true} /> : null}
         {!!queryGameListsError ? (
            <p className="text-sm error_cl">{queryGameListsError}</p>
         ) : null}
         {!!queryGameLists &&
         queryGameLists?.success &&
         queryGameLists?.games &&
         queryGameLists?.games.length
            ? queryGameLists?.games.map((el) => (
                 <GameListCartComponent key={el._id} data={el} />
              ))
            : null}
      </styled.div>
   );
}

export default GamesListPage;
