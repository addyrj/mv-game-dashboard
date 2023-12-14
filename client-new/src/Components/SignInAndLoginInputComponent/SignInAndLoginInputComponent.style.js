import styled from 'styled-components';

export const div = styled.div`
   width: 50%;
   height: 100%;
   position: relative;
   z-index: 300;

   .close_button {
      position: absolute;
      top: 10px;
      right: 15px;

      svg {
         font-size: 20px;
         cursor: pointer;
      }
   }
`;

export const Loginwith = styled.div`
   margin-top: 70px;

   ._margin {
      margin-top: 100px;
   }

   ._parent {
      position: relative;
      margin: 20px auto;
      border-bottom: 0.5px solid #a7a9b1 !important;
      ._para {
         color: #a7a9b1;
         text-align: center;
         position: absolute;
         width: 40%;
         font-size: 12px;
         top: -9px;
         background-color: #1b1d29;
         transform: translate(70%, 0%);
      }
   }
`;
