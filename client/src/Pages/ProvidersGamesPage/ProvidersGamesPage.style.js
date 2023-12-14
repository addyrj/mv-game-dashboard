import styled from 'styled-components';

export const div = styled.div`
   position: relative;

   .user_profile_bn_div {
      height: 270px;
      position: absolute;
      top: 0%;
      left: 0;
      width: 100%;
      background-position: center;
      background-size: cover;
      background-image: url(https://images.unsplash.com/photo-1482855549413-2a6c9b1955a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80);
   }
`;

export const resDiv = styled.div`
   display: grid;
   grid-template-columns: repeat(5, 1fr);
`;
