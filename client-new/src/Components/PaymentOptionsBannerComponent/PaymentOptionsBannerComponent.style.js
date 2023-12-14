import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 400px;
   border-radius: 15px;
   background-position: center;
   background-size: cover;
   background-image: url(/images/payment-bg-1.png);
   padding: 2rem;

   @media (max-width: 600px) {
      height: auto;
   }
`;

export const iconDiv = styled.div`
   .box {
      width: 80px;
      height: 50px;
      display: flex;
      align-content: center;
      justify-content: center;

      img {
         width: 100%;
         height: auto;
         object-fit: contain;
      }
   }

   @media (max-width: 520px) {
      .box {
         img {
            width: 70px;
            height: auto;
         }
      }
   }
`;
