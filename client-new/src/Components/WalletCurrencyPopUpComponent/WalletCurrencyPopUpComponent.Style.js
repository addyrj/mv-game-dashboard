import styled from 'styled-components';

export const MainDiv = styled.div`
   width: 400px;
   top: 67px;
   padding: 20px 0;
   left: -14rem;
   position: absolute;
   background-color: var(--model-bg-cl);
   user-select: none;

   .tabtopParent {
      padding: 20px;
      width: 100%;
      height: 500px;
      overflow-x: hidden;
   }

   @media (max-width: 520px) {
      width: 100%;
      left: 0;
   }
`;
export const Div = styled.div`
   width: 100%;
   color: #fff;
   padding: 0px 10px;
   display: flex;

   .inputsearchtoggle {
      height: 40px;
   }
`;

export const buttonDiv = styled.div`
   display: flex;
   align-items: center;
`;

export const currencyDiv = styled.div`
   margin-top: 1rem;
`;
