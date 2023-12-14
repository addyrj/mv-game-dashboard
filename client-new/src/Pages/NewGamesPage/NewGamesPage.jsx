import React, { useEffect } from 'react';
import FooterLinksComponent from '../../Components/FooterLinksComponent/FooterLinksComponent';
import GameProviderHeadingComponent from '../../Components/GameProviderHeadingComponent/GameProviderHeadingComponent';
import PaymentOptionsBannerComponent from '../../Components/PaymentOptionsBannerComponent/PaymentOptionsBannerComponent';
import * as styled from './NewGamesPage.style';
import { useDispatch, useSelector } from 'react-redux';
import { getNewReleasesGames } from '../../App/Features/Game/gameAction';
import {
   allGamesListsInfoSelector,
   allGamesListsLoadingSelector,
   allGamesListsErrorSelector,
   loadMoreLoadingSelector,
} from './NewGames.Selector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GameSmCardComponent from '../../Components/GameSmCardComponent/GameSmCardComponent';
import SpennerComponent from '../../Components/SpennerComponent/SpennerComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { removeAllGames } from '../../App/Features/Game/gameSlice';

function NewGamesPage() {
   const dispatch = useDispatch();

   const [params] = useSearchParams();
   const page = Number(params.get('page'));
   const navigation = useNavigate();

   const allGamesListsInfo = useSelector(allGamesListsInfoSelector);
   const allGamesListsLoading = useSelector(allGamesListsLoadingSelector);
   const allGamesListsError = useSelector(allGamesListsErrorSelector);
   const loadMoreLoading = useSelector(loadMoreLoadingSelector);

   const loadMoreHandler = function () {
      navigation(`?page=${page + 1 || 1}`, {
         replace: true,
      });
      const nextPage = page || 0 + 1;
      dispatch(getNewReleasesGames({ page: nextPage }));
   };

   useEffect(() => {
      dispatch(getNewReleasesGames({ page: 0 }));

      return () => {
         dispatch(removeAllGames());
      };
   }, []);

   return (
      <styled.div className="sm_space_">
         <div className="px-2 pb-2 flex items-center justify-between">
            <GameProviderHeadingComponent gameName={'New Games'} />
         </div>
         {!!allGamesListsError ? (
            <p className="error_cl text-sm">{allGamesListsError}</p>
         ) : null}
         {!!allGamesListsLoading ? <SpennerComponent /> : null}
         {!!allGamesListsInfo &&
         allGamesListsInfo?.success &&
         allGamesListsInfo?.games &&
         allGamesListsInfo?.games.length ? (
            <div>
               <div className="grid_Div">
                  {allGamesListsInfo?.games.map((el) => (
                     <GameSmCardComponent
                        key={el?._id}
                        data={el}
                        sty={'style_2'}
                     />
                  ))}
               </div>
               <div className="flex items-center justify-center">
                  <div>
                     <div className="text-center">
                        <div className="py-3 text-gray-300 font-bold">
                           {allGamesListsInfo?.games.length} /{' '}
                           {allGamesListsInfo?.totalDocuments}
                        </div>
                     </div>
                     {allGamesListsInfo?.totalPages &&
                     allGamesListsInfo?.totalPages > page ? (
                        <CustomButtonComponent
                           btnCl={'large_sn_btn'}
                           text={'Load more'}
                           onClick={loadMoreHandler}
                           isLoading={loadMoreLoading}
                        />
                     ) : (
                        <CustomButtonComponent
                           btnCl={'large_sn_btn no_allow'}
                           text={'No more'}
                        />
                     )}
                  </div>
               </div>
            </div>
         ) : (
            <div className="text-center">
               <p className="text-gray-300 font-medium text-md">No Games</p>
            </div>
         )}
         <PaymentOptionsBannerComponent />
         <FooterLinksComponent />
      </styled.div>
   );
}

export default NewGamesPage;
