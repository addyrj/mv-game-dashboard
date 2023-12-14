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

   .over_lay_div {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 200;
      background-color: var(--over-lay-cl);
   }

   .pv_div {
      width: 450px;
      padding: 3rem;
      position: relative;
      z-index: 400;
      background-color: var(--light-sl-cl);
      border-radius: 5px;

      .cl_btn {
         position: absolute;
         right: 20px;
         top: 20px;
         cursor: pointer;
      }
   }
`;
