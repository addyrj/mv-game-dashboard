import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 1rem;
   background-color: var(--smooth-gray-md-cl);
   border-radius: 5px;
`;

export const medelDiv = styled.div`
   width: 100%;
   display: flex;
   overflow-x: scroll;

   .over_div {
      width: 1300px;
      display: flex;
      padding: 0.2rem;

      .ac_div {
         width: 80px;
         height: 70px;
         display: flex;
         cursor: pointer;

         img {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }

      .locked {
         opacity: 0.5;
      }
   }
`;
