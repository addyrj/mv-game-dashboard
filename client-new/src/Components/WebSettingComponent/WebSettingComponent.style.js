import styled from 'styled-components';

export const div = styled.div`
   .over_flow {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
   }
`;

export const popUp = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: var(--over-lay-cl);
   display: flex;
   align-items: center;
   justify-content: center;

   .main_div {
      width: 65%;
      background-color: var(--smooth-lg-sl-cl);
      position: relative;
      z-index: 200;
      background: rgba(255, 255, 255, 0.28);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.11);

      .cl_icon {
         position: absolute;
         right: 10px;
         top: 10px;
         cursor: pointer;
      }

      .tab_border {
         border-bottom: 1px solid var(--smooth-gray-cl);
      }

      .tb_div {
         padding: 1rem 4rem;
         cursor: pointer;
         border-bottom: 2px solid transparent;
      }

      .active_tab {
         border-bottom: 2px solid var(--light-green-cl);
      }
   }

   @media (max-width: 800px) {
      .main_div {
         width: 95%;
      }
   }
`;
