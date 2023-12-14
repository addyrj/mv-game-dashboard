import React from 'react';
import * as styled from './UserListComponent.style';
import UserProfileListComponent from '../UserProfileListComponent/UserProfileListComponent';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
   queryUsersListSelector,
   queryUsersListLoadingSelector,
   queryUsersListErrorSelector,
} from './UserList.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import { useSearchParams } from 'react-router-dom';

function UserListComponent() {
   const navigation = useNavigate();
   const [searchParam] = useSearchParams();
   const userId = searchParam.get('chat');

   const queryUsersList = useSelector(queryUsersListSelector);
   const queryUsersListLoading = useSelector(queryUsersListLoadingSelector);
   const queryUsersListError = useSelector(queryUsersListErrorSelector);

   const chatHandler = function (userId) {
      navigation(`?chat=${userId}`);
   };

   return (
      <styled.div>
         {!!queryUsersListLoading && <SpinnerComponent />}
         {!!queryUsersListError && <p className="text-sm error_cl">{queryUsersListError}</p>}
         {!!queryUsersList && queryUsersList?.success && !!queryUsersList?.items && queryUsersList?.items.length
            ? queryUsersList?.items.map((el) => (
                 <UserProfileListComponent
                    active={userId === el?.user?._id}
                    key={el?._id}
                    user={{
                       avatar: el?.user?.avatar,
                       name: el?.user?.name,
                       email: el?.user?.email,
                    }}
                    onClick={() => chatHandler(el?.user?._id)}
                 />
              ))
            : null}
      </styled.div>
   );
}

export default UserListComponent;
