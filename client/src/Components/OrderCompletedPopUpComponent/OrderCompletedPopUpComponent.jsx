import React from 'react';
import * as styled from './OrderCompletedPopUpComponent.style';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

function OrderCompletedPopUpComponent() {
   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
               transition: 0.1,
            }}
            className="popDiv"
         >
            <img src="/images/credit-card-authorization-accepted.gif" alt="" />
         </motion.div>
      </styled.div>,
      document.getElementById('message')
   );
}

export default OrderCompletedPopUpComponent;
