import styled from 'styled-components';

export const div = styled.div`
   .overLayDiv {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: fixed;
      background-color: var(--over-lay-cl);
      z-index: 700;
   }

   .requestMain_div {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 700;
      /* background-color: var(--over-lay-cl); */

      .requestDiv {
         width: 450px;
         height: 250px;
         background-color: var(--model-bg-cl);
         border-radius: 5px;
         padding: 2rem;
         text-align: center;
         display: flex;
         justify-content: center;
         align-items: center;

         p {
            color: var(--main-cl);
         }
      }
   }
`;
