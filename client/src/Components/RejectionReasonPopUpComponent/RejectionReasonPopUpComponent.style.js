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
   z-index: 100;

   .main_div {
      width: 600px;
      background-color: var(--smooth-gray-sl-cl);
      border-radius: 15px;
      overflow: hidden;
      position: relative;

      .close_button {
         top: 15px;
         right: 15px;
         position: absolute;
         cursor: pointer;
      }

      .heading_div {
         padding: 1.5rem;
         border-bottom: 1px solid var(--smooth-gray-cl);
      }

      .content_div {
         color: var(--main-cl);

         .option_div {
            padding: 0.6rem 2rem;
         }

         p {
            font-size: 17px;
         }
      }
   }
`;
