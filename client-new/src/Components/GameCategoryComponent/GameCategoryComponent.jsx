import React from 'react';
import * as styled from './GameCategoryComponent.style';
import {
   gamesEnableCategorySelector,
   gamesEnableCategoryErrorSelector,
} from './GameCategory.Selector';
import { useSelector } from 'react-redux';
import DropDownMenuComponent from '../DropDownMenuComponent/DropDownMenuComponent';

function GameCategoryComponent() {
   const gamesEnableCategory = useSelector(gamesEnableCategorySelector);
   const gamesEnableCategoryError = useSelector(
      gamesEnableCategoryErrorSelector
   );

   if (
      !!gamesEnableCategory &&
      gamesEnableCategory?.success & !gamesEnableCategory?.gameCategories.length
   ) {
      return null;
   }

   return (
      <styled.div>
         {!!gamesEnableCategoryError && (
            <p className="error_cl text-sm">{gamesEnableCategoryError}</p>
         )}
         {!!gamesEnableCategory &&
            gamesEnableCategory?.success &&
            gamesEnableCategory?.gameCategories &&
            gamesEnableCategory?.gameCategories.map((el, index) => (
               <DropDownMenuComponent data={el} key={index} />
            ))}
      </styled.div>
   );
}

export default GameCategoryComponent;
