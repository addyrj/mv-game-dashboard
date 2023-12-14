import React from 'react';
import * as styled from './GameProviderHeadingComponent.style';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';

function GameProviderHeadingComponent({ heading, gameName, providerName }) {
   return (
      <styled.div>
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 box_div px-4 py-2 rounded head_dv">
               <p className="text-gray-400 cursor-pointer">
                  {heading ? heading : 'Slots'}
               </p>
               <MdKeyboardArrowRight className="text-gray-300" />
               <span className="text-gray-300 text-sm">{gameName}</span>
            </div>
            {!!providerName ? (
               <div>
                  <p className="text-gray-400 text-md">
                     by :
                     <span className="ms-2 underline cursor-pointer">
                        {providerName}
                     </span>
                  </p>
               </div>
            ) : null}
         </div>
      </styled.div>
   );
}

export default GameProviderHeadingComponent;
