import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as styled from './LightAndDarkModeComponent.style';

function LightAndDarkModeComponent() {
   return (
      <styled.div>
         <styled.toggleDiv className="flex items-center 2xl:space-x-2">
            <div className="dark toggle">
               <div className="icon_div">
                  <LazyLoadImage src="/images/dark.svg" alt="dark icon" />
               </div>
               <p>Dark</p>
            </div>
            <div className="light toggle">
               <div className="icon_div">
                  <LazyLoadImage src="/images/light.svg" alt="light icon" />
               </div>
               <p>Light</p>
            </div>
         </styled.toggleDiv>
      </styled.div>
   );
}

export default React.memo(LightAndDarkModeComponent);
