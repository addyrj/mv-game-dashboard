import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   @media (max-width: 1200px) {
      h5 {
         font-size: 18px;
      }

      p {
         font-size: 12px;
      }

      .join_btn {
         font-size: 12px;
      }
   }
`;

export const imagePrv = styled.div`
   width: 100%;
   height: 250px;
   background: linear-gradient(180deg, #9bafd9 0%, #103783 100%);
   overflow: hidden;

   &:hover {
      img {
         transform: scale(1.1);
      }
   }

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.3s ease;
   }
`;

export const cmDiv = styled.div`
   padding: 0.8rem;
   position: absolute;
   bottom: 0;
   left: 0;
   z-index: 10;
   width: 100%;
   background: rgba(0, 0, 0, 0.3);
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
   backdrop-filter: blur(12.6px);
   -webkit-backdrop-filter: blur(12.6px);
`;

export const contentDiv = styled.div`
   width: 100%;
   padding: 1rem;
   background: #1a1d27;
   border-radius: 10px;
   margin-top: 0.5rem;
   margin-bottom: 1rem;
`;
