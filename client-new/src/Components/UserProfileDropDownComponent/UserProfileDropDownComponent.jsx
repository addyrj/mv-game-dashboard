import React, { useRef } from 'react';
import { GoThreeBars } from '@react-icons/all-files/go/GoThreeBars';
import UserGlobalSettingComponent from '../UserGlobalSettingComponent/UserGlobalSettingComponent';
import {
   toggleProfileInfoHandler,
   toggleUserWalletHandler,
} from '../../App/Features/Client/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import CurrencySwapPopupComponent from '../CurrencySwapPopupComponent/CurrencySwapPopupComponent';
import { AnimatePresence } from 'framer-motion';
import { showSwapPopupSelector } from './UserProfile.Selector';

function UserProfileDropDownComponent() {
   const globalOptionsRef = useRef(null);
   const dispatch = useDispatch();

   const showSwapPopup = useSelector(showSwapPopupSelector);

   const showGlobalOptions = function () {
      globalOptionsRef.current.classList.add('popUp_inner_div_active');
   };

   const closeGlobalOptionsHandler = function () {
      globalOptionsRef.current.classList.remove('popUp_inner_div_active');
   };

   const userInfoHandler = function () {
      dispatch(toggleProfileInfoHandler(true));
   };

   const showAndHidePaymentOptions = function () {
      dispatch(toggleUserWalletHandler(true));
   };

   return (
      <div>
         <AnimatePresence>
            {!!showSwapPopup && <CurrencySwapPopupComponent />}
         </AnimatePresence>
         <div className="User_setting_icon_div user_setting_prent">
            <div
               className="box_div text-gray-500"
               onMouseEnter={showGlobalOptions}
               onMouseLeave={closeGlobalOptionsHandler}
            >
               <GoThreeBars className="text-gray-500 hover_icon" />
            </div>
            <div
               className="popUp_inner_div"
               ref={globalOptionsRef}
               onMouseEnter={showGlobalOptions}
               onMouseLeave={closeGlobalOptionsHandler}
            >
               <UserGlobalSettingComponent
                  profileHandler={userInfoHandler}
                  closeEvent={closeGlobalOptionsHandler}
                  showWallet={showAndHidePaymentOptions}
               />
            </div>
         </div>
      </div>
   );
}

export default UserProfileDropDownComponent;
