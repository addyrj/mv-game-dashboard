import React from 'react';
import * as styled from './NavbarComponent.style';
import CategoryOptionsComponents from '../CategoryOptionsComponents/CategoryOptionsComponents';
import UserNavbarWalletComponent from '../UserNavbarWalletComponent/UserNavbarWalletComponent';
import { PopUpContext } from '../../Context/PopUpContext';

function NavbarComponent() {
   return (
      <styled.div>
         <CategoryOptionsComponents />
         <PopUpContext>
            <UserNavbarWalletComponent />
         </PopUpContext>
      </styled.div>
   );
}

export default NavbarComponent;
