import React, { useEffect } from 'react';
import * as styled from './SingleGamePage.style';
import GameProviderHeadingComponent from '../../Components/GameProviderHeadingComponent/GameProviderHeadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGameInfo } from '../../App/Features/Client/clientActions';
import { useParams } from 'react-router';
import SpennerComponent from '../../Components/SpennerComponent/SpennerComponent';
import GameScreenComponent from '../../Components/GameScreenComponent/GameScreenComponent';
import GameInfoComponent from '../../Components/GameInfoComponent/GameInfoComponent';
import DOMPurify from 'dompurify';
import {
   singleGameErrorSelector,
   singleGameLoadingSelector,
   singleGameSelector,
   authSelector,
} from './SingleGame.Selector';
import SingleGameCommentsContainerComponent from '../../Components/SingleGameCommentsContainerComponent/SingleGameCommentsContainerComponent';
import { storeRecentGames } from '../../App/Features/Game/gameAction';
import GameBetControlComponent from '../../Components/GameBetControlComponent/GameBetControlComponent';

function SingleGamePage() {
   const dispatch = useDispatch();
   const params = useParams();

   const auth = useSelector(authSelector);
   const singleGame = useSelector(singleGameSelector);
   const singleGameLoading = useSelector(singleGameLoadingSelector);
   const singleGameError = useSelector(singleGameErrorSelector);

   useEffect(() => {
      if (params?.id) {
         dispatch(
            getSingleGameInfo({
               gameId: params?.id,
               userId: auth?.user?._id,
            })
         );
      }

      return () => {
         if (params?.id && auth?.user?._id) {
            dispatch(
               storeRecentGames({ userId: auth?.user?._id, gameId: params?.id })
            );
         }
      };
   }, [params, auth]);

   return (
      <styled.div className="sm_container">
         {!!singleGameLoading ? <SpennerComponent /> : null}
         {!!singleGameError ? (
            <p className="text-sm error_cl">{singleGameError}</p>
         ) : null}
         {!!singleGame && singleGame?.success && singleGame?.game[0] ? (
            <div>
               <GameProviderHeadingComponent
                  gameName={singleGame?.game[0]?._id?.name}
                  providerName={
                     singleGame?.game[0]?._id?.gameProvider?.providerName
                  }
               />
               <div className="mt-4">
                  <GameScreenComponent />
                  {!!singleGame?.game[0]?._id?.gameBitcontroller && (
                     <div className="mt-4">
                        <GameBetControlComponent
                           maxAmount={1310983.34}
                           maxSldAmount={1310983.34}
                           minSldAmount={1}
                           showSld={true}
                        />
                     </div>
                  )}
               </div>
               <GameInfoComponent
                  image={singleGame?.game[0]?._id?.gameImage}
                  description={singleGame?.game[0]?._id?.description}
                  name={singleGame?.game[0]?._id?.name}
                  _id={singleGame?.game[0]?._id?._id}
                  by={singleGame?.game[0]?._id?.gameProvider?.providerName}
               />
               {!!singleGame?.game[0]?.aboutGame ? (
                  <div className="about_game mt-4">
                     <h5 className="text-xl text-gray-400 font-medium mb-2">
                        About this game
                     </h5>
                     <div
                        dangerouslySetInnerHTML={{
                           __html: DOMPurify.sanitize(
                              singleGame?.game[0]?.aboutGame
                           ),
                        }}
                     />
                  </div>
               ) : null}
               <SingleGameCommentsContainerComponent />
            </div>
         ) : null}
      </styled.div>
   );
}

export default React.memo(SingleGamePage);
