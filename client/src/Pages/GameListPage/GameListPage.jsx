import React, { useEffect } from 'react';
import * as style from './GameListPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import useRoles from '../../Hooks/useRoles';
import { useSearchParams } from 'react-router-dom';
import { getGamesLists } from '../../App/Features/Games/GameActions';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GameCardComponent from '../../Components/GameCardComponent/GameCardComponent';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { gameListInfoSelector, gameListLoadingSelector, gameListInfoErrorSelector } from './GameList.Selector';

function GameListPage() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [params] = useSearchParams();
   const page = params.get('page');
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const gameListInfo = useSelector(gameListInfoSelector);
   const gameListLoading = useSelector(gameListLoadingSelector);
   const gameListInfoError = useSelector(gameListInfoErrorSelector);

   const CreateGameHandler = function () {
      navigation('/games/create');
   };

   useEffect(() => {
      if (isAdmin && page) {
         dispatch(getGamesLists({ page: page }));
      }
   }, [isAdmin, page]);

   return (
      <style.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'All games'}
               subHeading={'All Games'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
               menu={true}
               innerProps={<MenuItem onClick={CreateGameHandler}>Upload new game</MenuItem>}
            />
            {!!gameListLoading ? (
               <div className="mt-2">
                  <SpinnerComponent />
               </div>
            ) : null}
            {!!gameListInfo && gameListInfo?.success && gameListInfo?.games.length ? (
               <div className="mt-5 py-4 game_cards">
                  {gameListInfo?.games.map((el) => (
                     <GameCardComponent key={el._id} data={el} />
                  ))}
               </div>
            ) : null}
            {!!gameListInfoError ? <p className="text-sm error_cl">{gameListInfoError}</p> : null}
         </div>
      </style.div>
   );
}

export default GameListPage;
