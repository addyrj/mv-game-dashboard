import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--over-lay-cl);

   .popDiv {
      width: 400px;
      height: 500px;
      border-radius: 5px;
      background-color: var(--sm-border-cl);

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }
`;
