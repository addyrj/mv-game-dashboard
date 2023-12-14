import styled from 'styled-components';

export const div = styled.div`
   height: 100%;
   overflow-x: hidden;
`;

export const listDiv = styled.div`
   padding: 0.8rem 1rem;
   display: flex;
   align-items: center;
   cursor: pointer;
   border-bottom: 1px solid var(--light-gray-cl);
   transition: all 0.2s ease;

   &:hover {
      background-color: var(--light-gray-cl);
   }

   .icon_div {
      margin-right: 1rem;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--light-yellow-cl);

      svg {
         color: var(--main-cl);
         font-size: 23px;
      }
   }
`;
