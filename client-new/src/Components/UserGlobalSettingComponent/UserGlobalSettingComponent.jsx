import React from 'react';
import * as styled from './UserGlobalSettingComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import { BiLogOut } from '@react-icons/all-files/bi/BiLogOut';
import IconSmComponent from '../IconSmComponent/IconSmComponent';
import { useCookies } from 'react-cookie';
import { logOut } from '../../App/Features/Auth/authSlice';
import { FaWallet } from '@react-icons/all-files/fa/FaWallet';
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt';
import { GiProgression } from '@react-icons/all-files/gi/GiProgression';
import { AiOutlineTransaction } from '@react-icons/all-files/ai/AiOutlineTransaction';
import { AiOutlineFileProtect } from '@react-icons/all-files/ai/AiOutlineFileProtect';
import { MdLiveTv } from '@react-icons/all-files/md/MdLiveTv';
import { MdSupervisorAccount } from '@react-icons/all-files/md/MdSupervisorAccount';
import { authSelector } from './User.Selector';
import { BsInboxes } from '@react-icons/all-files/bs/BsInboxes';
import { BiNotification } from '@react-icons/all-files/bi/BiNotification';
import { BsChatSquareDots } from '@react-icons/all-files/bs/BsChatSquareDots';
import {
   removeSeenGlobalMsg,
   showAndHideSwapPopupHandler,
   showNotificationHandler,
   showSidebarHandler,
   showUserInboxHandler,
} from '../../App/Features/Client/clientSlice';
import {
   showSidebarChatSelector,
   showSidebarNotificationsSelector,
} from './User.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { showAndHideTransactionInfo } from '../../App/Features/Payment/paymentSlice';
import { AiTwotoneSetting } from '@react-icons/all-files/ai/AiTwotoneSetting';
import { useNavigate } from 'react-router';
import { userLogOut } from '../../App/Features/Game/gameSlice';
import { MdSwapCalls } from '@react-icons/all-files/md/MdSwapCalls';

function UserGlobalSettingComponent({
   closeEvent,
   showWallet,
   profileHandler,
}) {
   const [cookie, _, removeCookie] = useCookies();
   const auth = useSelector(authSelector);
   const navigation = useNavigate();

   const dispatch = useDispatch();

   const showSidebarChat = useSelector(showSidebarChatSelector);
   const showSidebarNotifications = useSelector(
      showSidebarNotificationsSelector
   );

   const globalSettingHandler = function () {
      closeEvent();
      navigation('/global-setting');
   };

   const logOutHandler = function () {
      removeCookie('_mv_games_access_token');
      removeCookie('_mv_games_auth');
      removeCookie('_mv_games_refresh_token');
      dispatch(logOut());
      dispatch(userLogOut());
      navigation('/');
   };

   const showInboxHandler = function () {
      closeEvent();
      dispatch(showUserInboxHandler({ data: true }));
   };

   const notificationHandler = function () {
      closeEvent();
      dispatch(
         showNotificationHandler({
            data: !showSidebarNotifications,
         })
      );
   };

   const showChatsHandler = function () {
      closeEvent();
      dispatch(showSidebarHandler({ data: true }));
      if (!showSidebarChat) {
         dispatch(removeSeenGlobalMsg());
      }
   };

   const showAndHideTransactionHandler = function () {
      dispatch(showAndHideTransactionInfo(true));
      closeEvent();
   };

   const showUserWalletHandler = function () {
      closeEvent();
      showWallet();
   };

   return (
      <styled.div className="shadow">
         <div className="user_profile_inner_div d-flex items-center justify-between">
            <div className="profile_div d-flex items-center">
               <div className="profile_inner_div">
                  <LazyLoadImage
                     src={auth?.user?.avatar}
                     alt=""
                     crossOrigin="anonymous"
                  />
               </div>
               {!!auth?.user?.email && (
                  <p className="ms-2 text-white text-sm">
                     {auth?.user?.email.slice(0, 15)}...
                  </p>
               )}
            </div>
            <div
               className="flex items-center hover_div"
               onClick={globalSettingHandler}
            >
               <AiTwotoneSetting />
               <p className="text-sm ms-2 d-none d-sm-block">Global Setting</p>
            </div>
         </div>
         <div className="mt-3">
            <div className="icons_grous_div py-2 px-2 bg-dark rounded">
               <div className="flex items-center justify-between d-block d-sm-flex">
                  <div
                     className="icons_group_inner_div"
                     onClick={profileHandler}
                  >
                     <IconSmComponent
                        text={'User information'}
                        icons={<FaUserAlt />}
                     />
                  </div>
                  <div
                     className="icons_group_inner_div"
                     onClick={showUserWalletHandler}
                  >
                     <IconSmComponent icons={<FaWallet />} text={'Wallet'} />
                  </div>
               </div>
               <div className="flex items-center justify-between d-block d-sm-flex">
                  <div
                     className="icons_group_inner_div"
                     onClick={() => dispatch(showAndHideSwapPopupHandler(true))}
                  >
                     <IconSmComponent text={'MVSwap'} icons={<MdSwapCalls />} />
                  </div>
                  <div
                     className="icons_group_inner_div"
                     onClick={showAndHideTransactionHandler}
                  >
                     <IconSmComponent
                        icons={<AiOutlineTransaction />}
                        text={'Transactions'}
                     />
                  </div>
               </div>
               <div className="flex items-center justify-between d-block d-sm-flex">
                  <div className="icons_group_inner_div">
                     <IconSmComponent
                        text={'Statistics'}
                        icons={<GiProgression />}
                     />
                  </div>
                  <div className="icons_group_inner_div">
                     <IconSmComponent
                        icons={<AiOutlineFileProtect />}
                        text={'Vault Pro'}
                     />
                  </div>
               </div>
               <div className="flex items-center justify-between d-block d-sm-flex">
                  <div className="icons_group_inner_div">
                     <IconSmComponent
                        text={'Live Support'}
                        icons={<MdLiveTv />}
                     />
                  </div>
                  <div className="icons_group_inner_div">
                     <IconSmComponent
                        icons={<MdSupervisorAccount />}
                        text={'Refer a friend'}
                     />
                  </div>
               </div>
               <div className="mobile_sm_options">
                  <div className="flex items-center justify-between d-block d-sm-flex">
                     <div
                        className="icons_group_inner_div"
                        onClick={showInboxHandler}
                     >
                        <IconSmComponent text={'Inbox'} icons={<BsInboxes />} />
                     </div>
                     <div
                        className="icons_group_inner_div"
                        onClick={notificationHandler}
                     >
                        <IconSmComponent
                           icons={<BiNotification />}
                           text={'Notification'}
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-between d-block d-sm-flex">
                     <div
                        className="icons_group_inner_div"
                        onClick={showChatsHandler}
                     >
                        <IconSmComponent
                           text={'Chat'}
                           icons={<BsChatSquareDots />}
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-2 ps-2">
               <IconSmComponent
                  icons={<BiLogOut />}
                  text={'Log out'}
                  onClick={logOutHandler}
               />
            </div>
         </div>
      </styled.div>
   );
}

export default UserGlobalSettingComponent;
