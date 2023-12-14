import React from 'react';
import * as styled from './NetworkCardComponent.style';

function NetworkCardComponent({ network, address, active, onClick }) {
   return (
      <styled.div active={active} onClick={() => onClick({ network, address })}>
         <p>{network}</p>
      </styled.div>
   );
}

export default NetworkCardComponent;
