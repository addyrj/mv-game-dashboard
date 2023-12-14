import styled from 'styled-components';

export const div = styled.div`
   width: 50%;
   padding: 2rem;
   display: flex;
   align-items: center;
   justify-content: center;

   .backbtn {
      cursor: pointer;
      width: max-content;
   }

   @media (max-width: 530px) {
      width: 100%;

      h5 {
         font-size: 19px;
      }
   }
`;
