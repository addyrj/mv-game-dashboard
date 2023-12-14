import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--over-lay-cl);

   .over_flow {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -1;
   }

   .popDiv {
      width: 600px;
      padding: 1rem;
      background-color: var(--smooth-gray-sl-cl);
      border-radius: 5px;
      position: relative;
      z-index: 200;

      .close_div {
         position: absolute;
         right: 10px;
         top: 10px;

         svg {
            color: var(--main-cl);
            font-size: 20px;
            cursor: pointer;
         }
      }
   }
`;
