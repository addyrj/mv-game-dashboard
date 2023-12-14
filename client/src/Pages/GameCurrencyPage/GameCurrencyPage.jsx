import React, { useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import * as styled from './GameCurrencyPage.style';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleGameCurrency, getGameCurrencysList } from '../../App/Features/Games/GameActions';
import useRoles from '../../Hooks/useRoles';
import { useSearchParams } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import TableComponent from '../../Components/TableComponent/TableComponent';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { useNavigate } from 'react-router-dom';
import { ROW } from './TableCl';
import dayjs from 'dayjs';
import {
   gameCurrencyListInfoSelector,
   gameCurrencyListLoadingSelector,
   gameCurrencyListErrorSelector,
} from './Game.Selector';

function GameCurrencyPage() {
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [params] = useSearchParams();
   const page = params.get('page');
   const navigation = useNavigate();

   const gameCurrencyListInfo = useSelector(gameCurrencyListInfoSelector);
   const gameCurrencyListLoading = useSelector(gameCurrencyListLoadingSelector);
   const gameCurrencyListError = useSelector(gameCurrencyListErrorSelector);

   const DeleteGameCurrencyHandler = function (id) {
      if (isAdmin) {
         dispatch(deleteSingleGameCurrency({ id }));
      }
   };

   const EditGamesCurrencyHandler = function (id) {
      if (isAdmin) {
         navigation(`/game-currency/${id}`);
      }
   };

   const NextPageHandler = function () {
      navigation(`?page=${+page + 1}`);
   };

   const PrevPageHandler = function () {
      navigation(`?page=${+page - 1}`);
   };

   const CreateGameCurrencyHandler = function () {
      navigation('/game-currency/create');
   };

   useEffect(() => {
      if (isAdmin && !!page) {
         dispatch(getGameCurrencysList({ page: page }));
      }
   }, [isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               subHeading={'All currency'}
               pageName={'Game Currency'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
               menu={true}
               innerProps={<MenuItem onClick={CreateGameCurrencyHandler}>Add new currency</MenuItem>}
            />
            <styled.contentDiv className="mt-5">
               <div className="mt-5">
                  {!!gameCurrencyListLoading ? <SpinnerComponent /> : null}
                  {!!gameCurrencyListError ? <p className="text-sm error_cl">{gameCurrencyListError}</p> : null}
                  {!!gameCurrencyListInfo && gameCurrencyListInfo?.success && gameCurrencyListInfo?.currency?.length ? (
                     <TableComponent
                        row={ROW}
                        nextHandler={NextPageHandler}
                        nextAndPrev={true}
                        prevHandler={PrevPageHandler}
                        disablePrevbtn={+page === 0 ? true : false}
                        disableNextbtn={+page >= gameCurrencyListInfo?.totalPages ? true : false}
                     >
                        {gameCurrencyListInfo?.currency.map((el) => (
                           <tr key={el._id}>
                              <td>{el?.currencyName}</td>
                              <td>{el?.locked.toString()}</td>
                              <td>
                                 {el?.icon ? (
                                    <div className="currency_icon_div shadow">
                                       <img src={el?.icon} alt="" />
                                    </div>
                                 ) : null}
                              </td>
                              <td style={{ width: '40%' }}>
                                 {el?.description?.length > 100
                                    ? `${el?.description.slice(0, 100)}...`
                                    : el?.description.slice(0, 100)}
                              </td>
                              <td>{dayjs(el?.createdAt).format('DD MMMM YYYY m:h:ss A')}</td>
                              <td className="flex items-center space-x-2">
                                 {/* <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() =>
                                       DeleteGameCurrencyHandler(el._id)
                                    }
                                 >
                                    <p className="text-red-500 font-medium">
                                       Delete
                                    </p>
                                 </Popconfirm> */}
                                 <p onClick={() => EditGamesCurrencyHandler(el._id)}>Edit</p>
                              </td>
                           </tr>
                        ))}
                     </TableComponent>
                  ) : (
                     <div className="flex">
                        <p
                           className=" text-gray-800 hover:text-blue-700 cursor-pointer"
                           onClick={CreateGameCurrencyHandler}
                        >
                           Create New Currency
                        </p>
                     </div>
                  )}
               </div>
            </styled.contentDiv>
         </div>
      </styled.div>
   );
}

export default GameCurrencyPage;
