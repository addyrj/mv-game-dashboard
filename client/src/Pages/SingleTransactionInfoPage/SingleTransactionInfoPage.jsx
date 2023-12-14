import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { getSingleOrderInfo, updateFiatWithdrawTransaction } from '../../App/Features/Payment/paymentActions';
import {
   singleOrderSelector,
   singleOrderLoadingSelector,
   singleOrderErrorSelector,
   authSelector,
   updateFiatWithdrawSelector,
   updateFiatWithdrawLoadingSelector,
   updateFiatWithdrawErrorSelector,
} from './SingleTransaction.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import dayjs from 'dayjs';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { message } from 'antd';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import OrderCompletedPopUpComponent from '../../Components/OrderCompletedPopUpComponent/OrderCompletedPopUpComponent';
import { AnimatePresence } from 'framer-motion';
import { removeUpdateWithdrawInfo } from '../../App/Features/Payment/paymentSlice';

const BoxCm = function ({ heading, value, children }) {
   return (
      <div className="box_div space-x-3 flex items-center mb-3">
         <div className="w-52">
            <p className="text-gray-400 font-medium">{heading}</p>
         </div>
         {children ? <div>{children}</div> : <p className="text-gray-300 font-medium">{value}</p>}
      </div>
   );
};

function SingleTransactionInfoPage() {
   const params = useParams();
   const dispatch = useDispatch();
   const { orderId } = params;
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const { register, getValues } = useForm();
   const [ShowAnimation, setShowAnimation] = useState(false);

   const singleOrder = useSelector(singleOrderSelector);
   const singleOrderLoading = useSelector(singleOrderLoadingSelector);
   const singleOrderError = useSelector(singleOrderErrorSelector);
   const auth = useSelector(authSelector);
   const updateFiatWithdraw = useSelector(updateFiatWithdrawSelector);
   const updateFiatWithdrawLoading = useSelector(updateFiatWithdrawLoadingSelector);
   const updateFiatWithdrawError = useSelector(updateFiatWithdrawErrorSelector);

   const paymentHandler = function (obj) {
      if (!auth) {
         return message.error('You need to login first');
      }
      const upiRefNumber = getValues('upiRefNumber');

      if (!upiRefNumber) {
         return message.error('Upi Ref Number is reuqired');
      }

      const userId = auth?.user?._id;
      const updateObject = { ...obj, actionUserId: userId, upiRefNumber };
      dispatch(updateFiatWithdrawTransaction(updateObject));
   };

   useEffect(() => {
      if (isAdmin && orderId) {
         dispatch(getSingleOrderInfo({ orderId }));
      }
   }, [isAdmin]);

   useEffect(() => {
      if (!!updateFiatWithdraw && updateFiatWithdraw?.success) {
         setShowAnimation(true);
         const interval = setTimeout(() => {
            setShowAnimation(false);
         }, 3000);
         return () => clearInterval(interval);
      }
   }, [updateFiatWithdraw]);

   useEffect(() => {
      return () => {
         dispatch(removeUpdateWithdrawInfo());
      };
   }, []);

   return (
      <div>
         <AnimatePresence>{ShowAnimation && <OrderCompletedPopUpComponent />}</AnimatePresence>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               heading={'Order'}
               pageName={'Single order'}
               subHeading={'Payment order'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-5">
               {singleOrderError ? <p className="text-sm error_cl">{singleOrderError}</p> : null}
               {singleOrderLoading && <SpinnerComponent />}
               {singleOrder && singleOrder?.success && singleOrder?.transactions && (
                  <div className="result_cr_div">
                     <h5 className="heading_el">Info</h5>
                     <BoxCm heading={'Status'} value={singleOrder?.transactions?.status} />
                     <BoxCm heading={'Way name'} value={singleOrder?.transactions?.wayName} />
                     <BoxCm heading={'Order id'} value={singleOrder?.transactions?.orderId} />
                     <BoxCm heading={'Amount'} value={singleOrder?.transactions?.amount} />
                     <BoxCm heading={'Transaction type'} value={singleOrder?.transactions?.transactionType} />
                     <BoxCm
                        heading={'Created at'}
                        value={dayjs(singleOrder?.transactions?.createdAt).format('DD MMMM YY hh:mm:ss A')}
                     />
                     {singleOrder?.transactions?.transactionUpdatedAt && (
                        <BoxCm
                           heading={'Updated at'}
                           value={dayjs(singleOrder?.transactions?.transactionUpdatedAt).format(
                              'DD MMMM YY hh:mm:ss A'
                           )}
                        />
                     )}
                     {singleOrder?.transactions?.upiRefNumber && (
                        <BoxCm heading={'Upi Ref Number'} value={singleOrder?.transactions?.upiRefNumber} />
                     )}
                     <h5 className="heading_el">Payment Method</h5>
                     {singleOrder?.transactions?.paymentMethod?.minPayment && (
                        <BoxCm heading={'Min amount'} value={singleOrder?.transactions?.paymentMethod?.minPayment} />
                     )}
                     {singleOrder?.transactions?.paymentMethod?.maxPayment && (
                        <BoxCm heading={'Max amount'} value={singleOrder?.transactions?.paymentMethod?.maxPayment} />
                     )}
                     <BoxCm heading={'Currecy Name'} value={singleOrder?.transactions?.paymentMethod?.name} />
                     <BoxCm heading={'Payment method icon'}>
                        <div className="cr_icon_div">
                           <img src={singleOrder?.transactions?.paymentMethod?.icon} alt="" />
                        </div>
                     </BoxCm>
                     {!!singleOrder?.transactions?.withdrawInformation && (
                        <Fragment>
                           <h5 className="heading_el">Withdraw Information</h5>
                           {(function () {
                              const keys = Object.keys(singleOrder?.transactions?.withdrawInformation);
                              return keys.map((el) => (
                                 <BoxCm
                                    key={el}
                                    heading={el}
                                    value={singleOrder?.transactions?.withdrawInformation[el]}
                                 />
                              ));
                           })()}
                        </Fragment>
                     )}

                     <h5 className="heading_el">Currency</h5>
                     <BoxCm heading={'Currency name'} value={singleOrder?.transactions?.currency?.currencyName} />
                     <BoxCm heading={'Currency type'} value={singleOrder?.transactions?.currency?.currencyType} />
                     <BoxCm heading={'Currency icon'}>
                        <div className="cr_icon_div">
                           <img src={singleOrder?.transactions?.currency?.icon} alt="" />
                        </div>
                     </BoxCm>
                     <h5 className="heading_el">User</h5>
                     <BoxCm heading={'User name'} value={singleOrder?.transactions?.user?.name} />
                     <BoxCm heading={'User id'} value={singleOrder?.transactions?.user?.userId} />
                     <BoxCm heading={'Avatar'}>
                        <div className="cr_icon_div mb-3">
                           <img src={singleOrder?.transactions?.user?.avatar} alt="" />
                        </div>
                     </BoxCm>
                     {!singleOrder?.transactions?.transactionUpdatedAt &&
                        !!singleOrder?.transactions?.withdrawInformation &&
                        singleOrder?.transactions?.transactionType === 'withdraw' && (
                           <div>
                              <Box
                                 sx={{
                                    '& > :not(style)': {
                                       my: 1,
                                       width: '100%',
                                    },
                                 }}
                              >
                                 <TextField
                                    name="upiRefNumber"
                                    label="UPI Ref No."
                                    variant="outlined"
                                    {...register('upiRefNumber')}
                                 />
                              </Box>
                              <div className="flex items-center space-x-4 mt-3">
                                 <CustomButtonComponent
                                    text={
                                       !!updateFiatWithdraw && updateFiatWithdraw?.success
                                          ? `${updateFiatWithdraw?.message}`
                                          : 'Payment Approved'
                                    }
                                    btnCl={'Publish'}
                                    type={'submit'}
                                    isLoading={updateFiatWithdrawLoading}
                                    onClick={
                                       !!updateFiatWithdraw && updateFiatWithdraw?.success
                                          ? null
                                          : () =>
                                               paymentHandler({
                                                  transactionId: singleOrder?.transactions?._id,
                                                  type: 'Approved',
                                               })
                                    }
                                 />
                                 {!!updateFiatWithdraw && updateFiatWithdraw?.success && (
                                    <p className="text-sm text-gray-300">{updateFiatWithdraw?.message}</p>
                                 )}
                                 {!!updateFiatWithdrawError && (
                                    <p className="text-sm error_cl">{updateFiatWithdrawError}</p>
                                 )}
                              </div>
                           </div>
                        )}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default SingleTransactionInfoPage;
