import React from 'react';
import * as styled from './GamesLargeCardComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function GamesLargeCardComponent({ image, bg, link, cl }) {
   const navigation = useNavigate();

   const NavigationHandler = function () {
      navigation(link);
   };

   return (
      <styled.div
         style={{
            backgroundImage: bg,
         }}
         className={cl}
      >
         <div className="w-full md:w-10/12">
            <div className="imgDiv">
               <LazyLoadImage src={image} />
            </div>
            <CustomButtonComponent
               text={'Join Now'}
               btnCl={'join_btn w-full shadow p-3 p-lg-4'}
               bg={bg}
               onClick={NavigationHandler}
            />
         </div>
      </styled.div>
   );
}

export default GamesLargeCardComponent;
