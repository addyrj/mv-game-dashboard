import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--over-lay-cl);

   .main_div {
      width: 650px;
      padding: 2rem;
      height: auto;
      background-color: var(--smooth-dark-gray-cl);
      border-radius: 10px;
      position: relative;
      height: 600px;
      overflow-x: hidden;

      .close_btn {
         position: absolute;
         right: 10px;
         top: 10px;
         cursor: pointer;

         svg {
            font-size: 20px;
         }
      }
   }
`;

export const contentDiv = styled.div``;
