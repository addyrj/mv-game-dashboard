import styled from 'styled-components';

export const div = styled.div`
   position: fixed;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--over-l);
   top: 0;
   left: 0;
   z-index: 600;

   .am_pop_up {
      width: 480px;
      background-color: var(--dark-bl-cl);
      border-radius: 5px;
      position: relative;

      .cl_div {
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
