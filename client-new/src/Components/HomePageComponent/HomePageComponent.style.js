import styled from 'styled-components';

export const div = styled.div`
   padding: 0 2rem;
   position: relative;

   .search_div {
      position: relative;
   }

   @media (max-width: 800px) {
      padding: 0 1rem;
   }
`;

export const overLayDiv = styled.div`
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
`;

export const ratedGamesDiv = styled.div`
   .slick-prev,
   .slick-next {
      top: -31%;
   }

   .slick-prev {
      left: 89%;
   }
   .slick-next {
      right: 6%;
   }
`;
