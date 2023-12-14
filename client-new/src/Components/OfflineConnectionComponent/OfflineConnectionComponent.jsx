import React from 'react';
import ReactDOM from 'react-dom';
import * as styled from './OfflineConnectionComponent.style';
import useOnline from '../../Hooks/useOnline';

function OfflineConnectionComponent() {
   const [isOnline] = useOnline();

   if (isOnline) return null;

   return ReactDOM.createPortal(
      <styled.div>You're offline right now. Check your connection.</styled.div>,
      document.getElementById('offline')
   );
}

export default OfflineConnectionComponent;
