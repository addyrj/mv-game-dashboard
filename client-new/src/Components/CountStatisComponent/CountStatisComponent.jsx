import React from 'react';
import * as styled from './CountStatisComponent.style';

function CountStatisComponent({ icon, heading, count }) {
   return (
      <styled.div>
         <div className="flex items-center justify-center">
            {icon}
            <p className="text-gray-500 ms-2">{heading}</p>
         </div>
         <h5 className="text-white text-lg font-bold">{count}</h5>
      </styled.div>
   );
}

export default CountStatisComponent;
