import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   .payment_method {
      .card_grid {
         display: flex;
         flex-wrap: wrap;
      }

      .payment_card {
         width: 40%;
         /* height: 100px; */
         border-radius: 8px;
         cursor: pointer;
         /* overflow: hidden; */
         /* background-color: var(--main-cl); */
         padding: 0.3rem;
         border: 2px solid transparent;

         img {
            width: 100%;
            height: 80px;
            object-fit: contain;
         }
      }

      .active_payment_card {
         border: 2px solid var(--light-blue-cl);
      }
   }

   @media (max-width: 450px) {
      .payment_method {
         .card_grid {
            display: block;

            .payment_card {
               width: 100%;
            }
         }
      }
   }
`;
