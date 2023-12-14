import React, { Fragment, useEffect, useState } from 'react';
import * as styled from './GameUploadResultChartComponent.style';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { filterGameUploadDataResult, getGamesUploadResult } from '../../App/Features/Admin/adminActions';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
   gameStatusSelector,
   gameStatusLoadingSelector,
   gameStatusErrorSelector,
   gameStatusFilterDataSelector,
   gameStatusFilterDataErrorSelector,
} from './GameStatus.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';

function GameUploadResultChartComponent() {
   const {
      userRoles: { isAdmin, isSupport },
   } = useRoles();
   const dispatch = useDispatch();

   const gameStatus = useSelector(gameStatusSelector);
   const gameStatusLoading = useSelector(gameStatusLoadingSelector);
   const gameStatusError = useSelector(gameStatusErrorSelector);
   const gameStatusFilterData = useSelector(gameStatusFilterDataSelector);
   const gameStatusFilterDataError = useSelector(gameStatusFilterDataErrorSelector);

   const handleChange = async (event) => {
      const value = event.target.value;
      dispatch(filterGameUploadDataResult({ filter: value }));
   };

   useEffect(() => {
      if (isAdmin || isSupport) {
         dispatch(getGamesUploadResult());
      }
   }, [isAdmin, isSupport]);

   return (
      <styled.div>
         {!!gameStatusError ? <p className="text-sm error_cl">{gameStatusError}</p> : null}
         {!!gameStatusFilterDataError ? <p className="text-sm error_cl">{gameStatusFilterDataError}</p> : null}
         {!!gameStatusLoading ? <SpinnerComponent /> : null}
         {!!gameStatus && gameStatus?.success ? (
            <Fragment>
               <styled.filterDiv>
                  <div>
                     <h1 className="text-gray text-2xl text-gray-200 font-semibold">Games Overview Status</h1>
                  </div>
                  <div className="flex items-center space-x-3">
                     <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                           <Select defaultValue={'%d %m %Y'} label="Filter" onChange={handleChange}>
                              <MenuItem value={'%d %m %Y'}>Days</MenuItem>
                              <MenuItem value={'%m %Y'}>Months</MenuItem>
                              <MenuItem value={'%Y'}>Year</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>
                  </div>
               </styled.filterDiv>
               <styled.mapDiv>
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart
                        width={300}
                        height={100}
                        data={gameStatusFilterData?.result || gameStatus?.result}
                        margin={{
                           top: 5,
                           right: 30,
                           left: 20,
                           bottom: 5,
                        }}
                     >
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <XAxis dataKey="_id" />
                        <Line type="monotoneX" dataKey="games" stroke="#fc8d01" strokeWidth={2} />
                     </LineChart>
                  </ResponsiveContainer>
               </styled.mapDiv>
            </Fragment>
         ) : null}
      </styled.div>
   );
}

export default GameUploadResultChartComponent;
