import styled from 'styled-components';

export const div = styled.div`
   .Casino_icon {
      filter: drop-shadow(0px 4px 24px #00ffbf);
   }

   .red_pepe_logo {
      display: none;
      img {
         width: 80px;
         height: auto;
      }
   }

   .over_lay_div {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 300;
   }

   .toggle_bar_div {
      width: 25px;
      height: 25px;
      padding: 0.3rem;
      cursor: pointer;
      margin-right: 1rem;
      display: none;

      img {
         width: 100%;
         height: 100%;
      }
   }

   .Sports_icon {
      filter: drop-shadow(0px 4px 24px #ff5252);
   }

   img {
      transform: scale(1.2);
   }

   .hover_div {
      padding: 0.5rem 0.7rem;
      cursor: pointer;
      border-radius: 3px;

      p {
         font-size: 14px;
         font-weight: 500;
      }

      &:hover {
         background-color: var(--smooth-gray-cl);

         .cards {
            color: var(--light-green-cl);
         }

         .sports {
            color: var(--light-yellow-cl);
         }

         p {
            color: var(--main-cl);
         }
      }
   }

   .nav_parent_div {
      position: relative;
   }

   .vip_plan_pop {
      position: absolute;
      top: 50px;
      left: 0;
      background-color: var(--smooth-lg-sl-cl);
      border-radius: 5px;
      padding: 0.6rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      z-index: 400;
   }

   .vip {
      p {
         color: var(--yellow-cl);
         font-weight: 600;
      }
   }

   @media (max-width: 1600px) {
      .nav_parent_div {
         p {
            font-size: 14px;
         }
      }
      .toggle_bar_div {
         display: block;
      }
   }

   @media (max-width: 1100px) {
      .nav_parent_div {
         p {
            display: none;
         }
      }
   }

   @media (max-width: 660px) {
      .nav_parent_div {
         display: none;
      }
      .red_pepe_logo {
         display: block;
      }
   }
`;
