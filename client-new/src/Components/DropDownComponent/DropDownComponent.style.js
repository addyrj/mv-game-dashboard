import styled from 'styled-components';

export const div = styled.div`
   .items {
      visibility: hidden;
      opacity: 0;
      transform: translateY(10);
      transition: all 0.2s ease;
   }

   .active_bar {
      visibility: visible;
      opacity: 1;
      top: 0;
      left: 0;
      transform: translateY(0);
   }

   .css-jzcd7z-MuiFormControlLabel-root .MuiFormControlLabel-label {
      display: flex;
   }

   .filter-sort {
      display: flex;
      align-items: center;
      justify-content: center;

      .label {
         white-space: nowrap;
      }

      .ui-select.is-open {
         z-index: 100;
      }

      .game_filter {
         z-index: 200 !important;
      }

      .heading_dn {
         border-bottom: 1px solid var(--smooth-gray-md-cl);
         padding: 0.3rem 0;
      }

      .select-trigger {
         position: relative;
         display: flex;
         align-items: center;
         overflow: hidden;
         height: 100%;
         cursor: pointer;
         padding: 0 1.25rem;
         user-select: none;
         border-radius: var(--border-radius);
         background-color: var(--dark-cl);
         width: 200px;
         justify-content: space-between;
      }

      .ui-select {
         position: relative;
         height: 3rem;
         width: 200px;

         .provider-name {
            flex: auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
         }

         .select-options-wrap {
            position: absolute;
            padding: 0.3125rem 0;
            width: 100%;
            left: 0;
            z-index: 400;
         }

         .select-options {
            border-radius: 5px;
            padding: 0.125rem 0.375rem;
            background-color: var(--dark-cl);
            box-shadow: 0 0 8px #00000024;
            height: auto;
            max-height: 16.25rem;
         }

         .select-option {
            display: flex;
            align-items: center;
            position: relative;
            padding: 0 0.625rem;
            font-size: 0.9rem;
            height: 2rem;
            margin: 0.25rem 0;
            border: 2px solid transparent;
            border-radius: 5px;
            cursor: pointer;
            color: var(--smooth-gray-cl);
            white-space: nowrap;
         }

         .active {
            border-color: #3bc11766;
         }

         .active:after {
            content: '';
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            top: 50%;
            margin-top: -0.25rem;
            right: 0.625rem;
            background-color: var(--main-cl);
            box-shadow: 0 0 0 0.3125rem #3bc11726;
         }
      }
   }

   @media (max-width: 700px) {
      .filterHeading {
         display: none;
      }
   }

   @media (max-width: 640px) {
      .select-trigger {
         font-size: 13px;
         width: 100% !important;
      }
   }

   @media (max-width: 575px) {
      .filter-sort .ui-select {
         width: 100%;
      }
   }
`;
