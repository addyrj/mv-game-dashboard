import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: relative;

   img {
      display: block;
      max-height: 100%;
      max-width: 100%;
      margin: 0;
      height: auto;
   }

   p {
      margin: 0 0 1em;
   }

   .game-cards {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      gap: 1.5rem 1rem;
      max-width: 100%;
   }

   .game-card {
      position: relative;
      z-index: 0;
      display: flex;
      flex-flow: column nowrap;
   }
   .game-card::before {
      content: '';
      aspect-ratio: 0.7;
      width: 100%;
      margin-bottom: 1.75rem;
   }

   .game-card__front {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
      border-radius: 0.5rem 0.5rem 0 0;
   }

   .game-card__header {
      display: flex;
      height: 100%;
      pointer-events: auto;
      flex-flow: column nowrap;
      transition: transform 250ms ease;
   }

   .game-card__cover {
      position: relative;
      aspect-ratio: 0.7;
      background: #37474f;
      border-radius: 0 0 0.5rem 0.5rem;
      width: 100%;
      overflow: hidden;
   }

   .game-card__cover > img,
   .game-card__image-placeholder {
      aspect-ratio: inherit;
      object-fit: cover;
      height: 100%;
      width: 100%;
      height: auto;
      transition: transform 250ms ease;
   }

   .game-card__image-placeholder {
      display: block;
      background: #7c4dff;
      background-size: cover;
      background-repeat: no-repeat;
   }

   .game-card__image-placeholder.two {
      background-image: linear-gradient(
            -60deg,
            rgba(0, 0, 0, 0.15) 60%,
            transparent 60%
         ),
         linear-gradient(-15deg, rgba(0, 0, 0, 0.15) 48%, transparent 48%),
         linear-gradient(45deg, rgba(0, 0, 0, 0.15) 55%, transparent 55%),
         linear-gradient(-35deg, rgba(0, 0, 0, 0.15) 15%, transparent 15%),
         linear-gradient(137.42deg, #aa00ff 0%, #7c4dff 50.43%, #304ffe 100%);
   }

   .game-card__image-placeholder.three {
      background-image: linear-gradient(
            -75deg,
            rgba(0, 0, 0, 0.15) 60%,
            transparent 60%
         ),
         linear-gradient(-25deg, rgba(0, 0, 0, 0.15) 53%, transparent 53%),
         linear-gradient(30deg, rgba(0, 0, 0, 0.15) 60%, transparent 60%),
         linear-gradient(-55deg, rgba(0, 0, 0, 0.15) 15%, transparent 15%),
         linear-gradient(137.42deg, #aa00ff 0%, #7c4dff 50.43%, #304ffe 100%);
   }

   .game-card__title {
      flex: 0 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: auto;
      font-size: 1rem;
      line-height: 1.25;
      transition: padding 250ms ease;
   }

   .game-card__touch-target {
      display: none;
      position: absolute;
      inset: 0;
      width: 100%;
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;
      z-index: 1;
   }
   @media (hover: none) and (pointer: coarse) {
      .game-card__touch-target {
         display: block;
      }
   }

   .game-card__cover-badge {
      position: absolute;
      left: 0.5rem;
      bottom: 0.5rem;
      padding: 0 0.5em;
      line-height: 1.5rem;
      text-align: center;
      border-radius: 0.25rem;
      background: #37474f;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      transition: opacity 250ms 25ms ease, transform 250ms 25ms ease;
   }
   .game-card__cover-badge.new {
      background: #4527a0;
   }
   .game-card__cover-badge.update {
      background: #1565c0;
      width: 1.5rem;
      padding: 0;
   }

   .game-card__back {
      position: absolute;
      inset: 0;
      display: flex;
      flex-flow: column nowrap;
      border-radius: 0.5rem;
      margin-bottom: 1.75rem;
      background: #191f2d;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15),
         0 10px 12px rgba(0, 0, 0, 0.15);
      transition: margin 250ms ease;
   }

   .game-card__content {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-end;
      padding: 0.5rem;
      height: 6rem;
      margin-top: auto;
      opacity: 0.1;
      transform: scale(0.6);
      transition: transform 250ms ease, opacity 250ms ease;
   }

   .game-card__metadata {
      font-size: 0.875rem;
      color: #90a4ae;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   .game-card__buttons {
      display: flex;
      gap: 0.25rem;
      margin-top: auto;
      align-items: center;
      justify-content: center;

      svg {
         width: 100%;
      }
   }
   * + .game-card__buttons {
      padding-top: 0.5rem;
   }

   .game-card__button {
      appearance: none;
      flex: 0;
      border: none;
      height: 2.5rem;
      min-width: 2.5rem;
      line-height: 2.5rem;
      padding: 0 0.5em;
      text-align: none;
      overflow: hidden;
      background: #253049;
      color: #fff;
      border-radius: 0.3rem;
      text-align: center;
      cursor: pointer;
      transition: background 200ms;
   }
   .game-card__button:focus-visible {
      outline: 0.25rem solid #303e5f;
      outline-offset: -0.125rem;
   }
   .game-card__button:active,
   .game-card__button:hover {
      background: #303e5f;
   }
   .game-card__button.-download,
   .game-card__button.-play,
   .game-card__button.-update {
      flex: 1 1 auto;
   }
   .game-card__button.-play {
      background: #009688;
      outline-color: #4db6ac;
   }
   .game-card__button.-play:active,
   .game-card__button.-play:hover {
      background: #26a69a;
   }
   .game-card__button.-update {
      background: #1565c0;
      outline-color: #1e88e5;
   }
   .game-card__button.-update:active,
   .game-card__button.-update:hover {
      background: #1976d2;
   }
   .game-card__button.-download {
      background: #4527a0;
      outline-color: #ece9f6;
   }
   .game-card__button.-download:hover {
      background: #512da8;
   }

   .game-card.expanded .game-card__header,
   .game-card:hover .game-card__header,
   .game-card:focus .game-card__header,
   .game-card:focus-within .game-card__header {
      transform: translatey(-6rem);
      transition-duration: 300ms;
      transition-delay: 100ms;
   }
   .game-card.expanded .game-card__cover > img,
   .game-card.expanded .game-card__image-placeholder,
   .game-card:hover .game-card__cover > img,
   .game-card:hover .game-card__image-placeholder,
   .game-card:focus .game-card__cover > img,
   .game-card:focus .game-card__image-placeholder,
   .game-card:focus-within .game-card__cover > img,
   .game-card:focus-within .game-card__image-placeholder {
      transition-duration: 300ms;
      transform: translateY(3rem);
      transition-delay: 100ms;
   }
   .game-card.expanded .game-card__title,
   .game-card:hover .game-card__title,
   .game-card:focus .game-card__title,
   .game-card:focus-within .game-card__title {
      transition-duration: 300ms;
      padding-inline: 0.5rem;
      transition-delay: 100ms;
   }
   .game-card.expanded .game-card__cover-badge,
   .game-card:hover .game-card__cover-badge,
   .game-card:focus .game-card__cover-badge,
   .game-card:focus-within .game-card__cover-badge {
      transition-duration: 150ms, 150ms;
      transition-delay: 100ms, 100ms;
      opacity: 0;
      transform: translateY(100%);
   }
   .game-card.expanded .game-card__touch-target,
   .game-card:hover .game-card__touch-target,
   .game-card:focus .game-card__touch-target,
   .game-card:focus-within .game-card__touch-target {
      display: none;
   }
   .game-card.expanded .game-card__back,
   .game-card:hover .game-card__back,
   .game-card:focus .game-card__back,
   .game-card:focus-within .game-card__back {
      margin-bottom: 0;
      transition-duration: 300ms;
      transition-delay: 100ms;
   }
   .game-card.expanded .game-card__content,
   .game-card:hover .game-card__content,
   .game-card:focus .game-card__content,
   .game-card:focus-within .game-card__content {
      opacity: 1;
      transform: scale(1);
      transition-duration: 300ms;
      transition-delay: 50ms;
   }
`;
