import styled from 'styled-components';

export const div = styled.div`
   .writing {
      background: #ffffff;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 24px;
      padding: 12px;

      .textarea {
         width: 100%;
         font-family: 'Inter';
         color: #585757;
         height: 50px;
         overflow-y: auto;
         appearance: none;
         border: 0;
         outline: 0;
         resize: none;
         font-size: 16px;
         line-height: 24px;
      }
      &:focus-within {
         border: 1px solid #0085ff;
         box-shadow: 0px 0px 2px 2px rgba(0, 133, 255, 0.15);
      }
      .footer {
         margin-top: 12px;
         padding-top: 12px;
         display: flex;
         align-items: center;
         justify-content: space-between;
         border-top: 1px solid #e8e8e8;
         .text-format {
            display: flex;
            align-items: center;
            gap: 12px;
         }
      }
   }

   @media (max-width: 500px) {
      .react-emoji-picker--wrapper {
         left: -20px;
         width: 300px;
      }

      .emoji-mart {
         width: 100% !important;
      }
   }
`;
