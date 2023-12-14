import React, { useEffect, useState } from 'react';
import * as styled from './UserStatusChartComponent.style';
import { ComposedChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useRoles from '../../Hooks/useRoles';
import { useDispatch } from 'react-redux';
import { getUserLoginResults } from '../../App/Features/Admin/adminActions';

function UserStatusChartComponent() {
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
   } = useRoles();
   const [UserResult, setUserResult] = useState([]);

   const UserResultHandler = async function () {
      const data = await dispatch(getUserLoginResults());
      const result = data?.payload?.data?.result;

      if (result) {
         return setUserResult(result);
      }

      throw Error(data.error?.message);
   };

   useEffect(() => {
      if (isAdmin || isSupport) {
         UserResultHandler();
      }
   }, [isAdmin, isSupport]);

   return (
      <styled.div className=" bg-zinc-800 p-4">
         <styled.filterDiv>
            <div>
               <h1 className="text-gray text-xl text-gray-200 font-semibold">User Summary</h1>
            </div>
            <div className="flex items-center space-x-3"></div>
         </styled.filterDiv>
         <styled.mapDiv>
            <ResponsiveContainer width="100%" height="100%">
               <ComposedChart
                  width={500}
                  height={400}
                  data={UserResult}
                  margin={{
                     top: 20,
                     right: 20,
                     bottom: 20,
                     left: 20,
                  }}
               >
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" strokeWidth={2} dataKey="user" stroke="#ff7300" />
               </ComposedChart>
            </ResponsiveContainer>
         </styled.mapDiv>
      </styled.div>
   );
}

export default UserStatusChartComponent;
