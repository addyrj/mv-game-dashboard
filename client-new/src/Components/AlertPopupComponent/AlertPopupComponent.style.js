import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 70px;
   left: -50%;
   z-index: 100;

   .main_div {
      padding: 1.2rem 2.4rem;
      position: relative;
      width: 350px;
      background-color: var(--light-gray-cl);
      border-radius: 5px;

      .triangle-top {
         width: 0;
         height: 0;
         border-left: 10px solid transparent;
         border-right: 10px solid transparent;
         border-bottom: 10px solid var(--light-gray-cl);
         position: absolute;
         top: -6%;
         left: 50%;
      }

      .cls_btn {
         position: absolute;
         right: 10px;
         top: 10px;
         font-size: 20px;
         cursor: pointer;
      }
   }

   @media (max-width: 500px) {
      .main_div {
         width: 250px;

         p {
            font-size: 11px;
         }
      }
   }
`;
