import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 1rem;
   height: 500px;
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;

   .imgDiv {
      height: 350px;
      position: relative;
      overflow: hidden;
      width: 100%;
      margin-bottom: 2rem;

      img {
         position: absolute;
         height: 100%;
         width: 100%;
         object-fit: contain;
      }
   }

   @media (max-width: 1300px) {
      height: 400px;

      .imgDiv {
         height: 200px;
      }
   }

   @media (max-width: 1000px) {
      height: 300px;

      .imgDiv {
         height: 150px;
      }
   }

   @media (max-width: 500px) {
      height: 250px;

      .imgDiv {
         height: 120px;
      }
   }
`;
