import React from 'react';
import * as styled from './PaytmPaymentComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import axiosInstance from '../../Services/AxiosInstance';

function PaytmPaymentComponent() {
   const getData = async (data) => {
      const paymentDataRespose = await axiosInstance.post(
         '/payment/paytem-payment',
         data
      );
      if (paymentDataRespose && paymentDataRespose?.data) {
         return paymentDataRespose?.data;
      }

      console.log(paymentDataRespose);
   };

   function isDate(val) {
      // Cross realm comptatible
      return Object.prototype.toString.call(val) === '[object Date]';
   }

   function isObj(val) {
      return typeof val === 'object';
   }

   function stringifyValue(val) {
      if (isObj(val) && !isDate(val)) {
         return JSON.stringify(val);
      } else {
         return val;
      }
   }

   function buildForm({ action, params }) {
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', action);

      Object.keys(params).forEach((key) => {
         const input = document.createElement('input');
         input.setAttribute('type', 'hidden');
         input.setAttribute('name', key);
         input.setAttribute('value', stringifyValue(params[key]));
         form.appendChild(input);
      });

      return form;
   }

   function post(details) {
      const form = buildForm(details);
      document.body.appendChild(form);
      form.submit();
      form.remove();
   }

   const makePayment = () => {
      getData({ amount: 500, email: 'abc@gmail.com' }).then((response) => {
         console.log(response);

         const information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response,
         };
         post(information);
      });
   };

   return (
      <styled.div>
         <CustomButtonComponent
            onClick={makePayment}
            text={'Confim'}
            btnCl={'large_sn_btn'}
         />
      </styled.div>
   );
}

export default PaytmPaymentComponent;
