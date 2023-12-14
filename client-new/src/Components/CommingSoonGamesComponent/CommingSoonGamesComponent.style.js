import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 300px;
   position: relative;
   padding: 1rem 2rem;
`;

export const gamePrevDiv = styled.div`
   width: 100%;
   height: 100%;
   border-radius: 10px;
   overflow: hidden;

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
`;

export const commingSoonDiv = styled.div`
   position: absolute;
   left: -14px;

   @media (max-width: 1000px) {
      left: 5px;
      width: 104px;
   }
`;
