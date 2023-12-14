import React from 'react';
import AllGamesContainerComponent from '../../Components/AllGamesContainerComponent/AllGamesContainerComponent';
import GameProviderHeadingComponent from '../../Components/GameProviderHeadingComponent/GameProviderHeadingComponent';
import * as styled from './HotGamesPage.style';
import { useDispatch } from 'react-redux';
import { getAllGamesLists } from '../../App/Features/Game/gameAction';
import PaymentOptionsBannerComponent from '../../Components/PaymentOptionsBannerComponent/PaymentOptionsBannerComponent';
import FooterLinksComponent from '../../Components/FooterLinksComponent/FooterLinksComponent';

function HotGamesPage() {
   const dispatch = useDispatch();

   const getGamesData = function (page) {
      return dispatch(getAllGamesLists({ page, filterBy: 'Hot Games' }));
   };

   return (
      <styled.div className="sm_space_">
         <div className="px-2 pb-2 flex items-center justify-between">
            <GameProviderHeadingComponent
               heading={'Casino'}
               gameName={'Hot Games'}
            />
         </div>
         <AllGamesContainerComponent
            filterBy={'Casino'}
            getGamesData={getGamesData}
         />
         <PaymentOptionsBannerComponent />
         <FooterLinksComponent />
      </styled.div>
   );
}

export default HotGamesPage;
