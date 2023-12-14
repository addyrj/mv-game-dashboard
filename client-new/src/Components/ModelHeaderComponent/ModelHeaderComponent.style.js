import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem;
   background-color: var(--model-bg-cl);

   p {
      font-size: 17px;
      color: var(--main-cl);
      font-weight: 600;
   }

   svg {
      font-size: 22px;
      color: var(--smooth-gray-cl);
      cursor: pointer;
   }

   @media (max-width: 600px) {
      p {
         font-size: 14px;
      }
   }
`;
