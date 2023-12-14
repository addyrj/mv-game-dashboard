import React from 'react';
import * as styled from './SystemNotificationComponent.style';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import {
   systemNotificationSelector,
   systemNotificationLoadingSelector,
   systemNotificationErrorSelector,
} from './SystemNotification.Selector';
import { useSelector } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import SystemNotificationCardComponent from '../SystemNotificationCardComponent/SystemNotificationCardComponent';

function SystemNotificationComponent() {
   const systemNotification = useSelector(systemNotificationSelector);
   const systemNotificationLoading = useSelector(
      systemNotificationLoadingSelector
   );
   const systemNotificationError = useSelector(systemNotificationErrorSelector);

   return (
      <styled.div className="p-2">
         {!!systemNotificationError && (
            <p className="text-sm error_cl">{systemNotificationError}</p>
         )}
         {!!systemNotificationLoading ? <SpennerComponent /> : null}
         {!!systemNotification &&
         systemNotification?.success &&
         systemNotification?.notifications &&
         systemNotification?.notifications.length ? (
            systemNotification?.notifications.map((el) => (
               <SystemNotificationCardComponent key={el?._id} data={el} />
            ))
         ) : (
            <NoDataComponent center={true} bg={'none'} />
         )}
      </styled.div>
   );
}

export default SystemNotificationComponent;
