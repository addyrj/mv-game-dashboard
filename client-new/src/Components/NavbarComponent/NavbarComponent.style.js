import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem 3rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
   background-color: var(--dark-bg-slate-cl);
   position: sticky;
   left: 0;
   top: 0;
   width: 100%;
   z-index: 208;

   @media (max-width: 660px) {
      padding: 1rem;
   }
`;
