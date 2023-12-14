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
   z-index: 400;

   .overFlow {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
   }

   .main_div {
      width: 600px;
      position: relative;
      background-color: var(--sm-border-cl);

      .swap_n {
         width: 40px;
         height: 40px;
         display: flex;
         align-items: center;
         justify-content: center;
         cursor: pointer;
         border-radius: 5px;
         margin-top: -50px;
         background-color: var(--dark-btn-cl);
         z-index: 1;
      }

      .info_div {
         padding: 0.8rem;
         background-color: var(--dark-btn-cl);
      }

      .swap_cr {
         margin-top: -34px;
      }
   }
`;
