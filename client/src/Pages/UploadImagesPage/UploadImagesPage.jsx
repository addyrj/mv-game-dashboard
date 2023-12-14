import React from 'react';
import * as styled from './UploadImagesPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import MediaImagesComponent from '../../Components/MediaImagesComponent/MediaImagesComponent';
import UploadMediaImagesComponent from '../../Components/UploadMediaImagesComponent/UploadMediaImagesComponent';

function UploadImagesPage() {
   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'media'}
               heading={`Media`}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <styled.mainDiv className="py-4 space-x-0 lg:space-x-3">
               <UploadMediaImagesComponent />
               <div className="media_images w-full mt-3 mt-lg-0">
                  <MediaImagesComponent />
               </div>
            </styled.mainDiv>
         </div>
      </styled.div>
   );
}

export default UploadImagesPage;
