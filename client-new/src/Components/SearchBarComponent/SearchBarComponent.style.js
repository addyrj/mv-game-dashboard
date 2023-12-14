import styled from 'styled-components';

export const div = styled.div`
   /* padding: 0.5rem; */
   border-bottom: 1px solid var(--light-gray-cl);
   /* position: relative; */
   z-index: 100;

   .search_bar {
      display: flex;
      width: 100%;
      height: 45px;
      background-color: var(--model-bg-cl);
      transition: all 0.1s ease;

      .icon_div {
         width: 50px;
         display: flex;
         justify-content: center;
         align-items: center;

         svg {
            color: var(--smooth-gray-cl);
         }
      }

      input {
         width: 100%;
         height: 100%;
         background-color: transparent;
         outline: none;
         color: var(--main-cl);
         font-size: 13px;
      }
   }

   .in_ {
      background-color: var(--smooth-gray-sl-cl);
   }

   .activeSearchBar {
      border: 1px solid var(--primary-color);
   }
`;
