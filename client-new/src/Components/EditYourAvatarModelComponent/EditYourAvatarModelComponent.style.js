import styled from 'styled-components';

export const imagePrevDiv = styled.div`
   width: 100%;
   height: 300px;
   position: relative;
`;

export const imageControll = styled.div`
   .inner_cn_div {
      width: 100%;
      background-color: var(--smooth-gray-sl-cl);
      display: flex;
      align-items: center;

      .iconDiv {
         width: 80px;
         height: 60px;
         display: flex;
         justify-content: center;
         align-items: center;
         cursor: pointer;
         transition: all 0.2s ease;

         &:hover {
            background-color: var(--dark-blue-cl);
         }

         svg {
            font-size: 20px;
            color: var(--gray);
         }
      }
   }
`;

export const slideDiv = styled.div`
   width: 80% !important;
   padding: 0 1rem;

   &:hover {
      background-color: transparent !important;
   }

   input[type='range'] {
      background-color: transparent;
      height: 29px;
      -webkit-appearance: none;
      margin: 10px 0;
      width: 100%;
   }
   input[type='range']:focus {
      outline: none;
   }
   input[type='range']::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 2px #000000;
      background: #a9a59d;
      border-radius: 0px;
      border: 0px solid #000000;
   }
   input[type='range']::-webkit-slider-thumb {
      box-shadow: 0px 0px 1px #000000;
      border: 0px solid #000000;
      height: 23px;
      width: 31px;
      border-radius: 5px;
      background: #ffffff;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -10.5px;
   }
   input[type='range']:focus::-webkit-slider-runnable-track {
      background: #a9a59d;
   }
   input[type='range']::-moz-range-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 2px #000000;
      background: #a9a59d;
      border-radius: 0px;
      border: 0px solid #000000;
   }
   input[type='range']::-moz-range-thumb {
      box-shadow: 0px 0px 1px #000000;
      border: 0px solid #000000;
      height: 23px;
      width: 31px;
      border-radius: 5px;
      background: #ffffff;
      cursor: pointer;
   }
   input[type='range']::-ms-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      animate: 0.2s;
      background: transparent;
      border-color: transparent;
      color: transparent;
   }
   input[type='range']::-ms-fill-lower {
      background: #a9a59d;
      border: 0px solid #000000;
      border-radius: 0px;
      box-shadow: 0px 0px 2px #000000;
   }
   input[type='range']::-ms-fill-upper {
      background: #a9a59d;
      border: 0px solid #000000;
      border-radius: 0px;
      box-shadow: 0px 0px 2px #000000;
   }
   input[type='range']::-ms-thumb {
      margin-top: 1px;
      box-shadow: 0px 0px 1px #000000;
      border: 0px solid #000000;
      height: 23px;
      width: 31px;
      border-radius: 5px;
      background: #ffffff;
      cursor: pointer;
   }
   input[type='range']:focus::-ms-fill-lower {
      background: #a9a59d;
   }
   input[type='range']:focus::-ms-fill-upper {
      background: #a9a59d;
   }
`;

export const avatarDiv = styled.div`
   .imageDiv {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
`;

export const updateCustomImageDiv = styled.div`
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   overflow: hidden;
   z-index: 200;
   border-radius: 50%;
   width: 35px;
   height: 35px;

   ._input_div {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      input {
         width: 100%;
         height: 100%;
         /* visibility: hidden; */
         opacity: 0;
         position: absolute;
         top: 0;
         left: 0;
      }

      svg {
         fill: var(--main-cl);
         font-size: 25px;
      }
   }
`;
