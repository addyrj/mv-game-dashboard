import React from 'react';
import * as styled from './BannerComponent.style';
import { useSelector } from 'react-redux';
import {
   selectShowSidebar,
   ShowSidebarNotificationsSelector,
} from './Banner.selector';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';

function BannerComponent() {
   const showSidebarChat = useSelector(selectShowSidebar);
   const showSidebarNotifications = useSelector(
      ShowSidebarNotificationsSelector
   );

   return (
      <styled.mainDiv>
         <styled.div>
            <div
               className={
                  showSidebarChat || showSidebarNotifications
                     ? 'flex items-center justify-between sm_bn'
                     : 'flex items-center justify-between'
               }
            >
               <div className="banner_slider_div">
                  <div>
                     {/* <div className="banner_image_div">
                        <img
                           src="/images/red-pepe.jpg"
                           alt=""
                           className="pc_banner"
                        />
                        <img
                           src="/images/banner-mobile.jpg"
                           alt=""
                           className="mobile_banner"
                        />
                     </div> */}
                     <div
                        className="bg_slide flex items-center px-5"
                        style={{
                           backgroundImage: `url(/images/mv-games-banner.jpeg)`,
                        }}
                     >
                        <div className="banner_content_div">
                           <h1 className="text-gray-200">
                              Multiplier Battle Prize Pool
                           </h1>
                           <h4 className="sm_heading">$100</h4>
                           <p className="text-white mt-2">
                              This week, your challenge is accomplishing the
                              <br />
                              highest multiplier in six selected games.
                           </p>
                           <div className="btn_div">
                              <CustomButtonComponent
                                 text={'Deposit & Play'}
                                 btnCl={'DepositBtn mt-4 shadow'}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </styled.div>
      </styled.mainDiv>
   );
}

export default React.memo(BannerComponent);
