import React, { useState } from 'react';
import * as styled from './ExportDataModalComponent.style';
import ReactDom from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { motion } from 'framer-motion';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
   exportGameAllData,
   exportGameCollectionNoPopulateData,
   getAllProvidersData,
   getCollectionDataWithCategoryList,
} from '../../App/Features/Tools/adminToolsActions';
import {
   exportGameDataLoadingSelector,
   exportGameDataErrorSelector,
} from './ExportData.Selector';

function ExportDataModalComponent({ close }) {
   const [value, setValue] = useState('option1');
   const dispatch = useDispatch();

   const exportGameDataLoading = useSelector(exportGameDataLoadingSelector);
   const exportGameDataError = useSelector(exportGameDataErrorSelector);

   const handleChange = (event) => {
      setValue(event.target.value);
   };

   const EventHandler = function () {
      if (value === 'option1') {
         return dispatch(exportGameCollectionNoPopulateData());
      }

      if (value === 'option2') {
         return dispatch(exportGameAllData());
      }

      if (value === 'option3') {
         return dispatch(getCollectionDataWithCategoryList());
      }

      if (value === 'option4') {
         return dispatch(getAllProvidersData());
      }
   };

   return ReactDom.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0.5, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0.7 }}
            className="main_div shadow"
         >
            <div className="close_btn" onClick={close}>
               <VscClose className="text-gray-400" />
            </div>
            <styled.contentDiv>
               <h1 className="text-2xl text-gray-200 font-semibold">
                  Export Game Data
               </h1>
               <p className="mt-2 text-sm text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  et adipisci at ipsam necessitatibus nobis rem, obcaecati
                  voluptatum assumenda itaque.
               </p>
               <div className="mt-4">
                  <FormControl className="w-full">
                     <h5 className="text-gray-300 font-medium mb-3">
                        Export Fields
                     </h5>
                     <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                        value={value}
                     >
                        <FormControlLabel
                           value="option1"
                           control={<Radio />}
                           label="Export only game collection (No Population Data)."
                           className="text-gray-200"
                        />
                        <FormControlLabel
                           value="option2"
                           control={<Radio />}
                           label="Export full game collection with populate all fields."
                           className="text-gray-200"
                        />
                        <FormControlLabel
                           value="option3"
                           control={<Radio />}
                           label="Export games category with games data"
                           className="text-gray-200"
                        />
                        <FormControlLabel
                           value="option4"
                           control={<Radio />}
                           label="Export providers with games"
                           className="text-gray-200"
                        />
                     </RadioGroup>
                  </FormControl>
               </div>
               <div className="flex">
                  <CustomButtonComponent
                     btnCl={'Publish mt-5'}
                     text={'Export Data'}
                     onClick={EventHandler}
                     isLoading={exportGameDataLoading}
                  />
               </div>
               {!!exportGameDataError ? (
                  <p className="text-sm error_cl mt-3">{exportGameDataError}</p>
               ) : null}
            </styled.contentDiv>
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default ExportDataModalComponent;
