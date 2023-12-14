import styled from 'styled-components';

export const div = styled.div`
   height: 100%;
   overflow-x: hidden;
   position: relative;
   background-color: var(--dark-home-body-cl);

   .loading {
      position: absolute;
      top: 50%;
      left: 50%;
   }
`;

export const loadPrev = styled.div`
   cursor: pointer;
   padding: 0.2rem 0.8rem;
   width: fit-content;
   margin: auto;
   border-radius: 30px;

   p {
      font-size: 10px;
      color: var(--main-cl);
   }
`;
