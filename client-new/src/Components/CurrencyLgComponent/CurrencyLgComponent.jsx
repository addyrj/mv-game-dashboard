import React from 'react';
import * as styled from './CurrencyLgComponent.style';
import { AiOutlineLock } from '@react-icons/all-files/ai/AiOutlineLock';
import { toast } from 'react-hot-toast';

function CurrencyLgComponent({
   _id,
   active,
   icon,
   name,
   amount,
   locked,
   onClick,
   currencyId,
}) {
   const clickHandler = function () {
      if (locked) {
         return toast.error(
            'this currency is locked. Please selected another currency'
         );
      }
      onClick({ _id, name, amount, icon, currencyId });
   };

   return (
      <styled.div onClick={clickHandler}>
         <styled.contentDiv>
            <styled.currencyDiv>
               <div className="icon">
                  <img src={icon} alt="" />
               </div>
            </styled.currencyDiv>
            <p className="text-gray-300 font-medium">{name}</p>
         </styled.contentDiv>
         <div className="price_div flex items-center space-x-2">
            {locked ? <AiOutlineLock className="text-gray-300" /> : null}
            <p className="text-sm text-gray-300 font-medium">{amount}</p>
         </div>
      </styled.div>
   );
}

export default React.memo(CurrencyLgComponent);
