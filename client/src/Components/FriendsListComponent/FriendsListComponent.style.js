import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem;
   background: #45d045;
   background: var(--light-gray-cl);
   box-sizing: content-box;
   border-radius: 8px;
   position: relative;
   display: flex;
   flex-direction: column;
   height: 700px;
   position: relative;

   .screen {
      width: 100%;
      height: 100%;
      overflow-x: scroll;
   }
`;
