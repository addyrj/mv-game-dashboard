import styled from 'styled-components';

export const div = styled.div`
   background-color: var(--side-bar-cl);
   /* background-color: var(--dark-red-cl); */
   height: 100vh;
   transition: all 0.3s ease;
   overflow: scroll;
   width: 300px;
   position: relative;

   .show_sm_sideBar {
      position: absolute;
      left: -200px;
      top: 0;
      padding: 1rem;
      transition: all 0.4s ease;
      height: 100%;
      display: block;
      /* background-color: var(--side-bar-cl); */
   }

   .lg_side_bar_div {
      position: absolute;
      top: 0;
      transition: all 0.4s ease;
      width: 100%;
      left: 0;
   }

   .toggle_bar_div {
      width: 45px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      /* background-color: var(--smooth-gray-cl); */
      border-radius: 5px;
      cursor: pointer;

      svg {
         color: var(--main-cl);
         font-size: 20px;
      }
   }

   .sm_options_div {
      display: none;
   }

   .light_and_dark_mode {
      border-top: 1px solid var(--sm-border-cl);
   }

   @media (max-width: 1600px) {
      .lg_side_bar_div {
         left: -300px;
      }

      .show_sm_sideBar {
         left: 0;
      }
   }

   @media (max-width: 500px) {
      width: 100%;
   }

   @media (max-width: 720px) {
      .show_sm_sideBar {
         display: none;
      }
      .lg_side_bar_div {
         left: 0;
      }
   }

   @media (max-width: 660px) {
      .sm_options_div {
         display: block;
      }
   }
`;
