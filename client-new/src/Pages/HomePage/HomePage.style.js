import styled from 'styled-components';

export const div = styled.div`
   display: flex;
   width: 100%;
   height: 100vh;
   overflow-x: hidden;

   .mobile_nv_div {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      /* padding: 1rem 2rem; */
      z-index: 220;
      background: var(--dark-extra-blue-cl);
      box-shadow: 0px 0px 40px #000000;
   }

   .nav_lg {
      position: relative;
   }

   .sidebarDiv {
      width: 23%;
   }

   .mobile_nav_div_show {
      z-index: 210 !important;
      left: 0 !important;
   }

   .mobile_nav_div_hide {
      left: 0;
   }

   .mobile_nav_div {
      transition: all 0.4s ease;
   }

   .renderDiv {
      width: 100%;
      background-color: var(--dark-body-cl);
      transition: all 0.3s ease;
      overflow-x: hidden;
      position: relative;
      background-size: cover;
      background-position: center;
      /* background-image: url('/images/bg.png'); */
   }

   /* .full_view {
      width: 95%;
   } */

   .Sm_menu {
      width: 80px;

      .lg_side_bar_div {
         left: -100px;
      }

      .show_sm_sideBar {
         left: 0;
      }

      .light_and_dark_mode {
         display: none;
      }

      .logo_images_div {
         display: none;
      }

      .menu_text_elm {
         display: none;
      }
   }

   @media (max-width: 1600px) {
      .large_side {
         width: 80px;
      }

      .Sm_menu {
         width: 300px;

         .lg_div {
            padding: 1rem;
         }

         .logo_images_div {
            display: block;
         }

         .menu_text_elm {
            display: block;
         }

         .lg_side_bar_div {
            left: 0px;
         }

         .show_sm_sideBar {
            left: -100px;
         }
      }
   }

   @media (max-width: 720px) {
      .nav_lg {
         position: fixed;
         z-index: 210;
      }
      .mobile_nav_div {
         left: -100%;
         /* z-index: 200; */
         overflow: scroll;
         width: 100%;

         .large_side {
            width: 100%;
         }
      }
      .mobile_nav_div_hide {
         left: -100% !important;
      }
   }
`;
