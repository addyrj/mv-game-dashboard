import React from 'react';
import * as styled from './GameSmCardComponent.style';
import { BsInfoCircle } from '@react-icons/all-files/bs/BsInfoCircle';

function GameSmCardComponent({ data }) {
   return (
      <div className="px-2 mb-3">
         <styled.div className="shadow-lg">
            {data?.game?.gameStatus === 'Blocked' ? (
               <div className="blocked bg-red-700 rounded">
                  <p className="text-gray-200">Blocked</p>
               </div>
            ) : null}
            <div className="imgDiv">
               <img src={data?.game?.gameImage} alt="" />
            </div>
            <div className="content_div">
               <p className="text-gray-400">{data?.game?.name}</p>
               <BsInfoCircle className="text-gray-400" />
            </div>
         </styled.div>
      </div>
   );
}

export default GameSmCardComponent;
