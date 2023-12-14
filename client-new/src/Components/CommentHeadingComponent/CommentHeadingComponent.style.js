import styled from 'styled-components';

export const div = styled.div`
   .block-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      .title {
         display: flex;
         align-items: flex-start;

         .tag {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 4px;
            background: #f7f7f7;
            color: #1c1c1c;
            text-align: center;
            padding: 0 4px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 10px;
            line-height: 16px;
            border: 1px solid #e8e8e8;
            border-radius: 96px;
         }
      }
   }

   .group-radio {
      position: relative;
      display: flex;
      user-select: none;
      align-items: stretch;

      .divider {
         width: 1px;
         background: #e8e8e8;
      }
   }
`;
