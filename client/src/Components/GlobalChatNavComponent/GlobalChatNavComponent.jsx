import React from 'react';
import {
   allGlobalChatGroupsSelector,
   allGlobalChatGroupsLoadingSelector,
   allGlobalChatGroupsErrorSelector,
} from './GlobalChatNavComponent.Selector';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import * as styled from './GlobalChatNavComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import { getUserGlobalChats } from '../../App/Features/userManagement/userManagementActions';
import { useParams } from 'react-router';
import { message } from 'antd';
import { removeGroupMessage, selectedGroupHandler } from '../../App/Features/userManagement/userManagementSlice';
import { useForm, Controller } from 'react-hook-form';

function GlobalChatNavComponent() {
   const dispatch = useDispatch();
   const params = useParams();
   const { setValue, control } = useForm({
      defaultValues: {
         selectedGroup: '',
      },
   });

   const allGlobalChatGroups = useSelector(allGlobalChatGroupsSelector);
   const allGlobalChatGroupsLoading = useSelector(allGlobalChatGroupsLoadingSelector);
   const allGlobalChatGroupsError = useSelector(allGlobalChatGroupsErrorSelector);

   const changeHandler = function (event) {
      if (!!params && params?.id) {
         const { value } = event.target;
         dispatch(removeGroupMessage());
         dispatch(selectedGroupHandler(value));
         dispatch(getUserGlobalChats({ groupId: value, userId: params?.id, page: 0 }));
         setValue('selectedGroup', value);
      } else {
         message.error('Your have to login first');
      }
   };

   return (
      <styled.div>
         {!!allGlobalChatGroupsLoading && <SpinnerComponent />}
         {!!allGlobalChatGroupsError && <p className="text-sm error_cl">{allGlobalChatGroupsError}</p>}
         {!!allGlobalChatGroups &&
            allGlobalChatGroups?.success &&
            !!allGlobalChatGroups?.groups &&
            allGlobalChatGroups?.groups.length && (
               <Box
                  sx={{
                     '& .MuiTextField-root': { my: 1, width: '25ch' },
                  }}
                  noValidate
               >
                  <div>
                     <Controller
                        name="selectedGroup"
                        control={control}
                        render={({ field: { value } }) => (
                           <TextField
                              id="outlined-select-currency"
                              select
                              label="Select"
                              value={value}
                              onChange={changeHandler}
                              helperText="Please select the group name"
                           >
                              {allGlobalChatGroups?.groups.map((option) => (
                                 <MenuItem key={option._id} value={option._id}>
                                    {option.groupName}
                                 </MenuItem>
                              ))}
                           </TextField>
                        )}
                     />
                  </div>
               </Box>
            )}
      </styled.div>
   );
}

export default GlobalChatNavComponent;
