import React, { useState } from 'react';
import * as styled from './ExportGameDataPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import ExportDataModalComponent from '../../Components/ExportDataModalComponent/ExportDataModalComponent';
import { AnimatePresence } from 'framer-motion';

function ExportGameDataPage() {
   const [ShowExportDataCm, setShowExportDataCm] = useState(false);

   const ShowHandler = function () {
      setShowExportDataCm(!ShowExportDataCm);
   };

   return (
      <styled.div>
         <NavbarComponent />
         <AnimatePresence>{!!ShowExportDataCm ? <ExportDataModalComponent close={ShowHandler} /> : null}</AnimatePresence>
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Export Game Data'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
            />
            <div className="mt-5">
               <CustomButtonComponent btnCl={'Publish'} text={'Export Game Data'} onClick={ShowHandler} />
            </div>
         </div>
      </styled.div>
   );
}

export default ExportGameDataPage;
