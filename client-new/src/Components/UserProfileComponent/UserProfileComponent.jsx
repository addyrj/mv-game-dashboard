import React from 'react';
import * as styled from './UserProfileComponent.style';
import { CgGames } from '@react-icons/all-files/cg/CgGames';
import { FaRegHandshake } from '@react-icons/all-files/fa/FaRegHandshake';
import dayjs from 'dayjs';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function UserProfileComponent({ user, totalDocuments }) {
   return (
      <styled.div>
         <div className="flex items-center space-x-5">
            <styled.profileDiv className=" shadow-lg shadow-gray-900">
               <LazyLoadImage src={user?.logo} alt="" />
            </styled.profileDiv>
            <styled.contentDiv>
               <h5 className="text-4xl text-gray-200 font-medium">
                  {user?.providerName}
               </h5>
               <p className="mt-2 text-gray-400">{user?.profileTag}</p>
               <div className="mt-2 flex items-center space-x-3">
                  <CgGames className="text-gray-500" />
                  <p className="text-gray-500 text-sm font-medium">
                     {totalDocuments} Games
                  </p>
               </div>
               <div className="mt-2 flex items-center space-x-3">
                  <FaRegHandshake className="text-gray-500" />
                  <p className="text-gray-500 text-sm font-medium">
                     {dayjs(user?.createdAt).format('DD MMMM YYYY')}
                  </p>
               </div>
            </styled.contentDiv>
         </div>
         {user?.description ? (
            <div className="mt-4 px-2">
               <h5 className="text-gray-400 font-medium text-xl">
                  About Us {user?.providerName}
               </h5>
               <p className="mt-2 text-gray-500 text-sm">{user?.description}</p>
            </div>
         ) : null}
      </styled.div>
   );
}

export default UserProfileComponent;
