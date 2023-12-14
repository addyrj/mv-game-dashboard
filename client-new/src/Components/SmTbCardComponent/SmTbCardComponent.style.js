import styled from 'styled-components';

export const button = styled.button`
   cursor: pointer;
   padding: 0.5rem;
   border-radius: 5px;
   transition: all 0.2s ease;

   &:hover {
      background-color: var(--smooth-gray-sl-cl);
   }

   .icon_div {
      width: 30px;
      height: 30px;
      border-radius: 50%;

      img {
         width: 100%;
         height: 100%;
      }
   }
`;
