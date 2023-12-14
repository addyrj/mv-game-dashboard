import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as styled from './GameScreenComponent.style';
import { AiTwotoneStar } from '@react-icons/all-files/ai/AiTwotoneStar';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { RiSendPlaneFill } from '@react-icons/all-files/ri/RiSendPlaneFill';
import { BsFullscreen } from '@react-icons/all-files/bs/BsFullscreen';
import {
   singleGameSelector,
   FavoriteGameInfoSelector,
   FavoriteGameErrorSelector,
   FavoriteGameLoadingSelector,
   LikeGameInfoSelector,
   LikeGameLoadingSelector,
   LikeGameErrorSelector,
   authSelector,
   gameSelectedCurrencySelector,
   selectedCurrencyTypeSelector,
} from './GameScreen.selector';
import { useDispatch } from 'react-redux';
import {
   genrateGameToken,
   FavoriteGameHandler,
   GameLikeHandler,
} from '../../App/Features/Client/clientActions';
import toast from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import GameShareModalComponent from '../GameShareModalComponent/GameShareModalComponent';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { removeGameInfo } from '../../App/Features/Client/clientSlice';
import { useCookies } from 'react-cookie';
// import { useMediaQuery } from 'react-responsive';
// import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';

function GameScreenComponent() {
   const [cookie] = useCookies();
   const iframeRef = useRef(null);
   const dispatch = useDispatch();
   const [GameUserInfo, setGameUserInfo] = useState(null);
   const [FavoriteGameNumber, setFavoriteGameNumber] = useState(0);
   const [LikeGameNumber, setLikeGameNumber] = useState(0);
   const [ShowGameSharePopup, setShowGameSharePopup] = useState(false);
   // const isMobile = useMediaQuery({ query: '(max-width: 720px)' });

   const auth = useSelector(authSelector);
   const singleGame = useSelector(singleGameSelector);
   const FavoriteGameInfo = useSelector(FavoriteGameInfoSelector);
   const FavoriteGameError = useSelector(FavoriteGameErrorSelector);
   const FavoriteGameLoading = useSelector(FavoriteGameLoadingSelector);
   const LikeGameInfo = useSelector(LikeGameInfoSelector);
   const LikeGameLoading = useSelector(LikeGameLoadingSelector);
   const LikeGameError = useSelector(LikeGameErrorSelector);
   const gameSelectedCurrency = useSelector(gameSelectedCurrencySelector);
   const selectedCurrencyType = useSelector(selectedCurrencyTypeSelector);

   const userTokenHandler = async function () {
      const userId = auth?.user?._id;

      if (!cookie?._mv_cr) {
         return;
      }

      if (cookie?._mv_cr.type === 'fiatCurrency') {
         const data = await dispatch(
            genrateGameToken({
               userId,
               selectedCurrency: cookie?._mv_cr?._id,
               userCrId: cookie?._mv_cr?.userCrId,
            })
         );
         if (data) {
            setGameUserInfo(data?.payload?.data);
         }
      } else if (cookie?._mv_cr.type === 'CryptoCurrency') {
         console.log('update user cryp game');

         const data = await dispatch(
            genrateGameToken({
               userId,
               crSymbol: cookie?._mv_cr?.crSymbol,
               userCrId: cookie?._mv_cr?.userCrId,
            })
         );
         if (data) {
            setGameUserInfo(data?.payload?.data);
         }
      }
   };

   const likeGame = function () {
      if (auth && !!auth?.user) {
         const userId = auth?.user?._id;
         const gameId = singleGame?.game[0]?._id;

         dispatch(GameLikeHandler({ userId, gameId }));
      } else {
         toast.error('you need to login first');
      }
   };

   const makeFullScreen = function () {
      if (
         document.fullscreenEnabled ||
         document.webkitFullscreenEnabled ||
         document.mozFullScreenEnabled ||
         document.msFullscreenEnabled
      ) {
         // Do fullscreen
         if (iframeRef.current.requestFullscreen) {
            iframeRef.current.requestFullscreen();
         } else if (iframeRef.current.webkitRequestFullscreen) {
            iframeRef.current.webkitRequestFullscreen();
         } else if (iframeRef.current.mozRequestFullScreen) {
            iframeRef.current.mozRequestFullScreen();
         } else if (iframeRef.current.msRequestFullscreen) {
            iframeRef.current.msRequestFullscreen();
         }
      } else {
         toast.error('Your browser is not supported');
      }
   };

   const shareGameLink = function () {
      setShowGameSharePopup(!ShowGameSharePopup);
   };

   const favoriteHandler = async function () {
      if (auth && !!auth?.user) {
         const userId = auth?.user?._id;
         const gameId = singleGame?.game[0]?._id;

         dispatch(FavoriteGameHandler({ userId, gameId }));
      } else {
         toast.error('you need to login first');
      }
   };

   useEffect(() => {
      const handler = function (event) {
         // console.log(
         //    'Message received from the child: ' + JSON.stringify(event.data)
         // );
      };

      window.addEventListener('message', handler);
      return () => {
         dispatch(removeGameInfo());
         window.removeEventListener('message', handler);
      };
   }, []);

   useEffect(() => {
      if (!!FavoriteGameInfo) {
         let type = FavoriteGameInfo?.type;
         if (type === 'userRemoveFromGameFavoriteCollection') {
            setFavoriteGameNumber((prevState) => prevState - 1);
         } else if (type === 'userAddedInGameFavoriteCollection') {
            setFavoriteGameNumber((prevState) => prevState + 1);
         }
      }
   }, [FavoriteGameInfo]);

   useEffect(() => {
      if (!!LikeGameInfo) {
         let type = LikeGameInfo?.type;
         if (type === 'userRemovedFromGameLikeCollection') {
            setLikeGameNumber((prevState) => prevState - 1);
         } else if (type === 'userAddedInGameLikeCollection') {
            setLikeGameNumber((prevState) => prevState + 1);
         }
      }
   }, [LikeGameInfo]);

   useEffect(() => {
      if (
         gameSelectedCurrency &&
         !cookie?._mv_cr &&
         !GameUserInfo &&
         !!auth &&
         auth?.user &&
         auth?.user?._id
      ) {
         const defaultCrId = gameSelectedCurrency?.currency;
         const userId = auth?.user?._id;

         const body = {
            userId,
            selectedCurrency: defaultCrId?._id,
            userCrId: auth?.user?.userId,
            currencyType: selectedCurrencyType?.currency?.currencyType,
            crSymbol: defaultCrId?.currencyName,
         };

         dispatch(genrateGameToken(body))
            .then((res) => {
               const data = res.payload?.data;
               if (data) {
                  setGameUserInfo(data);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [gameSelectedCurrency, !GameUserInfo]);

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?._id) {
         iframeRef.current.src = iframeRef.current.src;
      }
   }, [auth]);

   /* --- whenever we want to send the message inside the ifrmae ------ */
   // const sendMessage = function () {
   //    window.addEventListener('message', function (event) {
   //       console.log('Message received from the child: ' + event.data); // Message received from child
   //    });

   //    const message = 'user is login..';
   //    iframeRef.current.contentWindow.postMessage(message, '*');
   // };
   /* --- whenever we want to send the message inside the ifrmae ------ */

   return (
      <styled.div className="shadow">
         <styled.screen>
            <iframe
               className="responsive-iframe"
               ref={iframeRef}
               src={`${singleGame?.game[0]?._id?.url}?token=${GameUserInfo?.token}&client_id=1`}
               title={singleGame?.game[0]?._id?.description}
               allow="autoplay"
               allowFullScreen
               scrolling="no"
            />
         </styled.screen>
         <AnimatePresence>
            {!!ShowGameSharePopup ? (
               <GameShareModalComponent closeEvent={shareGameLink} />
            ) : null}
         </AnimatePresence>
         <styled.optionDiv>
            <div className="flex items-center space-x-2">
               {!!LikeGameLoading ? (
                  <SpennerComponent />
               ) : (
                  <div className="box_div" onClick={likeGame}>
                     {LikeGameInfo?.type === 'userAddedInGameLikeCollection' ? (
                        <AiFillHeart className={'text-red-400'} />
                     ) : LikeGameInfo?.type ===
                       'userRemovedFromGameLikeCollection' ? (
                        <AiFillHeart className={'text-gray-400'} />
                     ) : (
                        <AiFillHeart
                           className={
                              singleGame.game[0]?._id?.gameInLikeList.length
                                 ? 'text-red-400'
                                 : 'text-gray-400 '
                           }
                        />
                     )}
                     <p className="text-gray-400 text-lg font-medium">
                        {singleGame?.game[0]?._id?.likesSize + LikeGameNumber}
                     </p>
                  </div>
               )}
               {!!FavoriteGameLoading ? (
                  <SpennerComponent />
               ) : (
                  <div className="box_div" onClick={favoriteHandler}>
                     {FavoriteGameInfo?.type ===
                     'userAddedInGameFavoriteCollection' ? (
                        <AiTwotoneStar className={'text-red-400'} />
                     ) : FavoriteGameInfo?.type ===
                       'userRemoveFromGameFavoriteCollection' ? (
                        <AiTwotoneStar className={'text-gray-400'} />
                     ) : (
                        <AiTwotoneStar
                           className={
                              singleGame.game[0]?._id?.gameInFavoritesList
                                 .length
                                 ? 'text-red-400'
                                 : 'text-gray-400'
                           }
                        />
                     )}
                     <p className="text-gray-400 text-lg font-medium">
                        {singleGame?.game[0]?._id?.favoritesSize +
                           FavoriteGameNumber}
                     </p>
                  </div>
               )}
               <div className="box_div" onClick={shareGameLink}>
                  <RiSendPlaneFill className="text-gray-400" />
               </div>
            </div>
            <div>
               <div className="box_div" onClick={makeFullScreen}>
                  <BsFullscreen className="text-gray-400" />
               </div>
            </div>
         </styled.optionDiv>
         {!!FavoriteGameError ? (
            <p className="text-sm error_cl">{FavoriteGameError}</p>
         ) : null}
         {!!LikeGameError ? (
            <p className="text-sm error_cl">{LikeGameError}</p>
         ) : null}
      </styled.div>
   );
}

export default React.memo(GameScreenComponent);
