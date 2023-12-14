import React, { useState } from 'react';
import * as styled from './WalletTransactionComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import WalletDepositInfoComponent from '../WalletDepositInfoComponent/WalletDepositInfoComponent';
import { AnimatePresence } from 'framer-motion';
import WalletWithdrawComponent from '../WalletWithdrawComponent/WalletWithdrawComponent';

const CheckTransactionButtons = [{ heading: 'Deposit' }, { heading: 'Withdraw' }];

function WalletTransactionComponent() {
   const [ActiveTab, setActiveTab] = useState('Deposit');

   return (
      <styled.div>
         <div className="tr_div">
            <styled.trDiv>
               <div className="btn_groups flex items-center shadow px-4 py-2">
                  {CheckTransactionButtons.map((el) => (
                     <CustomButtonComponent
                        text={el?.heading}
                        key={el?.heading}
                        btnCl={ActiveTab === el?.heading ? 'tab_button p-3 tab_button_active' : 'tab_button p-3'}
                        width={'100%'}
                        onClick={() => setActiveTab(el?.heading)}
                     />
                  ))}
               </div>
               <styled.cnDiv>
                  <AnimatePresence>{ActiveTab === 'Deposit' && <WalletDepositInfoComponent />}</AnimatePresence>
                  <AnimatePresence>{ActiveTab === 'Withdraw' && <WalletWithdrawComponent />}</AnimatePresence>
               </styled.cnDiv>
            </styled.trDiv>
         </div>
      </styled.div>
   );
}

export default WalletTransactionComponent;
