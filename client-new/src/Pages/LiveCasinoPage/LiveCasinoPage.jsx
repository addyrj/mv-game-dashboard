import React from 'react';
import { getAllGamesLists } from '../../App/Features/Game/gameAction';
import AllGamesContainerComponent from '../../Components/AllGamesContainerComponent/AllGamesContainerComponent';
import FooterLinksComponent from '../../Components/FooterLinksComponent/FooterLinksComponent';
import GameFilterDropDownComponent from '../../Components/GameFilterDropDownComponent/GameFilterDropDownComponent';
import GameProviderHeadingComponent from '../../Components/GameProviderHeadingComponent/GameProviderHeadingComponent';
import PaymentOptionsBannerComponent from '../../Components/PaymentOptionsBannerComponent/PaymentOptionsBannerComponent';
import ProviderGamesFilterComponent from '../../Components/ProviderGamesFilterComponent/ProviderGamesFilterComponent';
import * as styled from './LiveCasinoPage.style';
import { useDispatch } from 'react-redux';

const FilterDropDownAr = [
   { name: 'You may like', id: 1 },
   { name: 'Popular', id: 2 },
   { name: 'A-Z', id: 3 },
   { name: 'Z-A', id: 4 },
];

function LiveCasinoPage() {
   const dispatch = useDispatch();

   const getGamesData = function (page) {
      return dispatch(getAllGamesLists({ page, filterBy: 'Casino' }));
   };

   return (
      <styled.div className="sm_space_">
         <styled.navDiv className="px-2 pb-2">
            <GameProviderHeadingComponent
               heading={'Casino'}
               gameName={'live casino'}
            />
            <styled.filterDiv className="d-block d-sm-flex space-x-0 items-center sm:space-x-9 justify-content-end justify-md-content-center w-full">
               <GameFilterDropDownComponent
                  FilterDropDownAr={FilterDropDownAr}
                  pageName={'casino'}
               />
               <ProviderGamesFilterComponent
                  pageName={'casino'}
                  filterBy={'Casino'}
               />
            </styled.filterDiv>
         </styled.navDiv>
         <AllGamesContainerComponent
            filterBy={'Casino'}
            getGamesData={getGamesData}
         />
         <PaymentOptionsBannerComponent />
         <FooterLinksComponent />
      </styled.div>
   );
}

export default LiveCasinoPage;
