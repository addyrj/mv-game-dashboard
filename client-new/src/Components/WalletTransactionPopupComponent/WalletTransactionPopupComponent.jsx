import React, { useState } from 'react';
import * as styled from './WalletTransactionPopupComponent.style';
import ReactDOM from 'react-dom';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { showAndHideTransactionInfo } from '../../App/Features/Payment/paymentSlice';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import WalletDepositInfoComponent from '../WalletDepositInfoComponent/WalletDepositInfoComponent';
import WalletWithdrawComponent from '../WalletWithdrawComponent/WalletWithdrawComponent';
import { screenZoomLevelSelector } from './WalletPopup.Selector';

const CheckTransactionButtons = [
   { heading: 'Deposit' },
   { heading: 'Withdraw' },
];

function WalletTransactionPopupComponent() {
   const [ActiveTab, setActiveTab] = useState('Deposit');
   const dispatch = useDispatch();

   const screenZoomLevel = useSelector(screenZoomLevelSelector);

   const backHandler = function () {
      dispatch(showAndHideTransactionInfo(false));
   };

   return ReactDOM.createPortal(
      <styled.div>
         <div className="over_lay_div" onClick={backHandler} />
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
               duration: 0.2,
            }}
            className="tr_div"
         >
            <styled.trDiv zoom={screenZoomLevel}>
               <ModelHeaderComponent
                  heading={'Transactions'}
                  backIcon={false}
                  back={backHandler}
               />
               <div className="btn_groups flex items-center shadow px-4 py-2">
                  {CheckTransactionButtons.map((el) => (
                     <CustomButtonComponent
                        text={el?.heading}
                        key={el?.heading}
                        btnCl={
                           ActiveTab === el?.heading
                              ? 'tab_button p-3 tab_button_active'
                              : 'tab_button p-3'
                        }
                        width={'100%'}
                        onClick={() => setActiveTab(el?.heading)}
                     />
                  ))}
               </div>
               <styled.cnDiv>
                  <AnimatePresence>
                     {ActiveTab === 'Deposit' && <WalletDepositInfoComponent />}
                  </AnimatePresence>
                  <AnimatePresence>
                     {ActiveTab === 'Withdraw' && <WalletWithdrawComponent />}
                  </AnimatePresence>
               </styled.cnDiv>
            </styled.trDiv>
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default WalletTransactionPopupComponent;
