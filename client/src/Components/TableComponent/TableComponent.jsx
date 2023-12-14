import React from 'react';
import * as styled from './TableComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { IoIosArrowRoundForward } from '@react-icons/all-files/io/IoIosArrowRoundForward';
import { IoIosArrowRoundBack } from '@react-icons/all-files/io/IoIosArrowRoundBack';

function TableComponent({
   row,
   cl,
   nextAndPrev,
   nextHandler,
   prevHandler,
   disablePrevbtn,
   disableNextbtn,
   children,
   tableWidth,
}) {
   return (
      <styled.div className={cl}>
         <div className="table_cm shadow-lg">
            <table
               style={
                  !!tableWidth
                     ? {
                          width: `${tableWidth}px`,
                       }
                     : {
                          width: '100%',
                       }
               }
            >
               <thead>
                  <tr>
                     {row.map((el) => (
                        <th key={el.id || el?.heading}>{el.heading}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>{children}</tbody>
            </table>
         </div>
         {!!nextAndPrev ? (
            <div className="_next_prev_buttons_div mt-5 flex justify-end space-x-2">
               <CustomButtonComponent
                  btnCl={`next_btn prevbtn shadow ${disablePrevbtn ? 'disable_btn' : ''}`}
                  onClick={disablePrevbtn ? null : () => prevHandler()}
               >
                  <IoIosArrowRoundBack className="text-gray-200" />
                  <p>Prev</p>
               </CustomButtonComponent>
               <CustomButtonComponent
                  btnCl={`next_btn shadow ${disableNextbtn ? 'disable_btn' : ''}`}
                  onClick={disableNextbtn ? null : () => nextHandler()}
               >
                  <p>Next</p>
                  <IoIosArrowRoundForward className="text-gray-200" />
               </CustomButtonComponent>
            </div>
         ) : null}
      </styled.div>
   );
}

export default TableComponent;
