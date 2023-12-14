import React, { useState, useCallback } from 'react';
import * as styled from './NotificationSidebarComponent.style';
import { motion } from 'framer-motion';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { showSidebarHandler } from '../../App/Features/Client/clientSlice';
import { useDispatch } from 'react-redux';
import NavbarTabComponent from '../NavbarTabComponent/NavbarTabComponent';
import { AiFillGift } from '@react-icons/all-files/ai/AiFillGift';
import SystemNotificationComponent from '../SystemNotificationComponent/SystemNotificationComponent';
import RewardNotificationComponent from '../RewardNotificationComponent/RewardNotificationComponent';

function NotificationSidebarComponent() {
   const [ActiveTab, setActiveTab] = useState('System Notice');
   const dispatch = useDispatch();

   const activeTabHandler = function (heading) {
      setActiveTab(heading);
   };

   const backHandler = useCallback(() => {
      dispatch(showSidebarHandler({ data: false }));
   }, [dispatch]);

   return (
      <motion.div
         id="notification_div"
         initial={{ x: 500 }}
         animate={{ x: 0 }}
         exit={{ x: 500 }}
         transition={{ duration: 0.5 }}
      >
         <styled.div>
            <ModelHeaderComponent
               heading={'Notification'}
               backIcon={false}
               back={backHandler}
            />
            <div className="flex items-center">
               <div className="w-100">
                  <NavbarTabComponent
                     heading={'System Notice'}
                     arrow={false}
                     cl={'notification'}
                     tab={true}
                     onClick={activeTabHandler}
                     active={ActiveTab}
                  />
               </div>
               {/* <div className="w-100">
                  <NavbarTabComponent
                     heading={'Reward'}
                     arrow={false}
                     cl={'notification'}
                     tab={true}
                     onClick={activeTabHandler}
                     active={ActiveTab}
                     icon={<AiFillGift />}
                  />
               </div> */}
               <div className="w-100">
                  <NavbarTabComponent
                     heading={'Activities'}
                     arrow={false}
                     cl={'notification'}
                     tab={true}
                     onClick={activeTabHandler}
                     active={ActiveTab}
                  />
               </div>
            </div>
            <styled.notificationRender>
               {ActiveTab === 'System Notice' ? (
                  <SystemNotificationComponent />
               ) : null}
               {/* {ActiveTab === 'Reward' ? <RewardNotificationComponent /> : null} */}
            </styled.notificationRender>
         </styled.div>
      </motion.div>
   );
}

export default NotificationSidebarComponent;
