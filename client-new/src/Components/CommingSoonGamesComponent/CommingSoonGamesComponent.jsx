import React from 'react';
import * as styled from './CommingSoonGamesComponent.style';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CommingSoonGamesComponent({ data }) {
   return (
      <styled.div>
         <styled.commingSoonDiv>
            <LazyLoadImage src="/images/cooming-soon.png" alt="" />
         </styled.commingSoonDiv>
         <styled.gamePrevDiv>
            <LazyLoadImage src={data?.gameImage} />
         </styled.gamePrevDiv>
      </styled.div>
   );
}

export default CommingSoonGamesComponent;
