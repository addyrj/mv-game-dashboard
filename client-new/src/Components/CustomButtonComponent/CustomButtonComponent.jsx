import React from 'react';
import * as styled from './CustomButtonComponent.style';
import LoadingSpennerHocComponent from '../../HocComponents/LoadingSpennerHocComponent/LoadingSpennerHocComponent';

function CustomButtonComponent({
   children,
   btnCl,
   text,
   type,
   onClick,
   bg,
   width,
}) {
   return (
      <styled.div
         style={
            width
               ? {
                    width: width,
                 }
               : null
         }
      >
         <button
            style={
               bg
                  ? {
                       background: bg,
                    }
                  : null
            }
            className={btnCl}
            type={type ? type : 'button'}
            onClick={onClick}
         >
            {!!children ? children : text}
         </button>
      </styled.div>
   );
}

export default LoadingSpennerHocComponent(CustomButtonComponent);
