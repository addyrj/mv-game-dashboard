import styled from 'styled-components';

export const div = styled.div`
   .sp_div {
      width: 100%;
      padding: 0.3rem 1rem;
      cursor: pointer;
      border-radius: 5px;

      h5 {
         margin-bottom: -7px;
      }

      span {
         font-size: 13px;
      }
      .icons_div {
         width: 30px;
      }
   }

   .daily-spin {
      background: linear-gradient(
            52.78deg,
            rgba(175, 13, 132, 0.511772) -2.57%,
            rgba(175, 13, 132, 0.04) 54.35%
         ),
         rgba(216, 216, 216, 0.05);
   }

   .task {
      background: linear-gradient(
            55.84deg,
            rgba(109, 43, 255, 0.480402) 4.54%,
            rgba(109, 43, 255, 0.04) 58.79%,
            rgba(109, 43, 255, 0.04) 58.79%
         ),
         rgba(216, 216, 216, 0.05);
   }
`;
