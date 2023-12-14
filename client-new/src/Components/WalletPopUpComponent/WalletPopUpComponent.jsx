import React, { useState, useCallback } from 'react';
import * as styled from './WalletPopUpComponent.style';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { FaMoneyBill } from '@react-icons/all-files/fa/FaMoneyBill';
import { GiPayMoney } from '@react-icons/all-files/gi/GiPayMoney';
import MoneyDepositComponent from '../MoneyDepositComponent/MoneyDepositComponent';
import MoneyWithdrawComponent from '../MoneyWithdrawComponent/MoneyWithdrawComponent';
import { AnimatePresence, motion } from 'framer-motion';

const ButtonArray = [
   { name: 'Deposit', id: 1, icon: <FaMoneyBill /> },
   { name: 'Withdraw', id: 2, icon: <GiPayMoney /> },
];

const MotionParent = function ({ children, cl, pos, value }) {
   return (
      <motion.div
         initial={{ opacity: 0, [pos]: [value] }}
         animate={{ opacity: 1, [pos]: 0 }}
         exit={{ opacity: 0, [pos]: [value] }}
         className={`${cl} p-2`}
         transition={{
            duration: 0.3,
         }}
      >
         {children}
      </motion.div>
   );
};

function WalletPopUpComponent({ close }) {
   const [ActiveBtn, setActiveBtn] = useState('Deposit');

   const BtnActiveHandler = useCallback(
      function (value) {
         setActiveBtn(value);
      },
      [ActiveBtn]
   );

   return (
      <styled.div>
         <ModelHeaderComponent
            heading={'Wallet'}
            backIcon={false}
            back={close}
         />
         <styled.paymentContentDiv>
            <div className="py-3 flex items-center justify-between space-x-2">
               {ButtonArray.map((el) => (
                  <CustomButtonComponent
                     onClick={() => BtnActiveHandler(el?.name)}
                     key={el.id}
                     btnCl={`money_btn ${
                        ActiveBtn === el?.name && 'money_btn_active shadow'
                     }`}
                     width={'100%'}
                  >
                     <div className="flex items-center space-x-4">
                        {el?.icon}
                        <p>{el?.name}</p>
                     </div>
                  </CustomButtonComponent>
               ))}
            </div>
            <styled.optionsDiv>
               <AnimatePresence>
                  {ActiveBtn === 'Deposit' && (
                     <MotionParent cl={'_wd_left'} pos={'x'} value={'-200'}>
                        <MoneyDepositComponent />
                     </MotionParent>
                  )}
               </AnimatePresence>
               <AnimatePresence>
                  {ActiveBtn === 'Withdraw' && (
                     <MotionParent cl={'_wd_right'} pos={'x'} value={'200'}>
                        <MoneyWithdrawComponent />
                     </MotionParent>
                  )}
               </AnimatePresence>
            </styled.optionsDiv>
         </styled.paymentContentDiv>
      </styled.div>
   );
}

export default React.memo(WalletPopUpComponent);
