import styled from 'styled-components';

export const div = styled.div`
   width: 400px;
   height: 50px;
   margin-left: 1rem;
   border-radius: 5px;
   overflow: hidden;
   display: flex;
   align-items: center;
   border: 1px solid var(--smooth-gray-sl-cl);

   input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: 1rem;
      background-color: transparent;
      color: var(--main-cl);
   }

   .icon_div {
      width: 50px;

      svg {
         font-size: 20px;
      }
   }
`;
