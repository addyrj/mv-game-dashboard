import React from 'react';
import * as styled from './SpinnerComponent.style';

function SpinnerComponent({ center }) {
   return (
      <styled.div className="flex items-center justify-center">
         <img
            src="/images/loading.svg"
            alt=""
            className={center ? 'center_svg' : null}
         />
      </styled.div>
   );
}

export default React.memo(SpinnerComponent);
