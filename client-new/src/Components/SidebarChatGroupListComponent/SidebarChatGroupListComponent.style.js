import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   left: 0px;
   top: 100%;
   width: 280px;
   height: 450px;
   z-index: 100;
   background-color: var(--dark-cl);
   padding: 1rem;
   border-radius: 5px;
   overflow-x: hidden;

   .loading_svg_div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
   }

   .active_list {
      border: 1px solid var(--light-green-cl) !important;
   }

   .active_list::after {
      content: '';
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      top: 50%;
      margin-top: -0.25rem;
      right: 0.925rem;
      background-color: var(--primary-color);
      box-shadow: 0 0 0 0.3125rem #3bc11726;
   }

   .list_div {
      border: 1px solid transparent;
      padding: 0.8rem 1rem;
      cursor: pointer;
      position: relative;
      border-radius: 5px;
      margin-bottom: 0.2rem;
      transition: all 0.2s ease;

      &:hover {
         border: 1px solid var(--light-green-cl) !important;
      }

      h5 {
         font-size: 14px;
      }
   }
`;
