import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { setLoginUser } from './App/Features/Auth/authSlice';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { getGamesEnableCategory } from './App/Features/Client/clientActions';
import { getEnableDraw } from './App/Features/LuckyDraw/LuckyDrawActions';

// components
import { createTheme, ThemeProvider } from '@mui/material';
import HomePageComponent from './Components/HomePageComponent/HomePageComponent';
import OfflineConnectionComponent from './Components/OfflineConnectionComponent/OfflineConnectionComponent';

// pages
import HomePage from './Pages/HomePage/HomePage';
import SingleGamePage from './Pages/SingleGamePage/SingleGamePage';
import GamesListPage from './Pages/GamesListPage/GamesListPage';
import RecentlyPlayedGamesPage from './Pages/RecentlyPlayedGamesPage/RecentlyPlayedGamesPage';
import MyFavouriteGamesPage from './Pages/MyFavouriteGamesPage/MyFavouriteGamesPage';
import GameProviderPage from './Pages/GameProviderPage/GameProviderPage';
import SlotsGamesPage from './Pages/SlotsGamesPage/SlotsGamesPage';
import LiveCasinoPage from './Pages/LiveCasinoPage/LiveCasinoPage';
import HotGamesPage from './Pages/HotGamesPage/HotGamesPage';
import AllGamesPage from './Pages/AllGamesPage/AllGamesPage';
import NewGamesPage from './Pages/NewGamesPage/NewGamesPage';
import GlobalSettingsPage from './Pages/GlobalSettingsPage/GlobalSettingsPage';
import SportsPage from './Pages/SportsPage/SportsPage';
import LotteryPage from './Pages/LotteryPage/LotteryPage';

const muiTheme = createTheme({
   palette: {
      mode: 'dark',
      success: {
         main: '#3bc117',
      },
   },
});

function App() {
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const { darkAlgorithm } = theme;

   useEffect(() => {
      if (cookie && cookie?._mv_games_auth) {
         dispatch(setLoginUser({ auth: cookie?._mv_games_auth }));
      }
      dispatch(getEnableDraw());
      dispatch(getGamesEnableCategory());
   }, []);

   return (
      <ConfigProvider
         theme={{
            algorithm: darkAlgorithm,
         }}
      >
         <div className="App">
            <OfflineConnectionComponent />
            <ThemeProvider theme={muiTheme}>
               <div className="flex">
                  <Routes>
                     <Route path="/" element={<HomePage />}>
                        <Route path="/" element={<HomePageComponent />} />
                        <Route
                           path="game/:gameName/:id"
                           element={<SingleGamePage />}
                        />
                        <Route path="/search" element={<GamesListPage />} />
                        <Route
                           path="/recent-games"
                           element={<RecentlyPlayedGamesPage />}
                        />
                        <Route
                           path="/favourite-games"
                           element={<MyFavouriteGamesPage />}
                        />
                        <Route
                           path="/provider/:name"
                           element={<GameProviderPage />}
                        />
                        <Route path="/slots" element={<SlotsGamesPage />} />
                        <Route path="/casino" element={<LiveCasinoPage />} />
                        <Route path="/hot" element={<HotGamesPage />} />
                        <Route path="/all-games" element={<AllGamesPage />} />
                        <Route path="/new-games" element={<NewGamesPage />} />
                        <Route
                           path="/global-setting"
                           element={<GlobalSettingsPage />}
                        />
                        <Route path="/sports" element={<SportsPage />} />
                        <Route path="/lottery" element={<LotteryPage />} />
                     </Route>
                  </Routes>
               </div>
            </ThemeProvider>
         </div>
      </ConfigProvider>
   );
}

export default App;
