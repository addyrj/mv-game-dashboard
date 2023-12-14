import React from 'react';
import * as styled from './TabHeadingComponent.style';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';

function TabHeadingComponent({ provider }) {
   return (
      <styled.div>
         <div className="tab_div bg-zinc-800 shadow">
            <p className="text-gray-400 font-medium">
               {provider?.providerName}
            </p>
            <MdKeyboardArrowRight className="text-gray-400 mx-2" />
            <p className="text-gray-300 font-bold">Slots</p>
         </div>
      </styled.div>
   );
}

export default React.memo(TabHeadingComponent);
