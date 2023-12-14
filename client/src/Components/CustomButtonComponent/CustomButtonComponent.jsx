import React from 'react';
import * as styled from './CustomButtonComponent.style';
import LoadingSpinnerHocComponent from '../../HOC/LoadingSpinnerHocComponent/LoadingSpinnerHocComponent';

function CustomButtonComponent({ children, btnCl, text, type, onClick }) {
   return (
      <styled.div>
         <button
            className={btnCl}
            type={type ? type : 'button'}
            onClick={onClick}
         >
            {!!children ? children : text}
         </button>
      </styled.div>
   );
}

export default LoadingSpinnerHocComponent(CustomButtonComponent);
