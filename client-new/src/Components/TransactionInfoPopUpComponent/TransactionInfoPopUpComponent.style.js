import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 500;
   background-color: var(--over-lay-cl);
   display: flex;
   align-items: center;
   justify-content: center;

   .info_div {
      width: 450px;
      background-color: var(--smooth-gray-sl-cl);
      position: relative;
      padding: 1rem;
      border-radius: 2px;

      .cl_btn {
         position: absolute;
         right: 15px;
         top: 15px;
         cursor: pointer;
      }
   }
`;

export const statusDiv = styled.div`
   .box {
      display: flex;
      align-items: center;
      width: 100%;

      .in_Div {
         width: 30px;
         height: 30px;
         border-radius: 50%;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }

      p {
         color: var(--main-cl);
         font-size: 13px;
         font-weight: 600;
      }

      ._left {
         width: 40%;
         padding: 1rem;
      }

      ._right {
         width: 70%;
         padding: 1rem;

         a {
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
         }

         .st {
            color: var(--primary-color);
         }
      }
   }
`;
