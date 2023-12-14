import React, { useEffect } from 'react';
import * as styled from './SupportTeamQueryChatsPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import useRoles from '../../Hooks/useRoles';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSupportTeamConversion } from '../../App/Features/LiveSupport/liveSupportActions';
import {
   supportTeamConversionSelector,
   supportTeamConversionLoadingSelector,
   supportTeamConversionErrorSelector,
} from './SupportTeamQueryChatsPage.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';

function SupportTeamQueryChatsPage() {
   const {
      userRoles: { isAdmin, isSubAdmin },
   } = useRoles();
   const dispatch = useDispatch();
   const param = useParams();

   const supportTeamConversion = useSelector(supportTeamConversionSelector);
   const supportTeamConversionLoading = useSelector(supportTeamConversionLoadingSelector);
   const supportTeamConversionError = useSelector(supportTeamConversionErrorSelector);

   useEffect(() => {
      if (!!param && param?.queryId) {
         if (isAdmin || isSubAdmin) {
            dispatch(getSupportTeamConversion({ queryId: param?.queryId, page: 0 }));
         }
      }
   }, [isAdmin, isSubAdmin, param]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'User chats'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-4">
               {!!supportTeamConversionLoading && <SpinnerComponent />}
               {!!supportTeamConversionError && <p className="error_cl text-sm">{supportTeamConversionError}</p>}
               {!!supportTeamConversion &&
               supportTeamConversion?.success &&
               !!supportTeamConversion?.items &&
               supportTeamConversion?.items.length
                  ? supportTeamConversion?.items.map((el) => (
                       <div className="content my-5" key={el?._id}>
                          <div className="msg_div flex items-center space-x-3">
                             <div>
                                <div className="profile_div">
                                   <img src={el?.avatar} alt="" />
                                </div>
                             </div>
                             <div className="ms">
                                <p className="text-gray-300">{el?.message}</p>
                             </div>
                          </div>
                       </div>
                    ))
                  : !supportTeamConversionLoading && <p className="text-sm text-gray-200">No chats</p>}
            </div>
         </div>
      </styled.div>
   );
}

export default SupportTeamQueryChatsPage;
