import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { showNotificationHandler } from '../../App/Features/Client/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showSidebarNotificationsSelector } from './ShowSidebar.Selector';
import { Badge } from '@mui/material';

function ShowSidebarNotificationIconComponent() {
   const dispatch = useDispatch();
   const showSidebarNotifications = useSelector(
      showSidebarNotificationsSelector
   );

   return (
      <div>
         <div className="User_setting_icon_div mobile_sm_options_hide">
            <Badge badgeContent={0}>
               <div
                  className="box_div"
                  onClick={() =>
                     dispatch(
                        showNotificationHandler({
                           data: !showSidebarNotifications,
                        })
                     )
                  }
               >
                  <LazyLoadImage
                     src="/images/Notification.svg"
                     className="userNotification"
                     alt=""
                  />
               </div>
            </Badge>
         </div>
      </div>
   );
}

export default ShowSidebarNotificationIconComponent;
