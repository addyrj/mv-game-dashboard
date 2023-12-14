import React, { useEffect, useState } from 'react';
import * as styled from './TransactionPaginationComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { Select } from 'antd';

const options = [
   { value: 'Fiat', label: 'Fiat' },
   { value: 'Crypto', label: 'Crypto' },
];

function TransactionPaginationComponent({
   fnFiatAction,
   totalPages,
   fnCryptoAction,
   selectedCurrency,
   state,
   loading,
}) {
   const [Page, setPage] = useState(0);

   const PrevHandler = function () {
      if (Page >= 1) {
         setPage((prev) => prev - 1);
      }
   };

   const NextHandler = function () {
      setPage((prev) => prev + 1);
   };

   const handleChange = (value) => {
      state(value);
   };

   useEffect(() => {
      if (selectedCurrency === 'Fiat') {
         fnFiatAction(Page);
      } else if (selectedCurrency === 'Crypto' && !!fnCryptoAction) {
         fnCryptoAction(Page);
      }
   }, [Page, selectedCurrency]);

   return (
      <styled.div>
         <div>
            <Select
               showSearch
               style={{
                  width: 200,
               }}
               placeholder="Search to Select"
               optionFilterProp="children"
               filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
               }
               filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                     .toLowerCase()
                     .localeCompare((optionB?.label ?? '').toLowerCase())
               }
               options={options}
               value={selectedCurrency}
               onChange={handleChange}
            />
         </div>
         <styled.arrowDiv className=" space-x-3">
            <styled.boxDiv>
               <p className="text-gray-400 text-sm font-medium">
                  Page : {Page}
               </p>
            </styled.boxDiv>
            <div className="flex items-center space-x-1">
               <CustomButtonComponent
                  btnCl={`pagination_bt ${Page < 1 ? 'not_allow hide' : null}`}
                  onClick={Page >= 1 && totalPages ? () => PrevHandler() : null}
               >
                  <IoIosArrowBack />
               </CustomButtonComponent>
               <CustomButtonComponent
                  btnCl={`pagination_bt ${
                     Page >= totalPages || loading ? 'not_allow hide' : null
                  }`}
                  onClick={
                     Page >= totalPages || loading ? null : () => NextHandler()
                  }
               >
                  <IoIosArrowForward />
               </CustomButtonComponent>
            </div>
         </styled.arrowDiv>
      </styled.div>
   );
}

export default TransactionPaginationComponent;
