import React, { Fragment, useEffect, useContext, useRef } from 'react';
import * as styled from './UserNavbarWalletComponent.style';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import {
   rejectRequestSenderHandler,
   acceptedFriendSenderHandler,
   blockedFriendRequesteSenderHandler,
   showUserInboxHandler,
   newFrinedRequest,
   updateUserPrivacy,
   updateUserProfilePrivacyInfo,
} from '../../App/Features/Client/clientSlice';
import { SocketContext } from '../../Context/SocketIoContext';
import InboxPopUpComponent from '../InboxPopUpComponent/InboxPopUpComponent';
import toast from 'react-hot-toast';
import {
   showUserInboxSelector,
   authSelector,
   authLoadingSelector,
   authFetchErrorSelector,
} from './UserNavbar.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
   pullSystemNotifications,
   pushSystemNotifications,
} from '../../App/Features/Notifications/notificationSlice';
import NavbarUserCurrencyComponent from '../NavbarUserCurrencyComponent/NavbarUserCurrencyComponent';
import UserPaymentWalletComponent from '../UserPaymentWalletComponent/UserPaymentWalletComponent';
import SignInAndLoginButtonsComponent from '../SignInAndLoginButtonsComponent/SignInAndLoginButtonsComponent';
import UserProfilePicComponent from '../UserProfilePicComponent/UserProfilePicComponent';
import UserProfileDropDownComponent from '../UserProfileDropDownComponent/UserProfileDropDownComponent';
import ShowSidebarNotificationIconComponent from '../ShowSidebarNotificationIconComponent/ShowSidebarNotificationIconComponent';
import ChatToggleIconComponent from '../ChatToggleIconComponent/ChatToggleIconComponent';
import {
   decreaseUserFiatWalletBlc,
   showMoneyAnimation,
   updateUserCryptoWallet,
   updateUserFaitWallet,
} from '../../App/Features/Payment/paymentSlice';
import {
   updateSingleUserGroupInfo,
   updateUserPrivacyHandler,
} from '../../App/Features/Group/groupSlice.js';
import { getPrivacyFieldStatus } from '../../App/Features/Client/clientActions';
import { useSharedState } from '../../Context/PopUpContext';
import WebSettingComponent from '../WebSettingComponent/WebSettingComponent';

const countdownTime = 1684669734680;

function UserNavbarWalletComponent() {
   const timerRef = useRef(null);

   const dispatch = useDispatch();
   const socket = useContext(SocketContext);
   const [PopUpContextState, setPopUpContextState] = useSharedState();
   const showUserInbox = useSelector(showUserInboxSelector);
   const auth = useSelector(authSelector);
   const authLoading = useSelector(authLoadingSelector);
   const authFetchError = useSelector(authFetchErrorSelector);

   const showInboxHandler = function () {
      dispatch(showUserInboxHandler({ data: !showUserInbox }));
      setPopUpContextState({
         ...PopUpContextState,
         showEditAvatar: false,
      });
   };

   const friendReuquestHandler = function (args) {
      toast.success(args.msg);

      dispatch(
         newFrinedRequest({ ...args, userId: args?.user || args?.userId })
      );
   };

   const rejectFriendRequest = function (args) {
      toast.error(args.msg);
      dispatch(rejectRequestSenderHandler({ id: args.user }));
   };

   const acceptedFriendRequest = function (args) {
      toast.success(args.msg);
      dispatch(acceptedFriendSenderHandler({ id: args.selectedUser }));
   };

   const blockedFreiendRequest = function (args) {
      toast.error(args.msg);
      dispatch(blockedFriendRequesteSenderHandler({ id: args.selectedUser }));
   };

   const systemNotificationHandler = function (arg) {
      const type = arg?.type;

      if (type === 'pushNotification') {
         toast.success('New system notification!');
         dispatch(pushSystemNotifications(arg));
      }

      if (type === 'pullNotification') dispatch(pullSystemNotifications(arg));
   };

   const userPaymentHandler = function (arg) {
      const { wayName, currencyType } = arg;

      if (wayName === 'FIAT') {
         toast.success(arg?.message);
         console.log(arg);
         dispatch(updateUserFaitWallet(arg));
      }

      if (currencyType === 'CRYPTO' && auth?.user?.userId == arg?.userCrId) {
         dispatch(updateUserCryptoWallet(arg));
         toast.success(arg?.message);
      }
   };

   const betGameResult = function (args) {
      const { currencyType, userId, betStatus } = args;
      const _id = auth?.user?._id;

      if (currencyType === 'fiatCurrency' && userId === _id) {
         if (betStatus === 'win') {
            const winObject = {
               amount: args?.amount,
               currencyId: args?.currencyId,
               userId: args?.userId,
               wayName: args?.currencyType,
            };
            dispatch(updateUserFaitWallet(winObject));
            dispatch(
               showMoneyAnimation({
                  status: 'add',
                  show: true,
               })
            );
            setTimeout(() => {
               dispatch(showMoneyAnimation(null));
            }, 1300);
         } else if (betStatus === 'loss') {
            const lossObject = {
               payAmount: args?.amount,
               currencyId: args?.currencyId,
               userId: args?.userId,
               success: true,
            };

            dispatch(decreaseUserFiatWalletBlc({ data: lossObject }));
         }
      }

      if (currencyType === 'CRYPTO' && userId === _id) {
         dispatch(
            updateUserCryptoWallet({
               symbol: args?.symbol,
               currencyType: args?.currencyType,
               type: betStatus === 'win' ? 'increment' : 'decrement',
               balance: args?.amount,
            })
         );

         if (betStatus === 'win') {
            dispatch(
               showMoneyAnimation({
                  status: 'add',
                  show: true,
               })
            );
            setTimeout(() => {
               dispatch(showMoneyAnimation(null));
            }, 1300);
         }
      }
   };

   const userPaymentFaild = function (arg) {
      toast.error(arg?.message);
   };

   const profileInfoChange = function (arg) {
      toast.success(arg?.message);
      delete arg?.message;
      dispatch(updateSingleUserGroupInfo(arg));
   };

   const globalUserInfoHandler = function (arg) {
      dispatch(updateSingleUserGroupInfo(arg));
   };

   const updateUserPrivacyInfo = function (args) {
      dispatch(updateUserPrivacyHandler(args));
      dispatch(
         updateUserProfilePrivacyInfo({
            userId: args?.userId,
            field: args?.field,
            value: args?.value,
         })
      );
      if (args?.userId === auth?.user?._id) {
         const updateObject = {
            [args?.field]: args?.value,
         };
         dispatch(updateUserPrivacy({ data: updateObject }));
      }
   };

   const gameBetTransactions = function (args) {
      if (args?.userId === auth?.user?._id && args.currencyType === 'FIAT') {
         const lossObject = {
            payAmount: args?.amount,
            currencyId: args?.currencyId,
            userId: args?.userId,
            success: true,
         };

         dispatch(decreaseUserFiatWalletBlc({ data: lossObject }));
      }
   };

   function updateCountdown() {
      const currentTime = new Date().getTime();
      const remainingTime = countdownTime - currentTime;
      if (remainingTime <= 0) {
         timerRef.current.textContent = 'Countdown finished!';
         return;
      }

      let days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      let hours = Math.floor(
         (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      let minutes = Math.floor(
         (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
      );
      let seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      timerRef.current.textContent = `${days}:${hours}:${minutes}:${seconds}`;
   }

   useEffect(() => {
      if (auth && auth?.user && auth?.user?.userId) {
         socket.on('__payment_successful', userPaymentHandler);
         socket.on('__user_privacy_update_respose', updateUserPrivacyInfo);
         socket.on('__game_bet_result', betGameResult);
         socket.on('__game_bet_transaction', gameBetTransactions);

         dispatch(getPrivacyFieldStatus({ userId: auth?.user?._id }));
      }

      return () => {
         socket.off('__payment_successful', userPaymentHandler);
         socket.off('__user_privacy_update_respose', updateUserPrivacyInfo);
         socket.off('__game_bet_result', betGameResult);
         socket.off('__game_bet_transaction', gameBetTransactions);
      };
   }, [auth]);

   useEffect(() => {
      socket.on('__friend_request_respose', friendReuquestHandler);
      socket.on('__friend_request_rejectd_respose', rejectFriendRequest);
      socket.on('__friend_request_accepted_respose', acceptedFriendRequest);
      socket.on('__friend_request_blocked_respose', blockedFreiendRequest);
      socket.on('_system_notification_response', systemNotificationHandler);
      socket.on('__payment_failed', userPaymentFaild);
      socket.on('__profile_info_change', profileInfoChange);
      socket.on('__user_chage_profile_info', globalUserInfoHandler);

      // const interval = setInterval(() => {
      //    updateCountdown();
      // }, 1000);

      return () => {
         socket.off('__friend_request_respose', friendReuquestHandler);
         socket.off('__friend_request_rejectd_respose', rejectFriendRequest);
         socket.off('__friend_request_accepted_respose', acceptedFriendRequest);
         socket.off('__friend_request_blocked_respose', blockedFreiendRequest);
         socket.off('_system_notification_response', systemNotificationHandler);
         socket.off('__payment_failed', userPaymentFaild);
         socket.off('__profile_info_change', profileInfoChange);
         socket.off('__user_chage_profile_info', globalUserInfoHandler);
         // clearInterval(interval);
      };
   }, []);

   return (
      <styled.div>
         <div className="pay_options_div flex items-center">
            {/* <div>
               <div className="flex items-center me-3">
                  <RiTimerFill className="text-gray-200" />
                  <p
                     className="text-gray-300 text-sm font-semibold ms-2"
                     ref={timerRef}
                  />
               </div>
            </div> */}
            {!auth?.success && <SignInAndLoginButtonsComponent />}
            {!authLoading &&
            !!auth &&
            !authFetchError &&
            !auth?.error &&
            auth.success ? (
               <Fragment>
                  <div>
                     <div className="coin_div flex items-center me-3">
                        <LazyLoadImage src="/images/gold-coin-m.png" />
                        <p className="text-gray-300 text-sm font-semibold ms-2">
                           {auth?.user?.coins?.[0]?.balance}
                        </p>
                     </div>
                  </div>
                  <NavbarUserCurrencyComponent />
                  <UserPaymentWalletComponent />
               </Fragment>
            ) : null}
            {!!auth && auth?.success && !auth.error ? (
               <>
                  <div className="me-4">
                     <AnimatePresence>
                        {!!showUserInbox ? (
                           <InboxPopUpComponent close={showInboxHandler} />
                        ) : null}
                     </AnimatePresence>
                  </div>
                  <UserProfilePicComponent />
                  <UserProfileDropDownComponent />
                  <div className="User_setting_icon_div mobile_sm_options_hide">
                     <Badge badgeContent={0}>
                        <div className="box_div" onClick={showInboxHandler}>
                           <LazyLoadImage
                              src="/images/inbox-Filled.svg"
                              alt=""
                           />
                        </div>
                     </Badge>
                  </div>
                  <ShowSidebarNotificationIconComponent />
               </>
            ) : null}
            {!!auth && auth?.success ? (
               <Fragment>
                  <ChatToggleIconComponent />
                  <WebSettingComponent />
               </Fragment>
            ) : null}
         </div>
      </styled.div>
   );
}

export default React.memo(UserNavbarWalletComponent);
