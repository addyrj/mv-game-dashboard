import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   position: absolute;
   z-index: 250;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--over-lay-cl);

   .main_div {
      padding: 2rem;
      width: 500px;
      background-color: var(--model-bg-cl);
      border-radius: 5px;
      position: relative;
      z-index: 10;
      .close_btn {
         position: absolute;
         top: 10px;
         right: 10px;
         cursor: pointer;

         svg {
            font-size: 20px;
         }
      }

      .icon_div {
         width: 45px;
         height: 45px;
         cursor: pointer;
      }
   }
`;

export const overLayDiv = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
`;
