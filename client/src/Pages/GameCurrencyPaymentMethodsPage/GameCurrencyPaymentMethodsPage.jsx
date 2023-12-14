import { MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import * as styled from './GameCurrencyPaymentMethodsPage.style';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useNavigate } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyPaymentOptions } from '../../App/Features/Payment/paymentActions';
import {
   currencyMethodsSelector,
   currencyMethodsLoadingSelector,
   currencyMethodsErrorSelector,
} from './GameCurrency.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';

const ROW = [
   { heading: 'Name', id: 1 },
   { heading: 'Min', id: 3 },
   { heading: 'Max', id: 4 },
   { heading: 'Icon', id: 5 },
   { heading: 'Created At', id: 6 },
   { heading: 'Options', id: 8 },
];

function GameCurrencyPaymentMethodsPage() {
   const navigation = useNavigate();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();
   const [Page, setPage] = useState(0);

   const currencyMethods = useSelector(currencyMethodsSelector);
   const currencyMethodsLoading = useSelector(currencyMethodsLoadingSelector);
   const currencyMethodsError = useSelector(currencyMethodsErrorSelector);

   const NextPageHandler = function () {
      setPage((prevState) => prevState + 1);
      const nextPage = Page + 1;
      dispatch(getCurrencyPaymentOptions({ page: nextPage }));
   };

   const PrevPageHandler = function () {
      setPage((prevState) => prevState - 1);
      const prevPage = Page - 1;
      dispatch(getCurrencyPaymentOptions({ page: prevPage }));
   };

   const CreateGameCurrencyPaymentHandler = function () {
      navigation('/game-currency-payment/create');
   };

   useEffect(() => {
      if (isAdmin && !currencyMethods) {
         dispatch(getCurrencyPaymentOptions({ page: Page }));
      }
   }, [isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               subHeading={'All Payment Options'}
               pageName={'Currency Payment'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
               menu={true}
               innerProps={<MenuItem onClick={CreateGameCurrencyPaymentHandler}>Add new currency</MenuItem>}
            />
            <div>
               {!!currencyMethodsError ? <p className="text-sm error_cl">{currencyMethodsError}</p> : null}
               {!!currencyMethodsLoading ? <SpinnerComponent /> : null}
               {!!currencyMethods && currencyMethods?.success && currencyMethods?.methods ? (
                  <TableComponent
                     row={ROW}
                     nextHandler={NextPageHandler}
                     nextAndPrev={true}
                     prevHandler={PrevPageHandler}
                     disablePrevbtn={+Page === 0 ? true : false}
                     disableNextbtn={+Page >= currencyMethods?.totalPages ? true : false}
                     tableWidth={1100}
                  >
                     {currencyMethods?.methods.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.name}</td>
                           <td>{el?.min?.$numberDecimal}</td>
                           <td>{el?.max?.$numberDecimal}</td>
                           <td>
                              <div className="icon_div shadow">
                                 <img src={el?.icon} alt="" />
                              </div>
                           </td>
                           <td>{dayjs(el?.spinTimePeriod).format('DD MMMM YYYY hh:mm:ss A')}</td>
                           <td>
                              <p onClick={() => navigation(`/game-currency-payment/edit/${el?._id}`)}>Edit</p>
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : null}
            </div>
         </div>
      </styled.div>
   );
}

export default GameCurrencyPaymentMethodsPage;
