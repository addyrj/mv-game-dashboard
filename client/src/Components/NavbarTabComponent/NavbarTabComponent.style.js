import styled from 'styled-components';

export const prDiv = styled.div`
   .notification {
      width: 100%;

      .drop_down_div {
         display: flex;
         justify-content: center;
         line-height: 3.2rem;
         background-image: none;
         border-bottom: 2px solid transparent;
         border-bottom: 1px solid var(--light-gray-cl);

         p {
            font-size: 12px;
            color: var(--smooth-gray-cl);
         }

         svg {
            color: var(--smooth-gray-cl);
         }
      }

      .activeTab {
         background-image: linear-gradient(
            to top,
            rgba(59, 193, 23, 0.15),
            rgba(59, 193, 23, 0) 60%
         );
         border-bottom: 2px solid var(--primary-color);

         p {
            color: var(--main-cl);
         }

         svg {
            color: var(--light-yellow-cl);
         }
      }
   }
`;

export const div = styled.div`
   .group_drop_down_parent_div {
      position: relative;
   }

   .drop_down_div {
      padding: 0 1rem;
      line-height: 3.875rem;
      background-image: linear-gradient(
         to top,
         rgba(59, 193, 23, 0.15),
         rgba(59, 193, 23, 0) 50%
      );
      border-bottom: 2px solid var(--primary-color);
      width: 100%;

      p {
         color: var(--main-cl);
         font-weight: 600;
         font-size: 15px;
      }
   }

   .drop_parent_div {
      cursor: pointer;

      .icons_div {
         svg {
            color: var(--smooth-gray-cl);
            font-size: 25px;
            transition: all 0.3s ease;
         }
      }

      &:hover {
         .icons_div svg {
            rotate: 90deg;
         }
      }
   }
`;
