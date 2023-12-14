import React from 'react';
import * as styled from './TableComponent.style';

function TableComponent({ row, children }) {
   return (
      <styled.div>
         <table>
            <thead>
               <tr>
                  {row.map((el) => (
                     <th key={el?.name}>
                        <p className="text-gray-300">{el?.name}</p>
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>{children}</tbody>
         </table>
      </styled.div>
   );
}

export default TableComponent;
