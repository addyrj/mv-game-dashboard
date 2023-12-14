import React, { useContext, useEffect, useRef } from 'react';
import * as styled from './HomePage.style';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent';
import { Outlet, useLocation } from 'react-router';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import HomePageSidebarComponent from '../../Components/HomePageSidebarComponent/HomePageSidebarComponent';
import { useSelector } from 'react-redux';
import {
   authSelector,
   showAndHideSmSidebarSelector,
} from './HomePage.Selector';
import { SocketContext } from '../../Context/SocketIoContext';
import MobileFooterNavbarComponent from '../../Components/MobileFooterNavbarComponent/MobileFooterNavbarComponent';
import { showAndHideSideBarHandler } from '../../App/Features/Client/clientSlice';
import { useDispatch } from 'react-redux';
import { getUserSelectedCurrency } from '../../App/Features/Client/clientActions';

function HomePage() {
   const RenderRef = useRef(null);
   const socket = useContext(SocketContext);
   const MenuRef = useRef(null);
   const dispatch = useDispatch();
   const { pathname } = useLocation();

   const auth = useSelector(authSelector);
   const showAndHideSmSidebar = useSelector(showAndHideSmSidebarSelector);

   useEffect(() => {
      if (auth && auth?.user && auth?.user?._id) {
         const userObejct = {
            userId: auth?.user._id,
            userCrId: auth?.user.userId,
         };
         dispatch(getUserSelectedCurrency({ userId: auth?.user._id }));
         socket.emit('_online_user', userObejct);
      }
   }, [auth]);

   useEffect(() => {
      RenderRef.current.scroll({
         top: 0,
      });
   }, [pathname]);

   const showSideBarMenuHandler = function () {
      dispatch(showAndHideSideBarHandler(true));
   };

   return (
      <styled.div>
         <div
            className={
               showAndHideSmSidebar
                  ? 'bg-dark nav_lg mobile_nav_div mobile_nav_div_show'
                  : 'bg-dark nav_lg mobile_nav_div mobile_nav_div_hide'
            }
            ref={MenuRef}
         >
            <SidebarComponent middelPageRef={RenderRef} />
         </div>
         <div className="renderDiv pb-5" ref={RenderRef}>
            <NavbarComponent />
            <Outlet />
         </div>
         {!!auth && auth?.success && !!auth?.user ? (
            <HomePageSidebarComponent />
         ) : null}
         <MobileFooterNavbarComponent showMenu={showSideBarMenuHandler} />
      </styled.div>
   );
}

export default HomePage;
