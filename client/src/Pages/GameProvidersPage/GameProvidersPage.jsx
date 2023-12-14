import { MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import * as styled from './GameProvidersPage.style';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { useSearchParams } from 'react-router-dom';
import {
   blockSingleGameProvider,
   getAllGameProviders,
   unblockSingleGameProvider,
} from '../../App/Features/GameProviders/GameProvidersActions';
import {
   gameProvidersSelector,
   gameProvidersLoadingSelector,
   gameProvidersErrorSelector,
} from './GameProvider.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import { ROW } from './GameProviderTable';
import dayjs from 'dayjs';
import { Popconfirm } from 'antd';

function GameProvidersPage() {
   const navigation = useNavigate();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();
   const [params] = useSearchParams();
   const page = params.get('page');

   const CreateNewGameProviderHandler = function () {
      navigation('/games/providers/create');
   };

   const gameProviders = useSelector(gameProvidersSelector);
   const gameProvidersLoading = useSelector(gameProvidersLoadingSelector);
   const gameProvidersError = useSelector(gameProvidersErrorSelector);

   const NextPageHandler = function () {
      navigation(`?page=${+page + 1}`);
   };

   const PrevPageHandler = function () {
      navigation(`?page=${+page - 1}`);
   };

   const BlockGameProviderHandler = function (_id) {
      dispatch(blockSingleGameProvider({ _id }));
   };

   const UnblockGameProviderHandler = function (_id) {
      dispatch(unblockSingleGameProvider({ _id }));
   };

   const EditGameProviderHandler = function (_id) {
      navigation(`/games/providers/${_id}`);
   };

   const GameProviderPageHandler = function (_id) {
      navigation(`/provider/games/${_id}?page=0`);
   };

   useEffect(() => {
      if (page && isAdmin) {
         dispatch(getAllGameProviders({ page }));
      }
   }, [page, isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Game Providers'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
               menu={true}
               innerProps={<MenuItem onClick={CreateNewGameProviderHandler}>Create new game provider</MenuItem>}
            />
            {!!gameProvidersError ? <p className="text-sm error_cl">{gameProvidersError}</p> : null}
            {!!gameProvidersLoading ? <SpinnerComponent /> : null}
            {!!gameProviders && gameProviders?.success && gameProviders?.providers?.length ? (
               <TableComponent
                  row={ROW}
                  nextHandler={NextPageHandler}
                  nextAndPrev={true}
                  prevHandler={PrevPageHandler}
                  disablePrevbtn={+page === 0 ? true : false}
                  disableNextbtn={+page >= gameProviders?.totalPages ? true : false}
                  tableWidth={1500}
               >
                  {gameProviders?.providers.map((el) => (
                     <tr key={el._id}>
                        <td>{el?.providerName}</td>
                        <td>{el?.email}</td>
                        <td>{el?.phoneNumber}</td>
                        <td
                           style={{
                              width: '20%',
                           }}
                        >
                           {el?.description.length >= 100 ? `${el?.description.slice(0, 100)}...` : el?.description}
                        </td>
                        <td>
                           <div
                              className="logo_div shadow cursor-pointer"
                              onClick={() => GameProviderPageHandler(el?._id)}
                           >
                              <img src={el?.logo} alt="" />
                           </div>
                        </td>
                        <td>{dayjs(el?.createdAt).format('DD MMMM YYYY m:h:ss A')}</td>
                        <td>
                           <div className={el?.status}>
                              <p>{el?.status}</p>
                           </div>
                        </td>
                        <td className="flex items-center space-x-2">
                           {el?.status === 'Blocked' ? (
                              <Popconfirm
                                 title="Block"
                                 description={`Are you sure you want to Unblock ${el?.providerName} game provider?.`}
                                 okText="Yes"
                                 cancelText="No"
                                 onConfirm={() => UnblockGameProviderHandler(el._id)}
                              >
                                 <p className="text-red-500 font-medium">Unblock Provider</p>
                              </Popconfirm>
                           ) : (
                              <Popconfirm
                                 title="Block"
                                 description={`Are you sure you want to block ${el?.providerName} game provider?. Once you block the game provider, game provider games is not visible to anyone !`}
                                 okText="Yes"
                                 cancelText="No"
                                 onConfirm={() => BlockGameProviderHandler(el._id)}
                              >
                                 <p className="text-red-500 font-medium">Block Provider</p>
                              </Popconfirm>
                           )}
                           <p onClick={() => EditGameProviderHandler(el._id)}>Edit</p>
                        </td>
                     </tr>
                  ))}
               </TableComponent>
            ) : (
               <div>
                  <p className="text-lg text-gray-300">No game providers</p>
                  <p className="text-sm text-gray-500">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Non tempora deleniti rem ipsa? Explicabo
                     voluptates illum officiis sapiente a! Laudantium?
                  </p>
               </div>
            )}
         </div>
      </styled.div>
   );
}

export default GameProvidersPage;
