import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 0.5rem;
   border-radius: 5px;
   display: ${(props) => (props?.sty ? 'block' : 'flex')};

   .bars_div {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      /* border-radius: 50%; */
      cursor: pointer;
      background-color: var(--sm-border_ne);
   }

   @media (max-width: 767px) {
      display: block;
   }
`;

export const gameImageDiv = styled.div`
   width: ${(props) => (props?.sty ? '100%' : '400px')};
   height: 250px;
   border-radius: 10px;
   overflow: hidden;
   cursor: pointer;

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   @media (max-width: 439px) {
      width: 100%;
      height: 200px;
   }
`;

export const contentDiv = styled.div`
   .providerImage {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
`;
