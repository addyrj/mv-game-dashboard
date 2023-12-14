import React from 'react';
import * as styled from './SearchItemsContainerComponent.style';
import SearchGameListComponent from '../SearchGameListComponent/SearchGameListComponent';
import {
   gameSearchListsSelector,
   gameSearchListsErrorSelector,
} from './SearchItem.Selector';
import { useSelector } from 'react-redux';

function SearchItemsContainerComponent() {
   const gameSearchLists = useSelector(gameSearchListsSelector);
   const gameSearchListsError = useSelector(gameSearchListsErrorSelector);

   return (
      <styled.div className="shadow">
         {!!gameSearchListsError ? (
            <p className="text-sm error_cl">{gameSearchListsError}</p>
         ) : null}
         {!!gameSearchLists &&
         gameSearchLists?.success &&
         gameSearchLists?.gamesLists?.length
            ? gameSearchLists?.gamesLists.map((el) => (
                 <SearchGameListComponent key={el?._id} data={el} />
              ))
            : null}
      </styled.div>
   );
}

export default SearchItemsContainerComponent;
