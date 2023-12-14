import styled from 'styled-components';

export const div = styled.div`
   .gird_div {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
   }

   .border_div {
      border-bottom: 1px solid var(--sm-border_ne);
   }

   .icon_box {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 1.5rem;
   }

   .sponsorship_grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
   }
`;
