import React, { Fragment, useState, useEffect, useCallback } from 'react';
import * as styled from './EditProfileModelComponent.style';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { useSelector, useDispatch } from 'react-redux';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { updateUserNameHander } from '../../App/Features/Client/clientActions';
import { removeInvalidErrors } from '../../App/Features/Client/clientSlice';
import { motion } from 'framer-motion';
import { useSharedState } from '../../Context/PopUpContext';
import {
   userInfoSelector,
   fetchUserInfoErrorSelector,
   // updateUserNameSelector,
   updateUserNameLoadingSelector,
   fetchUpdateUserNameErrorSelector,
   updateUserNameInvalidErrorsSelector,
} from './EditModel.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function EditProfileModelComponent() {
   const userInfo = useSelector(userInfoSelector);
   const fetchUserInfoError = useSelector(fetchUserInfoErrorSelector);
   // const updateUserName = useSelector(updateUserNameSelector);
   const updateUserNameLoading = useSelector(updateUserNameLoadingSelector);
   const fetchUpdateUserNameError = useSelector(
      fetchUpdateUserNameErrorSelector
   );
   const updateUserNameInvalidErrors = useSelector(
      updateUserNameInvalidErrorsSelector
   );

   const dispatch = useDispatch();
   const [PopUpContextState, setPopUpContextState] = useSharedState();

   const [Info, setInfo] = useState({
      userName: '',
   });
   const [Error, setError] = useState('');

   const changeHandler = function (e) {
      const { value, name } = e.target;
      setInfo({ ...Info, [name]: value });
   };

   const sendHandler = function (event) {
      event.preventDefault();

      if (!!userInfo && userInfo?.success && userInfo?.user) {
         if (userInfo?.user?.name === Info?.userName) {
            return setError(
               'If you want to update the name then change the old name.'
            );
         }

         setError('');

         dispatch(
            updateUserNameHander({
               userId: userInfo?.user?._id,
               userName: Info?.userName,
            })
         );
      } else {
         setError('Need to login first!');
      }
   };

   const showEditAvatarHandler = function () {
      setPopUpContextState({ ...PopUpContextState, showEditAvatar: true });
   };

   const removeEditPopUp = function () {
      setPopUpContextState({ ...PopUpContextState, showEditPopUp: false });
   };

   useEffect(() => {
      if (!!userInfo && userInfo?.success && userInfo?.user) {
         setInfo({
            userName: userInfo?.user?.name,
         });
      }
   }, [userInfo]);

   useEffect(() => {
      return () => {
         dispatch(removeInvalidErrors());
      };
   }, []);

   return (
      <motion.div
         initial={{ right: -600, left: 600, opacity: 0.6 }}
         animate={{ right: 0, left: 0, opacity: 1 }}
         className="model_div"
         exit={{ right: -600, left: 600, opacity: 0.6 }}
         transition={{
            duration: 0.5,
         }}
      >
         {!!fetchUserInfoError ? (
            <p className="error_cl text-sm">{fetchUserInfoError}</p>
         ) : null}
         {!!userInfo && userInfo?.success && userInfo?.user ? (
            <Fragment>
               <ModelHeaderComponent
                  heading={'Nickname'}
                  back={removeEditPopUp}
                  backIcon={true}
               />
               <styled.profileContentDiv className="py-5">
                  <styled.profile>
                     <LazyLoadImage
                        src={userInfo?.user?.avatar}
                        alt=""
                        crossOrigin="anonymous"
                     />
                     <div className="edit" onClick={showEditAvatarHandler}>
                        <p>edit you avatar</p>
                     </div>
                  </styled.profile>
                  <div className="py-5 mt-5 px-3">
                     <form onSubmit={sendHandler}>
                        <Box
                           sx={{
                              '& > :not(style)': { my: 1, width: '100%' },
                           }}
                           noValidate
                           autoComplete="off"
                        >
                           <TextField
                              label="Username"
                              name="userName"
                              variant="outlined"
                              value={Info.userName}
                              onChange={changeHandler}
                           />
                           <p className="text-sm text-gray-500">
                              Do not use special symbols, otherwise your account
                              may not be supported.
                           </p>
                           <CustomButtonComponent
                              type={'submit'}
                              text={'Modify'}
                              btnCl={'large_btn mt-5'}
                              isLoading={updateUserNameLoading}
                           />
                           {!!Error ? (
                              <p className="error_cl text-sm">{Error}</p>
                           ) : null}
                           {!!fetchUpdateUserNameError ? (
                              <p className="error_cl text-sm">
                                 {fetchUpdateUserNameError}
                              </p>
                           ) : null}
                           {/* {!!updateUserName && updateUserName?.success ? (
                              <p className="text-green-500">
                                 {updateUserName?.message}
                              </p>
                           ) : null} */}
                           {!!updateUserNameInvalidErrors &&
                           updateUserNameInvalidErrors?.error
                              ? updateUserNameInvalidErrors.error.map((el) => (
                                   <p className="error_cl">{el?.msg}</p>
                                ))
                              : null}
                        </Box>
                     </form>
                  </div>
               </styled.profileContentDiv>
            </Fragment>
         ) : null}
      </motion.div>
   );
}

export default React.memo(EditProfileModelComponent);
