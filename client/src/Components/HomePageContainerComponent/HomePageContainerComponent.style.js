import styled from 'styled-components';

export const div = styled.div`
   .banner_grid_div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
   }

   .grid_div {
      display: grid;
      /* grid-template-columns: repeat(2, 1fr); */
   }

   .light {
      background-color: var(--main-cl);
      h5 {
         color: var(--dark-cl);
      }

      p {
         color: var(--sm-border-cl);
      }

      .icon_menu {
         background-color: var(--smooth-gray-sl-cl);
      }
   }

   .dark {
      background-color: var(--dark-blue-cl);
      border: 1px solid var(--smooth-gray-sl-cl);

      h5 {
         color: var(--smooth-gray-lg-cl);
      }

      p {
         color: var(--light-blue-cl);
      }

      .icon_menu {
         background-color: var(--smooth-gray-sl-cl);
      }
   }
`;
