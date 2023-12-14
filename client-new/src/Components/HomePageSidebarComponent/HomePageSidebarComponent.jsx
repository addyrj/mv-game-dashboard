import React, { useEffect } from 'react';
import SideBarChatContainerComponent from '../SideBarChatContainerComponent/SideBarChatContainerComponent';
import { PopUpContext } from '../../Context/PopUpContext';
import * as styled from './HomePageSidebarComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import NotificationSidebarComponent from '../NotificationSidebarComponent/NotificationSidebarComponent';
import {
   showSidebarChatSelector,
   showSidebarNotificationsSelector,
} from './HomePage.Selector';
import { getAllSystemNotifications } from '../../App/Features/Notifications/notificationActions';

function HomePageSidebarComponent() {
   const dispatch = useDispatch();
   const showSidebarChat = useSelector(showSidebarChatSelector);
   const showSidebarNotifications = useSelector(
      showSidebarNotificationsSelector
   );

   useEffect(() => {
      dispatch(getAllSystemNotifications());
   }, []);

   return (
      <styled.div show={showSidebarChat || showSidebarNotifications}>
         <PopUpContext>
            <SideBarChatContainerComponent show={showSidebarChat} />
         </PopUpContext>
         <AnimatePresence>
            {showSidebarNotifications ? <NotificationSidebarComponent /> : null}
         </AnimatePresence>
      </styled.div>
   );
}

export default HomePageSidebarComponent;
