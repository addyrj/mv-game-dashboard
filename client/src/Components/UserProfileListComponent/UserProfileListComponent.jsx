import React from 'react';
import * as styled from './UserProfileListComponent.style';

function UserProfileListComponent({ user, onClick, active }) {
   return (
      <styled.div className="space-x-3" onClick={onClick} active={active}>
         <styled.profileDiv>
            <img src={user?.avatar} alt={user?.avatar} />
         </styled.profileDiv>
         <div>
            <h5 className="text-gray-200 font-medium">{user?.name}</h5>
            <p className="text-gray-400">{user?.email}</p>
         </div>
      </styled.div>
   );
}

export default UserProfileListComponent;
