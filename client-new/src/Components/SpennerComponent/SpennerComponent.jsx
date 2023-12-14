import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as styled from './SpennerComponent.style';

function SpennerComponent({ center, padding }) {
   return (
      <styled.div className="flex items-center justify-center p-0">
         <LazyLoadImage
            src="/images/loading.svg"
            alt=""
            className={center ? 'center_svg' : null}
         />
      </styled.div>
   );
}

export default SpennerComponent;
