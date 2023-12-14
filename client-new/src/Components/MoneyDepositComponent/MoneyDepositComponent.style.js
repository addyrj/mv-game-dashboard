import styled from 'styled-components';

export const div = styled.div`
   .tab_div {
      display: flex;
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 500px;

      .crpto_qr_div,
      .fiat_div {
         position: absolute;
         top: 0;
         transition: all 0.4s ease;
      }

      .crpto_qr_div {
         left: 0;
      }

      .fiat_div {
         left: 140%;
         width: 100%;
      }

      .active_tab {
         left: 0;
      }

      .non_active_tab {
         left: -150%;
      }
   }
`;
