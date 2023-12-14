import styled from 'styled-components';

export const div = styled.div`
   background-color: var(--dark-bg-slate-cl);
`;

export const optionsDiv = styled.div`
   .drop_down_div {
      .hover_div {
         visibility: hidden;
         opacity: 0;
      }

      &:hover {
         .hover_div {
            visibility: visible;
            opacity: 1;
         }
      }
   }

   .icons_div {
      svg {
         color: var(--smooth-gray-cl);
         font-size: 25px;
         transition: all 0.3s ease;
      }
   }

   &:hover {
      .icons_div svg {
         rotate: 90deg;
      }
   }

   .options {
      svg {
         font-size: 23px;
         color: var(--smooth-gray-cl);
         cursor: pointer;
      }

      .cup_div {
         width: 20px;
         height: auto;

         img {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }
   }
`;
