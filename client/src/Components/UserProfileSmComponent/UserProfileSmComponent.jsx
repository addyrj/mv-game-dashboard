import React from 'react';
import * as styled from './UserProfileSmComponent.style';

function UserProfileSmComponent({ data }) {
   return (
      <styled.div>
         <div className={'profile_div flex items-center space-x-2'}>
            <div className="profile">
               <img src={data?.avatar} alt="" />
            </div>
            <div className="content_div ms-3">
               <h5 className="text-gray-300">{data?.name}</h5>
               <p className="text-gray-500 text-sm">{data?.email}</p>
            </div>
         </div>
      </styled.div>
   );
}

export default UserProfileSmComponent;
