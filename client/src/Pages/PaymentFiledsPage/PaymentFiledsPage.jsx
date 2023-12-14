import React, { useEffect, useState } from 'react';
import * as styled from './PaymentFiledsPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { deletePaymentOptionsFiled, getAllPaymentOptionFields } from '../../App/Features/Payment/paymentActions';
import {
   paymentOptionsFieldsSelector,
   paymentOptionsFieldsLoadingSelector,
   paymentOptionsFieldsErrorSelector,
} from './PaymentFields.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import { BiMessageSquareEdit } from '@react-icons/all-files/bi/BiMessageSquareEdit';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import { Popconfirm } from 'antd';

const ROW = [
   { heading: 'Label', id: 1 },
   { heading: 'Label key', id: 2 },
   { heading: 'Field type', id: 3 },
   { heading: 'Hide', id: 4 },
   { heading: 'Read only', id: 5 },
   { heading: 'Created at', id: 6 },
   { heading: 'Options', id: 7 },
];

function PaymentFiledsPage() {
   const navigation = useNavigate();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();
   const [Page, setPage] = useState(0);

   const paymentOptionsFields = useSelector(paymentOptionsFieldsSelector);
   const paymentOptionsFieldsLoading = useSelector(paymentOptionsFieldsLoadingSelector);
   const paymentOptionsFieldsError = useSelector(paymentOptionsFieldsErrorSelector);

   const CreateNewFiled = function () {
      navigation('/payment-fields/create');
   };

   const NextPageHandler = function () {
      setPage((prevState) => prevState + 1);
   };

   const PrevPageHandler = function () {
      if (Page >= 1) {
         setPage((prevState) => prevState - 1);
      }
   };

   const EditHandler = function (id) {
      navigation(`/payment-fields/edit/${id}`);
   };

   const DeleteHandler = (id) => {
      dispatch(deletePaymentOptionsFiled({ fieldId: id }));
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllPaymentOptionFields({ page: Page }));
      }
   }, [isAdmin, Page]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               heading={'Payment Fields'}
               pageName={'Single order'}
               subHeading={'Fields'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
               menu={true}
               innerProps={<MenuItem onClick={CreateNewFiled}>Add new currency</MenuItem>}
            />
            <div className="mt-5">
               {paymentOptionsFieldsLoading && <SpinnerComponent />}
               {paymentOptionsFieldsError && <p className="error_cl text-sm">{paymentOptionsFieldsError}</p>}
               {!!paymentOptionsFields && paymentOptionsFields?.success && paymentOptionsFields?.items && (
                  <TableComponent
                     row={ROW}
                     nextHandler={NextPageHandler}
                     nextAndPrev={true}
                     prevHandler={PrevPageHandler}
                     disablePrevbtn={Page === 0 ? true : false}
                     disableNextbtn={Page >= paymentOptionsFields?.totalPages ? true : false}
                     tableWidth={1200}
                  >
                     {paymentOptionsFields?.items.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.label}</td>
                           <td>{el?.labelKey}</td>
                           <td>{el?.fieldType}</td>
                           <td>{el?.hide.toString()}</td>
                           <td>{el?.readOnly.toString()}</td>
                           <td>{dayjs(el?.createdAt).format('DD MMMM YY h:m:s A')}</td>
                           <td className="flex items-center space-x-2">
                              <BiMessageSquareEdit className=" cursor-pointer" onClick={() => EditHandler(el?._id)} />
                              <Popconfirm
                                 title="Delete the task"
                                 description="Are you sure to delete this payment input?"
                                 onConfirm={() => DeleteHandler(el?._id)}
                                 okText="Yes"
                                 cancelText="No"
                              >
                                 <MdDelete className="cursor-pointer" />
                              </Popconfirm>
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default PaymentFiledsPage;
