import React from 'react';
import * as styled from './InfoSidebarComponent.style';
import TopFavoriteGamesComponent from '../TopFavoriteGamesComponent/TopFavoriteGamesComponent';

function InfoSidebarComponent() {
   return (
      <styled.div>
         <TopFavoriteGamesComponent />
      </styled.div>
   );
}

export default InfoSidebarComponent;
