import styled from 'styled-components';

export const div = styled.div`
   background-color: var(--dark-home-cl);
   padding: 2rem;

   .image-div {
      width: 150px;
      height: 150px;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   @media (max-width: 800px) {
      h5 {
         font-size: 25px;
      }
      p {
         font-size: 15px;
      }
   }
`;
