import React, { useEffect } from 'react';
import * as styled from './ProvidersGamesPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import GameSmCardComponent from '../../Components/GameSmCardComponent/GameSmCardComponent';
import { useParams } from 'react-router-dom';
import useRoles from '../../Hooks/useRoles';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProvidersGames } from '../../App/Features/GameProviders/GameProvidersActions';
import {
   providerGamesListSelector,
   providerGamesLoadingSelector,
   providerGamesErrorSelector,
} from './ProviderGame.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { removeProviderGamesInfo } from '../../App/Features/GameProviders/GameProvidersSlice';
import TabHeadingComponent from '../../Components/TabHeadingComponent/TabHeadingComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useNavigate } from 'react-router-dom';
import UserProfileComponent from '../../Components/UserProfileComponent/UserProfileComponent';

function ProvidersGamesPage() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [param] = useSearchParams();
   const params = useParams();
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const providerGamesError = useSelector(providerGamesErrorSelector);
   const providerGamesList = useSelector(providerGamesListSelector);
   const providerGamesLoading = useSelector(providerGamesLoadingSelector);

   const id = params?.id;
   const page = param.get('page');

   const LoadMoreHandler = function () {
      navigation(`?page=${+page + 1}`, {
         replace: true,
      });
   };

   useEffect(() => {
      if (page && isAdmin) {
         dispatch(getProvidersGames({ providerId: id, page }));
      }
   }, [isAdmin, page]);

   useEffect(() => {
      return () => {
         dispatch(removeProviderGamesInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <div className="user_profile_bn_div"></div>
            {!!providerGamesLoading ? <SpinnerComponent /> : null}
            {!!providerGamesError ? <p className="error_cl text-sm">{providerGamesError}</p> : null}
            {!!providerGamesList && providerGamesList?.success && providerGamesList?.provider ? (
               <div>
                  <TabHeadingComponent provider={providerGamesList?.provider[0]?._id} />
                  <div>
                     <UserProfileComponent user={providerGamesList?.provider[0]?._id} />
                  </div>
                  <h5 className="mb-4 mx-2 font-medium text-gray-400 text-xl">
                     {providerGamesList?.provider[0]?._id?.providerName}
                  </h5>
                  {providerGamesList?.provider[0]?.games &&
                  providerGamesList?.provider[0]?.games.length &&
                  providerGamesList?.provider[0]?.games[0]?.game ? (
                     <styled.resDiv>
                        {providerGamesList?.provider[0]?.games.map((el) => (
                           <GameSmCardComponent key={el?.game?._id} data={el} />
                        ))}
                     </styled.resDiv>
                  ) : (
                     <div className="mb-4 mx-2 ">
                        <p className="text-gray-400">No Games</p>
                     </div>
                  )}
                  <div className="flex items-center justify-center my-5">
                     <div className="text-center">
                        {providerGamesList?.totalDocuments ? (
                           <div className="py-3 text-gray-300 font-bold">
                              {providerGamesList?.provider[0]?.games.length} / {providerGamesList?.totalDocuments}
                           </div>
                        ) : null}
                        {providerGamesList?.provider[0]?.games.length &&
                        providerGamesList?.provider[0]?.games[0]?.game ? (
                           providerGamesList?.totalPages && providerGamesList?.totalPages > +page ? (
                              <CustomButtonComponent
                                 btnCl={'large_sn_btn'}
                                 text={'Load more'}
                                 onClick={LoadMoreHandler}
                              />
                           ) : (
                              <CustomButtonComponent btnCl={'large_sn_btn no_allow'} text={'No more'} />
                           )
                        ) : null}
                     </div>
                  </div>
               </div>
            ) : null}
         </div>
      </styled.div>
   );
}

export default ProvidersGamesPage;
