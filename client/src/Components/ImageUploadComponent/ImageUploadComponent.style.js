import styled from 'styled-components';

export const div = styled.div`
   border: 1px solid red;
   padding: 1rem;
   border-radius: 9px;
   border: 1px dashed var(--smooth-gray-cl);
   position: relative;
   overflow: hidden;

   input {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      opacity: 0;
   }

   .icon_div {
      svg {
         font-size: 30px;
         color: var(--smooth-gray-cl);
      }
   }

   .prevImage {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
`;
