import React, { useContext } from 'react';
import { profilePrivacyHandler } from '../../App/Features/Client/clientActions';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../Context/SocketIoContext';
import PrivacyListComponent from '../PrivacyListComponent/PrivacyListComponent';
import { authSelector } from './Privacy.Selector';
import toast from 'react-hot-toast';

function PrivacySettingListComponent({ userProfilePrivacyInfo }) {
   const dispatch = useDispatch();
   const socket = useContext(SocketContext);

   const auth = useSelector(authSelector);

   const changeHandler = function (event) {
      if (auth && auth?.user && auth?.user?._id) {
         const { checked, name } = event.target;

         const updateObject = {
            field: name,
            value: checked,
            userId: auth?.user?._id,
         };

         dispatch(profilePrivacyHandler(updateObject));
         socket.emit('__user_privacy_setting_update', updateObject);
      } else {
         toast.error('need to login first');
      }
   };

   return (
      <div className="p-3">
         <PrivacyListComponent
            heading={'Hide my gaming data on my profile.'}
            subHeading={`Even if hidden, your avatar and username are always visible in chatrooms.`}
            onClick={changeHandler}
            name={'statisticsHidden'}
            value={userProfilePrivacyInfo?.response?.statisticsHidden}
         />
         <PrivacyListComponent
            heading={'Hide my profile from public lists.'}
            subHeading={
               'If hidden, no one can view your profile by clicking on your avatar or username on public rankings or betting lists.'
            }
            onClick={changeHandler}
            name={'hideUser'}
            value={userProfilePrivacyInfo?.response?.hideUser}
         />
         <PrivacyListComponent
            heading={'Hide my profile name from public lists.'}
            subHeading={'If hidden, no one can view your profile name.'}
            onClick={changeHandler}
            name={'hideUserName'}
            value={userProfilePrivacyInfo?.response?.hideUserName}
         />
         {/* <PrivacyListComponent
                     heading={'Hide my online presence in private chat'}
                     onClick={changeHandler}
                     name={'online'}
                     value={userProfilePrivacyInfo?.response?.online}
                  /> */}
         <PrivacyListComponent
            heading={'Any new friend request'}
            onClick={changeHandler}
            name={'newFriendRequest'}
            value={userProfilePrivacyInfo?.response?.newFriendRequest}
         />
      </div>
   );
}

export default PrivacySettingListComponent;
