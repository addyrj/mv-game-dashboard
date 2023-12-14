import React, { useEffect } from 'react';
import * as styled from './AllGamesContainerComponent.style';
import {
   AllGamesInfoSelector,
   AllGamesInfoErrorSelector,
   AllGamesInfoLoadingSelector,
   selectedProviderGamesSelector,
   selectedProviderGamesErrorSelector,
   selectedProviderGamesLoadingSelector,
} from './AllGames.Selector';
import { useDispatch, useSelector } from 'react-redux';
import GameSmCardComponent from '../GameSmCardComponent/GameSmCardComponent';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import {
   removeAllGamesinfo,
   removeProvidersGames,
} from '../../App/Features/Game/gameSlice';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
   getPopularGames,
   filterByNameGames,
   getSelectedProviderGames,
} from '../../App/Features/Game/gameAction';

function AllGamesContainerComponent({ filterBy, getGamesData }) {
   const dispatch = useDispatch();
   const [params] = useSearchParams();
   const filter = params.get('filter');
   const page = params.get('page');
   const providerName = params.get('providerName');
   const sort = params.get('sort');
   const navigation = useNavigate();

   const AllGamesInfo = useSelector(AllGamesInfoSelector);
   const AllGamesInfoLoading = useSelector(AllGamesInfoLoadingSelector);
   const AllGamesInfoError = useSelector(AllGamesInfoErrorSelector);
   const selectedProviderGamesLoading = useSelector(
      selectedProviderGamesLoadingSelector
   );
   const selectedProviderGames = useSelector(selectedProviderGamesSelector);
   const selectedProviderGamesError = useSelector(
      selectedProviderGamesErrorSelector
   );

   const LoadMoreHandler = function () {
      if (filter) {
         return navigation(`?filter=${filter}&page=${+page + 1}`);
      }

      if (providerName) {
         let nextPage = +page + 1;
         let pageUrl = `?providerName=${providerName}&page=${nextPage}&sort=${sort}`;
         navigation(pageUrl);
         if (providerName) {
            const providerNameAr = providerName.split('%');

            dispatch(
               getSelectedProviderGames({
                  SelectedProvider: providerNameAr,
                  page: nextPage,
                  filterBy,
               })
            );
         }
      } else {
         navigation(`?page=${+page + 1}`);
      }
   };

   useEffect(() => {
      let pageNum = page || 0;

      if (!providerName) {
         dispatch(removeProvidersGames());
         if (filter === 'Popular') {
            dispatch(getPopularGames({ filter: filterBy, page: pageNum }));
         } else if (filter === 'A-Z' || filter === 'Z-A') {
            dispatch(
               filterByNameGames({
                  filter: filterBy,
                  page: pageNum,
                  sortWith: filter,
               })
            );
         } else {
            getGamesData(pageNum);
         }
      }
   }, [page, filter]);

   useEffect(() => {
      return () => {
         dispatch(removeAllGamesinfo());
      };
   }, []);

   return (
      <div>
         <styled.div>
            {!!AllGamesInfoError ? (
               <p className="text-sm error_cl">{AllGamesInfoError}</p>
            ) : null}
            {!!selectedProviderGames &&
            selectedProviderGames?.games[0]?.games &&
            selectedProviderGames?.games[0]?.games.length &&
            selectedProviderGames?.games[0]?.games[0]?.game ? (
               selectedProviderGames?.games[0]?.games.map((el) => (
                  <GameSmCardComponent
                     key={el?.game?._id}
                     data={el}
                     sty={'style_2'}
                  />
               ))
            ) : AllGamesInfo?.games[0]?.games &&
              AllGamesInfo?.games[0]?.games.length &&
              AllGamesInfo?.games[0]?.games[0]?.game ? (
               AllGamesInfo?.games[0]?.games.map((el) => (
                  <GameSmCardComponent
                     key={el?.game?._id}
                     data={el}
                     sty={'style_2'}
                  />
               ))
            ) : (
               <div className="mb-4 mx-2 ">
                  <p className="text-gray-400">No Games</p>
               </div>
            )}
         </styled.div>
         <div className="flex items-center justify-center mt-2">
            <div className="text-center">
               {!!selectedProviderGames &&
               selectedProviderGames?.totalDocuments ? (
                  <div className="py-3 text-gray-300 font-bold">
                     {selectedProviderGames?.games[0]?.games.length} /{' '}
                     {selectedProviderGames?.totalDocuments}
                  </div>
               ) : AllGamesInfo?.totalDocuments ? (
                  <div className="py-3 text-gray-300 font-bold">
                     {AllGamesInfo?.games[0]?.games.length} /{' '}
                     {AllGamesInfo?.totalDocuments}
                  </div>
               ) : null}
               {!!providerName ? (
                  !!selectedProviderGames &&
                  selectedProviderGames?.totalPages &&
                  selectedProviderGames?.totalPages > +page ? (
                     <CustomButtonComponent
                        btnCl={'large_sn_btn'}
                        text={'Load more'}
                        onClick={LoadMoreHandler}
                        isLoading={selectedProviderGamesLoading}
                     />
                  ) : (
                     <CustomButtonComponent
                        btnCl={'large_sn_btn no_allow'}
                        text={'No more'}
                        isLoading={AllGamesInfoLoading}
                     />
                  )
               ) : null}
               {!providerName ? (
                  <>
                     {AllGamesInfo?.games[0]?.games.length &&
                     AllGamesInfo?.games[0]?.games[0]?.game ? (
                        AllGamesInfo?.totalPages &&
                        AllGamesInfo?.totalPages > +page ? (
                           <CustomButtonComponent
                              btnCl={'large_sn_btn'}
                              text={'Load more'}
                              onClick={LoadMoreHandler}
                              isLoading={AllGamesInfoLoading}
                           />
                        ) : (
                           <CustomButtonComponent
                              btnCl={'large_sn_btn no_allow'}
                              text={'No more'}
                              isLoading={AllGamesInfoLoading}
                           />
                        )
                     ) : null}
                  </>
               ) : null}
            </div>
         </div>
         {!!selectedProviderGamesError ? (
            <p className="text-sm error_cl">{selectedProviderGamesError}</p>
         ) : null}
      </div>
   );
}

export default AllGamesContainerComponent;
