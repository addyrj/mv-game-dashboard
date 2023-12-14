import React from 'react';
import * as styled from './SlotsGamesPage.style';
import AllGamesContainerComponent from '../../Components/AllGamesContainerComponent/AllGamesContainerComponent';
import FooterLinksComponent from '../../Components/FooterLinksComponent/FooterLinksComponent';
import PaymentOptionsBannerComponent from '../../Components/PaymentOptionsBannerComponent/PaymentOptionsBannerComponent';
import GameFilterDropDownComponent from '../../Components/GameFilterDropDownComponent/GameFilterDropDownComponent';
import ProviderGamesFilterComponent from '../../Components/ProviderGamesFilterComponent/ProviderGamesFilterComponent';
import GameProviderHeadingComponent from '../../Components/GameProviderHeadingComponent/GameProviderHeadingComponent';
import { useDispatch } from 'react-redux';
import { getAllGamesLists } from '../../App/Features/Game/gameAction';

const FilterDropDownAr = [
   { name: 'You may like', id: 1 },
   { name: 'Popular', id: 2 },
   { name: 'A-Z', id: 3 },
   { name: 'Z-A', id: 4 },
   // { name: 'New', id: 5 },
];

function SlotsGamesPage() {
   const dispatch = useDispatch();

   const getGamesData = function (page) {
      return dispatch(getAllGamesLists({ page, filterBy: 'Slots Games' }));
   };

   return (
      <styled.div className="sm_space_">
         <styled.navDiv className="px-2 pt-4 pb-2">
            <GameProviderHeadingComponent
               heading={'Casino'}
               gameName={'Slots'}
            />
            <styled.filterDiv className="d-block d-sm-flex space-x-0 items-center sm:space-x-9 justify-content-end justify-md-content-center w-full">
               <GameFilterDropDownComponent
                  FilterDropDownAr={FilterDropDownAr}
                  pageName={'slots'}
               />
               <ProviderGamesFilterComponent
                  pageName={'slots'}
                  filterBy={'Slots Games'}
               />
            </styled.filterDiv>
         </styled.navDiv>
         <AllGamesContainerComponent
            filterBy={'Slots Games'}
            getGamesData={getGamesData}
         />
         <PaymentOptionsBannerComponent />
         <FooterLinksComponent />
      </styled.div>
   );
}

export default SlotsGamesPage;
