import React from 'react';
import * as styled from './RejectionReasonPopUpComponent.style';
import { selectedQuerySelector, authSelector, rejectUserQueryLoadingSelector } from './RejectionReason.Selector';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { Radio, Space } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectedQueryHandler, showAndHideReasonPopup } from '../../App/Features/LiveSupport/liveSupportSlice';
import { updatedUserQuery } from '../../App/Features/LiveSupport/liveSupportActions';

const schema = yup.object({
   selectedReason: yup.string().required('Selected reason is required'),
});

const reasonAr = [
   {
      heading: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia excepturi molestiae eos
    expedita nulla delectus accusantium corporis? Corrupti, accusantium dolor?`,
      id: 1,
   },
   {
      heading: `Lorem ipsum dolor sit amet,`,
      id: 2,
   },
   {
      heading: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, molestias.`,
      id: 3,
   },
   {
      heading: `Lorem ipsum dolor sit amet.`,
      id: 4,
   },
];

function RejectionReasonPopUpComponent() {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         selectedReason: '',
      },
   });

   const auth = useSelector(authSelector);
   const rejectUserQueryLoading = useSelector(rejectUserQueryLoadingSelector);
   const selectedQuery = useSelector(selectedQuerySelector);

   const dispatch = useDispatch();

   const onSubmit = function (data) {
      const { selectedReason } = data;
      const findReason = reasonAr.find((el) => el?.id === +selectedReason);
      dispatch(
         updatedUserQuery({ queryId: selectedQuery, rejectedBy: auth?.user?._id, rejectionReason: findReason?.heading })
      );
   };

   const closeHandler = function () {
      dispatch(showAndHideReasonPopup(false));
      dispatch(selectedQueryHandler(null));
   };

   return (
      <styled.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="main_div"
         >
            <div className="heading_div">
               <p className="text-gray-200 font-medium text-xl">Rejection Reason</p>
            </div>
            <div className="close_button" onClick={closeHandler}>
               <VscClose className="text-gray-300 text-xl" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="content_div">
                  <Controller
                     name="selectedReason"
                     control={control}
                     render={({ field: { onChange, value } }) => (
                        <Radio.Group onChange={onChange} value={value}>
                           <Space direction="vertical">
                              {reasonAr.map((el) => (
                                 <div key={el?.heading} className="option_div">
                                    <Radio value={el?.id}>
                                       <p>{el?.heading}</p>
                                    </Radio>
                                 </div>
                              ))}
                           </Space>
                        </Radio.Group>
                     )}
                  />
                  <div className="p-4">
                     <div className="mt-2 flex">
                        <CustomButtonComponent
                           isLoading={rejectUserQueryLoading}
                           type={'submit'}
                           text={'Save'}
                           btnCl={'Publish'}
                        />
                     </div>
                     {!!errors?.selectedReason?.message && (
                        <p className="text-sm  error_cl mt-2">{errors?.selectedReason?.message}</p>
                     )}
                  </div>
               </div>
            </form>
         </motion.div>
      </styled.div>
   );
}

export default RejectionReasonPopUpComponent;
