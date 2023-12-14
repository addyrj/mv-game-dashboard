import React from 'react';
import * as styled from './MoneyDropDownComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AiFillLock } from '@react-icons/all-files/ai/AiFillLock';

function MoneyDropDownComponent({
   currencyList,
   onChange,
   value,
   disabledCr,
   item,
   label,
   hidePrice,
}) {
   return (
      <styled.div className="rounded-md mb-3">
         <Box
            sx={{
               '& .MuiTextField-root': { my: 1, width: '100%' },
            }}
            className="w-full"
         >
            <TextField
               onChange={(event) => onChange(event, item)}
               select
               label={label}
               value={value || ''}
               className="w-full"
            >
               {currencyList?.map((option) => (
                  <MenuItem
                     key={option?.currencyId || option?.symbol || option?._id}
                     value={option?.currencyId || option?.symbol || option?._id}
                     disabled={
                        !disabledCr
                           ? false
                           : option?.locked || option?.lotteryCurrency
                           ? true
                           : false
                     }
                  >
                     <div className="cr_div flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4">
                           <div className="cr_img_div">
                              <img src={option?.icon} alt="" />
                           </div>
                           <p className="cr_name">
                              {option?.currencyName || option?.symbol}
                           </p>
                        </div>
                        <div className="cr_price flex items-center space-x-2 ">
                           {!disabledCr ? null : option?.locked ||
                             option?.lotteryCurrency ? (
                              <AiFillLock />
                           ) : null}
                           {!!hidePrice ? null : <p>{option?.balance}</p>}
                        </div>
                     </div>
                  </MenuItem>
               ))}
            </TextField>
         </Box>
      </styled.div>
   );
}

export default MoneyDropDownComponent;
