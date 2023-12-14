import React, { Fragment, useCallback, useEffect, useState } from 'react';
import * as styled from './HomePageComponent.style';
import BannerComponent from '../BannerComponent/BannerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getCommingSoonGames } from '../../App/Features/Client/clientActions';
import {
   SearchGames,
   getTopRatedGames,
} from '../../App/Features/Game/gameAction';
import GameSlideContainerComponent from '../GameSlideContainerComponent/GameSlideContainerComponent';
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent';
import TabsLineComponent from '../TabsLineComponent/TabsLineComponent';
import ComminSoonGamesSliderComponent from '../ComminSoonGamesSliderComponent/ComminSoonGamesSliderComponent';
import SearchItemsContainerComponent from '../SearchItemsContainerComponent/SearchItemsContainerComponent';
import {
   showSearchListCmSelector,
   topRatedGamesSelector,
   topRatedGamesLoadingSelecttor,
   topRatedGamesErrorSelector,
   commingSoonGamesSelector,
} from './HomePage.Selector';
import { showSearchListCmHandler } from '../../App/Features/Client/clientSlice';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import GameCartComponent from '../GameCartComponent/GameCartComponent';
import Slider from 'react-slick';
import PaymentOptionsBannerComponent from '../PaymentOptionsBannerComponent/PaymentOptionsBannerComponent';
import AboutComponent from '../AboutComponent/AboutComponent';
import FooterLinksComponent from '../FooterLinksComponent/FooterLinksComponent';
import GamesLargeCardComponent from '../GamesLargeCardComponent/GamesLargeCardComponent';

const TabsAr = [
   { name: 'All', type: 'allGames' },
   { name: 'Coming Soon', type: 'comingSoonGames' },
];
const TabArTwo = [{ name: 'Top Rated Games', type: 'topRatedGames' }];
const sty = { border: 'none' };

const settings = {
   dots: false,
   infinite: true,
   speed: 500,
   arrows: false,
   slidesToShow: 5,
   slidesToScroll: 1,
   speed: 500,
   autoplay: true,
   responsive: [
      {
         breakpoint: 1024,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
         },
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
         },
      },
      {
         breakpoint: 480,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ],
};

function HomePageComponent() {
   const dispatch = useDispatch();
   const [ActiveTab, setActiveTab] = useState({ name: 'All' });
   const [RatedGamesTabs, setRatedGamesTabs] = useState({
      name: 'Top Rated Games',
   });

   const showSearchListCm = useSelector(showSearchListCmSelector);
   const topRatedGamesLoading = useSelector(topRatedGamesLoadingSelecttor);
   const topRatedGames = useSelector(topRatedGamesSelector);
   const topRatedGamesError = useSelector(topRatedGamesErrorSelector);
   const commingSoonGames = useSelector(commingSoonGamesSelector);

   const CommingSoonHandler = useCallback(() => {
      dispatch(getCommingSoonGames());
   }, [dispatch]);

   const TabsHandler = function (value) {
      setActiveTab(value);

      if (value.type === 'commingSoonGames' && !commingSoonGames) {
         CommingSoonHandler();
      }
   };

   const RatedGamesHandler = function (value) {
      setRatedGamesTabs(value);
   };

   useEffect(() => {
      if (!topRatedGames) {
         dispatch(getTopRatedGames());
      }
   }, []);

   return (
      <styled.div>
         <BannerComponent />
         <div className="py-3 py-md-3 search_div">
            <SearchBarComponent
               sty={sty}
               fetchFn={SearchGames}
               pageUrl={`/search`}
               showSearchListCm={showSearchListCmHandler}
            />
            {!!showSearchListCm ? (
               <Fragment>
                  <styled.overLayDiv
                     onClick={() => {
                        dispatch(showSearchListCmHandler(false));
                     }}
                  />
                  <SearchItemsContainerComponent />
               </Fragment>
            ) : null}
         </div>
         <div className="pb-4">
            <div className="flex item-ce justify-between mb-4 mt-2">
               <h5 className="text-gray-300 font-medium text-lg">New Games</h5>
            </div>
            <div className="d-block space-x-0 md:space-x-5 items-center d-md-flex">
               <GamesLargeCardComponent
                  link={'/casino?page=0'}
                  image={'/images/casino_png.png'}
                  bg={`linear-gradient(180deg, #D397FA -19.48%, #8711C1 -19.47%, #0A054F 116.77%)`}
               />
               <GamesLargeCardComponent
                  link={'/hot?page=0'}
                  image={'/images/lodu_.png'}
                  bg={`linear-gradient(180deg, #F5C900 -5.63%, #7EF29D -5.62%, #0F68A9 100%)`}
                  cl={'mt-3 mt-md-0'}
               />
            </div>
         </div>
         <TabsLineComponent
            tabs={TabsAr}
            ActiveTab={ActiveTab}
            eventHandler={TabsHandler}
            showViewALl={true}
            link={'/all-games?page=0'}
         />
         {ActiveTab?.type === 'comingSoonGames' ? (
            <ComminSoonGamesSliderComponent />
         ) : null}
         <GameSlideContainerComponent />
         {!!topRatedGamesLoading ? <SpennerComponent /> : null}
         {!!topRatedGamesError ? (
            <p className="text-sm error_cl">{topRatedGamesError}</p>
         ) : null}
         {!!topRatedGames &&
         topRatedGames?.success &&
         topRatedGames?.games &&
         topRatedGames?.games.length ? (
            <styled.ratedGamesDiv>
               <TabsLineComponent
                  tabs={TabArTwo}
                  ActiveTab={RatedGamesTabs}
                  eventHandler={RatedGamesHandler}
                  showViewALl={true}
               />
               <div className="mt-4">
                  <Slider {...settings}>
                     {topRatedGames?.games.map((el) => (
                        <GameCartComponent key={el?._id} data={el} />
                     ))}
                  </Slider>
               </div>
            </styled.ratedGamesDiv>
         ) : null}
         <PaymentOptionsBannerComponent />
         <div className="pt-3 pb-5">
            <AboutComponent />
         </div>
         <FooterLinksComponent />
      </styled.div>
   );
}

export default HomePageComponent;
