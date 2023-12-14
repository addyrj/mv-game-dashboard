import React, { useEffect } from 'react';
import * as styled from './CreateSpinItemPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { CgColorPicker } from '@react-icons/all-files/cg/CgColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import {
   pickedImageSelector,
   createNewLuckyDrawLoadingSelector,
   singleDrawInfoSelector,
   updateSingleDrawInfoLoadingSelector,
   allGameCurrencyListSelector,
   // allGameCurrencyListLoadingSelector,
} from './Spin.Selector';
import { showPickerPopUpHandler, pickedImageHandler } from '../../App/Features/Media/MediaSlice';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import {
   createNewLuckyDraw,
   getSingleLuckyDraw,
   updateSpinLuckyDraw,
} from '../../App/Features/LuckyDraw/LuckyDrawActions';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { removeSingleDrawInfo } from '../../App/Features/LuckyDraw/LuckyDrawSlice';
import { Switch } from 'antd';
import { getGameCurrency } from '../../App/Features/Games/GameActions';
import MenuItem from '@mui/material/MenuItem';

const schema = yup.object({
   spinName: yup.string().required(),
});

function CreateSpinItemPage() {
   const {
      control,
      getValues,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: {
         spinItems: [],
         selectedPickedItem: '',
         enable: false,
         spinIcon: '',
      },
      resolver: yupResolver(schema),
   });

   const { append, remove, fields } = useFieldArray({
      control,
      name: 'spinItems',
   });

   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const params = useParams();
   const paramId = params?.id;

   const pickedImage = useSelector(pickedImageSelector);
   const createNewLuckyDrawLoading = useSelector(createNewLuckyDrawLoadingSelector);
   const singleDrawInfo = useSelector(singleDrawInfoSelector);
   const updateSingleDrawInfoLoading = useSelector(updateSingleDrawInfoLoadingSelector);
   const allGameCurrencyList = useSelector(allGameCurrencyListSelector);

   const addNewSpinItemHandler = function () {
      const spinName = getValues('spinName');

      if (!spinName) {
         return message.error('Spin name is reuqired to add new items.');
      }

      append({
         name: '',
         price: '',
         level: '',
         icon: '',
         selectedCurrency: '',
         currencyType: '',
      });
   };

   const pickedImageHander = function (index) {
      dispatch(showPickerPopUpHandler(true));
      setValue('selectedPickedItem', index);
   };

   /** ------------------- when we want to store spin draw icon --------- */
   const picIcon = function () {
      dispatch(showPickerPopUpHandler(true));
   };
   /** ------------------- when we want to store spin draw icon --------- */

   const onSubmit = function (data) {
      if (!isAdmin) message.error('You have no permission to access this feature.');

      if (!!paramId) {
         return dispatch(updateSpinLuckyDraw({ data, id: paramId }));
      }

      dispatch(createNewLuckyDraw(data));
   };

   const removeItemHandler = function (index) {
      remove(index);
   };

   useEffect(() => {
      if (!!pickedImage) {
         const pickerIndex = getValues('selectedPickedItem');
         const stateArray = getValues('spinItems');
         const updatedArray = stateArray.map((el, idx) => (idx === pickerIndex ? { ...el, icon: pickedImage } : el));
         setValue('spinItems', updatedArray);
         dispatch(pickedImageHandler({ pickedImage: null }));
      }
   }, [pickedImage]);

   useEffect(() => {
      if (!!paramId && !!isAdmin) {
         dispatch(getSingleLuckyDraw({ id: paramId }));
      }
   }, [paramId, isAdmin]);

   useEffect(() => {
      if (!!isAdmin && !!singleDrawInfo && singleDrawInfo?.success && singleDrawInfo?.item) {
         setValue('spinName', singleDrawInfo?.item?.item?.spinName);
         setValue('spinItems', singleDrawInfo?.item?.spinItems);
         setValue('enable', singleDrawInfo?.item?.item?.enable);
         setValue('spinIcon', singleDrawInfo?.item?.item?.spinIcon);
      }
   }, [singleDrawInfo, isAdmin]);

   useEffect(() => {
      if (!allGameCurrencyList) {
         dispatch(getGameCurrency());
      }

      return () => {
         dispatch(removeSingleDrawInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={!!paramId ? 'Update spin draw' : 'Create new spin item'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
               menu={false}
            />
            <div className="mt-4">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                  >
                     <div className="w-full">
                        <Controller
                           name="spinName"
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <TextField
                                 className="w-full"
                                 onChange={onChange}
                                 value={value || ''}
                                 label="Spin name"
                                 variant="outlined"
                                 type={'text'}
                              />
                           )}
                        />
                        {!!errors && errors?.spinName?.message && (
                           <p className="text-sm error_cl mt-2">{errors?.spinName?.message}</p>
                        )}
                     </div>
                     <div className="flex items-center space-x-2">
                        <Controller
                           name="enable"
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <Switch
                                 onChange={onChange}
                                 checked={value}
                                 checkedChildren={'yes'}
                                 unCheckedChildren={'No'}
                              />
                           )}
                        />
                        <p className="text-gray-300">Enable</p>
                        {/* {!!spinItems.icon && (
                              <div className="selected_image_div shadow">
                                 <img src={item.icon} alt="selected image" />
                              </div>
                           )} */}
                        {/* <div className="image_picker">
                           <CgColorPicker
                              className="text-gray-200 text-xl cursor-pointer"
                              onClick={picIcon}
                           />
                        </div> */}
                        {/* <div>
                           <VscClose
                              className="text-red-500 text-xl cursor-pointer"
                              onClick={() => removeItemHandler(index)}
                           />
                        </div> */}
                     </div>
                     {fields.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 py-2">
                           {/* <Controller
                              name={`spinItems.${index}.name`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    className="w-full"
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Item name"
                                    variant="outlined"
                                    type={'text'}
                                 />
                              )}
                           /> */}
                           <Controller
                              name={`spinItems.${index}.price`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    className="w-full"
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Item price"
                                    variant="outlined"
                                    type={'number'}
                                    required
                                    inputProps={{ min: 0, step: '0.0001' }}
                                 />
                              )}
                           />
                           <Controller
                              name={`spinItems.${index}.level`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    className="w-full"
                                    onChange={onChange}
                                    value={value || ''}
                                    label="level"
                                    variant="outlined"
                                    type={'number'}
                                    required
                                    inputProps={{ min: 0 }}
                                 />
                              )}
                           />
                           {!!allGameCurrencyList &&
                              allGameCurrencyList?.success &&
                              !!allGameCurrencyList?.items &&
                              allGameCurrencyList?.items.length && (
                                 <Controller
                                    name={`spinItems.${index}.selectedCurrency`}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                       <TextField
                                          className="w-full"
                                          select
                                          label="Select"
                                          onChange={(event) => {
                                             const findSelectedCr = allGameCurrencyList?.items.find(
                                                (el) => el?.currencyId === event.target.value
                                             );
                                             setValue(`spinItems.${index}.currencyType`, findSelectedCr?.currencyType);
                                             setValue(`spinItems.${index}.name`, findSelectedCr?.currencyName);
                                             onChange(event);
                                          }}
                                          required
                                          value={value || ''}
                                       >
                                          {allGameCurrencyList?.items.map((option) => (
                                             <MenuItem key={option?.currencyId} value={option.currencyId}>
                                                {option.currencyName}
                                             </MenuItem>
                                          ))}
                                       </TextField>
                                    )}
                                 />
                              )}
                           {!!item.icon && (
                              <div className="selected_image_div shadow">
                                 <img src={item.icon} alt="selected image" />
                              </div>
                           )}
                           <div className="image_picker">
                              <CgColorPicker
                                 className="text-gray-200 text-xl cursor-pointer"
                                 onClick={() => pickedImageHander(index)}
                              />
                           </div>
                           <div>
                              <VscClose
                                 className="text-red-500 text-xl cursor-pointer"
                                 onClick={() => removeItemHandler(index)}
                              />
                           </div>
                        </div>
                     ))}
                     <div className="flex items-center space-x-3">
                        <CustomButtonComponent
                           text={'Add new spin item'}
                           btnCl={'Publish'}
                           onClick={addNewSpinItemHandler}
                        />
                        <CustomButtonComponent
                           text={!!paramId ? 'Update' : 'Save'}
                           btnCl={'Publish'}
                           type={'submit'}
                           isLoading={!!paramId ? updateSingleDrawInfoLoading : createNewLuckyDrawLoading}
                        />
                     </div>
                  </Box>
               </form>
            </div>
         </div>
      </styled.div>
   );
}

export default CreateSpinItemPage;
