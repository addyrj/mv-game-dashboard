import React from 'react';
import * as styled from './RewardNotificationComponent.style';
import NoDataComponent from '../NoDataComponent/NoDataComponent';

function RewardNotificationComponent() {
   return (
      <styled.div className="p-2">
         <NoDataComponent center={true} bg={'none'} />
      </styled.div>
   );
}

export default RewardNotificationComponent;
