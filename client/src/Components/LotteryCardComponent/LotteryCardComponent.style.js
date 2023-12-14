import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem;
   .edit_div {
      svg {
         cursor: pointer;
      }
   }

   .coupon {
      width: 100%;
      height: 180px;
      border-radius: 10px;
      overflow: hidden;
      margin: auto;
      filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
      display: flex;
      align-items: stretch;
      position: relative;
      text-transform: uppercase;
   }
   .coupon::before,
   .coupon::after {
      content: '';
      position: absolute;
      top: 0;
      width: 50%;
      height: 100%;
      z-index: -1;
   }

   .coupon::before {
      left: 0;
      background-image: radial-gradient(
         circle at 0 50%,
         transparent 25px,
         gold 26px
      );
   }

   .coupon::after {
      right: 0;
      background-image: radial-gradient(
         circle at 100% 50%,
         transparent 25px,
         gold 26px
      );
   }

   .coupon > div {
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .left {
      width: 20%;
      border-right: 2px dashed rgba(0, 0, 0, 0.13);
   }
   .left div {
      transform: rotate(-90deg);
      white-space: nowrap;
      font-weight: bold;
   }

   .center {
      flex-grow: 1;
      text-align: center;
   }

   .right {
      width: 120px;
      background-image: radial-gradient(
         circle at 100% 50%,
         transparent 25px,
         #fff 26px
      );
   }
   .right div {
      font-family: 'Libre Barcode 128 Text', cursive;
      font-size: 2.5rem;
      font-weight: 400;
      transform: rotate(-90deg);
   }

   .center h2 {
      background: #000;
      color: gold;
      padding: 0 10px;
      font-size: 2.15rem;
      white-space: nowrap;
   }

   .center h3 {
      font-size: 2.15rem;
   }
   .center small {
      font-size: 0.625rem;
      font-weight: 600;
      letter-spacing: 2px;
   }

   @media screen and (max-width: 500px) {
      .coupon {
         display: grid;
         grid-template-columns: 1fr;
      }
      .left div {
         transform: rotate(0deg);
      }
      .right div {
         transform: rotate(0deg);
      }
   }
`;
