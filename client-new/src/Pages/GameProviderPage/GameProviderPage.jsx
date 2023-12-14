import React, { useEffect } from 'react';
import * as styled from './GameProviderPage.style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSingleProviderGames } from '../../App/Features/Game/gameAction';
import UserProfileComponent from '../../Components/UserProfileComponent/UserProfileComponent';
import {
   singleProviderSelector,
   singleProviderLoadingSelector,
   singleProviderErrorSelector,
} from './GameProvider.Selector';
import GameSmCardComponent from '../../Components/GameSmCardComponent/GameSmCardComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useNavigate } from 'react-router-dom';
import { removeProviderGamesInfo } from '../../App/Features/Game/gameSlice';

function GameProviderPage() {
   const dispatch = useDispatch();
   const param = useParams();
   const [params] = useSearchParams();
   const navigation = useNavigate();

   const singleProvider = useSelector(singleProviderSelector);
   const singleProviderLoading = useSelector(singleProviderLoadingSelector);
   const singleProviderError = useSelector(singleProviderErrorSelector);

   const page = params.get('page');

   const loadMoreHandler = function () {
      navigation(`?page=${+page + 1}`, {
         replace: true,
      });
   };

   useEffect(() => {
      if (page) {
         dispatch(getSingleProviderGames({ page, providerName: param?.name }));
      }
   }, [page]);

   useEffect(() => {
      return () => {
         dispatch(removeProviderGamesInfo());
      };
   }, []);

   return (
      <styled.div>
         <div className="sm_container">
            {!!singleProviderError ? (
               <p className="error_cl text-sm">{singleProviderError}</p>
            ) : null}
            {!!singleProvider &&
            singleProvider?.success &&
            singleProvider?.provider ? (
               <div>
                  <UserProfileComponent
                     user={singleProvider?.provider[0]?._id}
                     totalDocuments={singleProvider?.totalDocuments}
                  />
                  <h5 className="mb-4 mx-2 font-medium text-gray-300 text-xl">
                     {singleProvider?.provider[0]?._id?.providerName}
                  </h5>
                  {singleProvider?.provider[0]?.games &&
                  singleProvider?.provider[0]?.games.length &&
                  singleProvider?.provider[0]?.games[0]?.game ? (
                     <styled.resDiv>
                        {singleProvider?.provider[0]?.games.map((el) => (
                           <GameSmCardComponent key={el?.game?._id} data={el} />
                        ))}
                     </styled.resDiv>
                  ) : (
                     <div className="mb-4 mx-2 ">
                        <p className="text-gray-400">No Games</p>
                     </div>
                  )}
               </div>
            ) : null}
            <div className="flex items-center justify-center my-5">
               <div className="text-center">
                  {singleProvider?.totalDocuments ? (
                     <div className="py-3 text-gray-300 font-bold">
                        {singleProvider?.provider[0]?.games.length} /{' '}
                        {singleProvider?.totalDocuments}
                     </div>
                  ) : null}
                  {singleProvider?.provider[0]?.games.length &&
                  singleProvider?.provider[0]?.games[0]?.game ? (
                     singleProvider?.totalPages &&
                     singleProvider?.totalPages > +page ? (
                        <CustomButtonComponent
                           btnCl={'large_sn_btn'}
                           text={'Load more'}
                           onClick={loadMoreHandler}
                           isLoading={singleProviderLoading}
                        />
                     ) : (
                        <CustomButtonComponent
                           btnCl={'large_sn_btn no_allow'}
                           text={'No more'}
                        />
                     )
                  ) : null}
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default GameProviderPage;
