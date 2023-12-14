import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 230px;
   overflow: hidden;
   position: relative;
   transition: all 0.2s ease;

   &:hover {
      .content_div {
         opacity: 1;
         transform: translate3d(-50%, -50%, 0);
      }
   }

   .blocked {
      position: absolute;
      right: 10px;
      top: 10px;
      border: 1px solid red;
      padding: 0.3rem 1rem;

      p {
         font-size: 13px;
      }
   }

   .imgDiv {
      width: 100%;
      height: 100%;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   .content_div {
      padding: 0.5rem;
      position: absolute;
      text-align: center;
      width: 100%;
      color: white;
      opacity: 0;
      backface-visibility: hidden;
      transform: translate3d(-50%, -30%, 0);
      transition: all 250ms ease-in-out;

      svg {
         cursor: pointer;
      }
   }
`;
