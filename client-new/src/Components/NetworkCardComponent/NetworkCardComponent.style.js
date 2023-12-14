import styled from 'styled-components';

export const div = styled.div`
   border: ${(props) =>
      props?.active
         ? '1px solid var(--primary-color)'
         : '1px solid transparent'};
   padding: 0.8rem 2.5rem;
   width: max-content;
   border-radius: 2px;
   cursor: pointer;
   background-color: var(--smooth-gray-sl-cl);

   p {
      font-size: 15px;
      color: var(--main-cl);
      font-weight: 600;
   }
`;
