import React from 'react';
import * as styled from './SearchBarComponent.style';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';

function SearchBarComponent() {
   return (
      <styled.div className="shadow">
         <input type="search" placeholder="Search" />
         <div className="icon_div">
            <BsSearch className="text-gray-200" />
         </div>
      </styled.div>
   );
}

export default React.memo(SearchBarComponent);
