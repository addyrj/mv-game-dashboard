import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: var(--over-lay-cl);
   z-index: 400;

   .cn_div {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .winDv {
      width: 550px;
      padding: 1rem;
      background-color: var(--main-cl);
      border-radius: 5px;
      position: relative;

      .cl-div {
         position: absolute;
         right: 10px;
         top: 10px;
         cursor: pointer;
      }
   }
`;
