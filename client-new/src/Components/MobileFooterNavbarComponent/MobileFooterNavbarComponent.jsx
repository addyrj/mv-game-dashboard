import React from 'react';
import * as styled from './MobileFooterNavbarComponent.style';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import {
   removeSeenGlobalMsg,
   showNotificationHandler,
   showSidebarHandler,
   toggleUserWalletHandler,
} from '../../App/Features/Client/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showSidebarChatSelector, authSelector } from './MobileNav.Selector';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { toggleProfileInfoHandler } from '../../App/Features/Client/clientSlice';

const ButtonsAr = [
   { name: 'Menu', id: 1, icon: '/images/bars.svg' },
   { name: 'Casino', id: 2, icon: '/images/casino.svg' },
   { name: 'Wallet', id: 3, icon: '/images/wallet.svg' },
   { name: 'Sports', id: 4, icon: '/images/Union_s.svg' },
   { name: 'Profile', id: 5, icon: '/images/user.svg' },
];

function MobileFooterNavbarComponent({ showMenu }) {
   const isMobile = useMediaQuery({ query: '(max-width: 720px)' });
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const showSidebarChat = useSelector(showSidebarChatSelector);
   const auth = useSelector(authSelector);

   const showHandler = function () {
      dispatch(
         showNotificationHandler({
            data: true,
         })
      );
   };

   const showChatsHandler = function () {
      dispatch(showSidebarHandler({ data: true }));
      if (!showSidebarChat) {
         dispatch(removeSeenGlobalMsg());
      }
   };

   const boxHandler = function (value, input) {
      if (input === 'Menu') {
         showMenu();
      }

      if (!auth) return toast.error('You need to login first');

      if (input === 'Alerts') {
         showHandler();
      }

      // if (input === 'Chats') {
      //    showChatsHandler();
      // }

      if (input === 'Wallet') {
         dispatch(toggleUserWalletHandler(true));
      }

      if (input === 'Profile') {
         dispatch(toggleProfileInfoHandler(true));
      }

      if (input === 'Casino') {
         navigation('/casino');
      }

      if (input === 'Sports') {
         navigation('/sports');
      }
   };

   return (
      <AnimatePresence>
         {isMobile && (
            <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 100 }}
               className="mobile_nv_div"
            >
               <div className="flex items-center justify-between">
                  {ButtonsAr.map((el) => (
                     <styled.iconBox
                        key={el.id}
                        onClick={() => boxHandler(el?.id, el?.name)}
                     >
                        <div className="icon">
                           <img src={el?.icon} />
                        </div>
                        <p className="mt-2 text-gray-400 font-medium text-sm">
                           {el?.name}
                        </p>
                     </styled.iconBox>
                  ))}
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}

export default MobileFooterNavbarComponent;
