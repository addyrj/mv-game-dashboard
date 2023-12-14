import React from 'react';
import * as styled from './FavoriteGamesComponent.style';
import NoDataComponent from '../NoDataComponent/NoDataComponent';

function FavoriteGamesComponent({ hasData, heading }) {
   if (!hasData) {
      return <NoDataComponent heading={heading} />;
   }

   return <styled.div>FavoriteGamesComponent</styled.div>;
}

export default FavoriteGamesComponent;
