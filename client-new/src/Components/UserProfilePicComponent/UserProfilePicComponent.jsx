import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector, useDispatch } from 'react-redux';
import UserProfileModelComponent from '../UserProfileModelComponent/UserProfileModelComponent';
import * as styled from './UserProfilePicComponent.style';
import {
   updateAvatarSelector,
   authSelector,
   toggleUserProfileInfoSelector,
} from './UserProfile.Selector';
import { toggleProfileInfoHandler } from '../../App/Features/Client/clientSlice';
import { useSharedState } from '../../Context/PopUpContext';

function UserProfilePicComponent() {
   const dispatch = useDispatch();
   const [PopUpContextState, setPopUpContextState] = useSharedState();
   const toggleUserProfileInfo = useSelector(toggleUserProfileInfoSelector);
   const auth = useSelector(authSelector);
   const updateAvatar = useSelector(updateAvatarSelector);

   const profileModelHandler = function (event, input) {
      if (event.target.id === 'overLay_div') {
         setPopUpContextState({
            ...PopUpContextState,
            showEditPopUp: false,
            showEditAvatar: false,
         });
         return dispatch(toggleProfileInfoHandler(false));
      }

      if (input === 'closeEvent') {
         return dispatch(toggleProfileInfoHandler(false));
      }

      if (!toggleUserProfileInfo) {
         dispatch(toggleProfileInfoHandler(!toggleUserProfileInfo));
      }
   };

   return (
      <styled.div>
         <AnimatePresence>
            {toggleUserProfileInfo ? (
               <UserProfileModelComponent
                  Close={profileModelHandler}
                  profileModel={true}
               />
            ) : null}
         </AnimatePresence>
         <div className="user_sort_profile_div flex items-center ms-0 ms-lg-2">
            <div>
               <div className="profile" onClick={profileModelHandler}>
                  <LazyLoadImage
                     src={
                        updateAvatar &&
                        updateAvatar?.success &&
                        updateAvatar?.avatar
                           ? updateAvatar?.avatar
                           : auth?.user?.avatar
                     }
                     alt=""
                     crossOrigin="anonymous"
                  />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default UserProfilePicComponent;
