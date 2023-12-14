import React from 'react';
import NoDataComponent from '../NoDataComponent/NoDataComponent';

function WagerConertComponent({ hasData, heading }) {
   if (!hasData) {
      return <NoDataComponent heading={heading} />;
   }

   return <div>WagerConertComponent</div>;
}

export default WagerConertComponent;
