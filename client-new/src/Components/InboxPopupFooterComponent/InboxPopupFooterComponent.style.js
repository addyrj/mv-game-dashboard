import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 10%;
   padding: 1rem;
   background-color: var(--dark-blue-cl);
   position: relative;
   z-index: 200;

   .active {
      background-color: var(--smooth-gray-sl-cl);

      svg {
         color: var(--light-green-cl);
      }
      p {
         color: var(--main-cl);
      }
   }
`;

export const optionsDiv = styled.div`
   padding: 0.7rem 2rem;
   width: fit-content;
   display: flex;
   align-items: center;
   cursor: pointer;
   border-radius: 5px;

   svg {
      font-size: 20px;
   }

   &:hover {
      p {
         color: var(--main-cl);
      }
   }

   p {
      margin-left: 0.6rem;
      font-weight: 600;
      font-size: 14px;
   }
`;
