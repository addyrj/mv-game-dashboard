import React from 'react';
import * as styled from './HomePage.style';
import SidebarComponent from '../../Components/SidebarComponent/SidebarComponent';
import { Outlet } from 'react-router';
// import InfoSidebarComponent from '../../Components/InfoSidebarComponent/InfoSidebarComponent';

function HomePage() {
   return (
      <styled.div>
         <styled.sidebarDiv>
            <SidebarComponent />
         </styled.sidebarDiv>
         <styled.renderDiv>
            <Outlet />
         </styled.renderDiv>
         {/* <InfoSidebarComponent /> */}
      </styled.div>
   );
}

export default HomePage;
