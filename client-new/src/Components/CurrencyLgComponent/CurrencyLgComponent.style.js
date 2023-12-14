import styled from 'styled-components';

export const div = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0.4rem 0.4rem;
   border: ${(props) =>
      props.active
         ? '2px solid var(--light-green-cl)'
         : '2px solid transparent'};
   border-radius: 2px;
   cursor: pointer;

   &:hover {
      background-color: var(--light-sl-cl);
   }
`;

export const currencyDiv = styled.div`
   margin-right: 1rem;
   .icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }
`;

export const contentDiv = styled.div`
   display: flex;
   align-items: center;
`;
