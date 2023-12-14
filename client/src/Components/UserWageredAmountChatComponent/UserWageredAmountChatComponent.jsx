import React, { useEffect } from 'react';
import * as styled from './UserWageredAmountChatComponent.style';
import {
   userWageredAmountSelector,
   userWageredAmountLoadingSelector,
   userWageredAmountErrorSelector,
} from './UserWageredAmountChatComponent.Selector';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { getUserWageredAmountGraph } from '../../App/Features/userManagement/userManagementActions';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NoDataComponent from '../NoDataComponent/NoDataComponent';

function UserWageredAmountChatComponent() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();

   const params = useParams();
   const dispatch = useDispatch();

   const userWageredAmount = useSelector(userWageredAmountSelector);
   const userWageredAmountLoading = useSelector(userWageredAmountLoadingSelector);
   const userWageredAmountError = useSelector(userWageredAmountErrorSelector);

   useEffect(() => {
      if (isAdmin && params?.id) {
         dispatch(getUserWageredAmountGraph({ userId: params?.id }));
      }
   }, [isAdmin]);

   return (
      <styled.div>
         {!!userWageredAmountLoading && <SpinnerComponent />}
         {!!userWageredAmountError && <p className="text-sm error_cl">{userWageredAmountError}</p>}
         {!!userWageredAmount &&
         userWageredAmount?.success &&
         !!userWageredAmount?.items &&
         userWageredAmount?.items.length ? (
            <ResponsiveContainer width="100%" height="100%">
               <LineChart
                  width={500}
                  height={300}
                  data={userWageredAmount?.items}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}
               >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="transactionType" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="amount" stroke="#fc8d01" strokeWidth={3} />
               </LineChart>
            </ResponsiveContainer>
         ) : !userWageredAmountLoading ? (
            <NoDataComponent center={true} bg={'none'} />
         ) : null}
      </styled.div>
   );
}

export default UserWageredAmountChatComponent;
