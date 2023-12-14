import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;

   .fullScreenOptions {
      position: fixed;
      z-index: 200;
      bottom: 0;
      left: 0;
      padding: 2rem;
      transition: all 0.2s ease;

      .box_div {
         cursor: pointer;

         :hover {
            svg {
               color: var(--main-cl);
            }
         }
      }
   }
`;

export const screen = styled.div`
   position: relative;
   width: 100%;
   overflow: hidden;
   padding-top: 56.5%;
   /* padding-top: 62.5%; 8:5 Aspect Ratio */

   .responsive-iframe {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border: none;
   }
`;

export const optionDiv = styled.div`
   width: 100%;
   background-color: var(--dark-home-cl);
   padding: 1rem;
   display: flex;
   align-items: center;
   justify-content: space-between;

   .box_div {
      display: flex;
      align-items: center;
      padding: 0.7rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 5px;

      svg {
         transition: all 0.2s ease;
      }

      &:hover {
         background-color: var(--light-gray-cl);
         svg {
            color: var(--main-cl);
         }
      }

      p {
         margin-left: 0.5rem;
      }
   }
`;
