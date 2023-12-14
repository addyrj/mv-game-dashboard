import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   max-height: ${(props) => (props.active ? '500px' : '36px')};
   overflow: hidden;
   transition: all 0.3s ease;

   .content_div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 0.5rem 1rem;

      .ar-right {
         rotate: -90deg;
         transition: all 0.2s ease;
      }

      .down {
         rotate: 0deg;
      }
   }
`;

export const innerItems = styled.div`
   padding: 0 1rem;
   margin-bottom: 1rem;
`;
