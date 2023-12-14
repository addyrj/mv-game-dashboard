import React from 'react';
import * as styled from './PaymentOptionsComponent.style';
import ReactDOM from 'react-dom';
import WalletPopUpComponent from '../WalletPopUpComponent/WalletPopUpComponent';
import { motion } from 'framer-motion';

function PaymentOptionsComponent({ close }) {
   return ReactDOM.createPortal(
      <styled.div>
         <div className="over_lay" onClick={close} />
         <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{
               damping: 200,
            }}
            className="popUp_div"
         >
            <WalletPopUpComponent close={close} />
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default PaymentOptionsComponent;
