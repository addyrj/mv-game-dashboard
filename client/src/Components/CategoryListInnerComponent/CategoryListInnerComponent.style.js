import styled from 'styled-components';

export const div = styled.div`
   padding: 0.5rem 1rem;
   border-radius: 5px;
   transition: all 0.3s ease;
   max-height: 52px;
   overflow: hidden;

   .Drop {
      rotate: 0deg !important;
   }

   .ar {
      rotate: -90deg;
      transition: all 0.2s ease;
   }

   .status {
      padding: 0.2rem 1rem;
      border-radius: 5px;
      font-size: 14px;
      transform: scale(0.8);
   }

   .ic_box {
      padding: 0.3rem 1rem;
      border-radius: 5px;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
         background-color: var(--smooth-gray-sl-cl);
      }
   }
`;

export const iconBoxDiv = styled.div`
   padding: 0.3rem 0.4rem;
   border-radius: 5px;
   transition: all 0.2s ease;
`;

export const subMenu = styled.div`
   padding: 0.2rem 2rem;

   p {
      font-size: 14px;
      margin-top: 0.5rem;
   }
`;
