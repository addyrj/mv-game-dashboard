import styled from 'styled-components';

export const div = styled.div`
   width: 100px;
   height: 100px;
   position: relative;

   .close_btn {
      position: absolute;
      top: -10px;
      right: 2px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--main-cl);
      display: flex;
      align-items: center;
      justify-content: center;
   }

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
`;
