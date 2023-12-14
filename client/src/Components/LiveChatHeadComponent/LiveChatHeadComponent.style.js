import styled from 'styled-components';

export const div = styled.div`
   .head_div {
      width: 100%;
      border-bottom: 1px solid var(--light-gray-cl);
      padding: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .close_icon {
         width: 40px;
         height: 40px;
         border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
         cursor: pointer;
         background-color: var(--smooth-gray-cl);
      }
   }
`;
