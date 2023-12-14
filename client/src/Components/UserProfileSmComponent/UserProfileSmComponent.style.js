import styled from 'styled-components';

export const div = styled.div`
   .active_usr {
      background-color: var(--smooth-gray-md-cl);
   }

   .profile_div {
      cursor: pointer;
      padding: 0.5rem 0.8rem;
      transition: all 0.2s ease;
      width: 100%;
      border-radius: 0%;
      overflow: auto;
      height: auto;

      &:hover {
         background-color: var(--light-gray-cl);
      }
   }

   .profile {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
`;
