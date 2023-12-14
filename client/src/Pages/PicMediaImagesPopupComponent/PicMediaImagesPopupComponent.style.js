import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--over-lay-cl);

   .picDiv {
      width: 500px;
      padding: 1rem;
      background-color: var(--smooth-dark-gray-cl);
      border-radius: 5px;
      z-index: 100;
      position: relative;

      .cl_div {
         position: absolute;
         right: 10px;
         top: 10px;
         cursor: pointer;
      }
   }
`;
