import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropDownComponent from '../DropDownComponent/DropDownComponent';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   gameProvidersSelector,
   gameProvidersLoadingSelector,
   gameProvidersErrorSelector,
} from './ProviderGames.Selector';
import Badge from '@mui/material/Badge';
import { CgGames } from '@react-icons/all-files/cg/CgGames';
import { Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { removeProvidersGames } from '../../App/Features/Game/gameSlice';
import {
   getAllGamesProviersWithGameCounts,
   getSelectedProviderGames,
} from '../../App/Features/Game/gameAction';

let isTrack = false;

function ProviderGamesFilterComponent({ pageName, filterBy }) {
   const [SelectedProvider, setSelectedProvider] = useState([]);
   const dispatch = useDispatch();
   const navigation = useNavigate();
   const [params] = useSearchParams();
   const providerName = params.get('providerName');

   const gameProviders = useSelector(gameProvidersSelector);
   const gameProvidersLoading = useSelector(gameProvidersLoadingSelector);
   const gameProvidersError = useSelector(gameProvidersErrorSelector);

   const checkBoxHander = function (event, providerName) {
      if (event.target.checked) {
         setSelectedProvider((prevState) => prevState.concat(providerName));
      } else {
         const checkProvider = SelectedProvider.filter(
            (el) => el !== providerName
         );
         setSelectedProvider(checkProvider);
      }
   };

   const clearAllHandler = function () {
      setSelectedProvider([]);
   };

   useEffect(() => {
      if (SelectedProvider.length) {
         isTrack = true;
         let urlParam = '';

         for (let i = 0; i < SelectedProvider.length; i++) {
            if (i >= 1) {
               urlParam += `%${SelectedProvider[i]}`;
            } else {
               urlParam += `${SelectedProvider[i]}`;
            }
         }

         dispatch(
            getSelectedProviderGames({
               SelectedProvider,
               page: 0,
               filterBy,
            })
         );

         navigation(`?providerName=${urlParam}&page=0&sort=popular`);
      }

      if (SelectedProvider.length === 0 && isTrack) {
         navigation(`/${pageName}?page=0`);
         dispatch(removeProvidersGames());
      }
   }, [SelectedProvider]);

   useEffect(() => {
      dispatch(
         getAllGamesProviersWithGameCounts({
            searchCollection: filterBy,
         })
      );
      if (!!providerName && providerName.length) {
         const providerNameAr = providerName.split('%');
         setSelectedProvider(providerNameAr);
      }
   }, []);

   return (
      <div>
         <DropDownComponent heading={'Provider'} active={'All Provider'}>
            <div className="select-options-wrap">
               <div className="ui-scrollview select-options len-55">
                  <div className="select-option">
                     <div
                        className="provider-name heading_dn text-center"
                        onClick={clearAllHandler}
                     >
                        Clear All
                     </div>
                  </div>
                  {!!gameProvidersLoading ? <SpennerComponent /> : null}
                  {!!gameProvidersError ? (
                     <p className="error_cl text-sm">{gameProvidersError}</p>
                  ) : null}
                  {!!gameProviders &&
                  gameProviders?.success &&
                  gameProviders?.providers &&
                  gameProviders?.providers?.length ? (
                     gameProviders?.providers.map((el, index) => (
                        <div key={index} className="select-option w-full">
                           <Checkbox
                              checked={
                                 SelectedProvider.includes(
                                    el?._id?.providerName
                                 )
                                    ? true
                                    : false
                              }
                              onClick={(event) =>
                                 checkBoxHander(event, el?._id?.providerName)
                              }
                              className="w-full"
                           >
                              <div className="provider-name me-4 w-full">
                                 <p className="text-gray-400">
                                    {el?._id?.providerName}
                                 </p>
                              </div>
                              <Badge
                                 badgeContent={el?.totalGames}
                                 color="success"
                              >
                                 <CgGames className="text-gray-500" />
                              </Badge>
                           </Checkbox>
                        </div>
                     ))
                  ) : (
                     <div className="select-option">
                        <p>No Game providers</p>
                     </div>
                  )}
               </div>
            </div>
         </DropDownComponent>
      </div>
   );
}

export default React.memo(ProviderGamesFilterComponent);
