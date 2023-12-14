import React from 'react';
import * as styled from './CategoryListComponent.style';
import CategoryListInnerComponent from '../CategoryListInnerComponent/CategoryListInnerComponent';
import { useSelector } from 'react-redux';
import {
   allCategoryInfoSelector,
   getAllCategoryInfoErrorSelector,
   getAllCategoryInfoLoadingSelector,
} from './CategoryList.Selector';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';

function CategoryListComponent() {
   const allCategoryInfo = useSelector(allCategoryInfoSelector);
   const getAllCategoryInfoLoading = useSelector(
      getAllCategoryInfoLoadingSelector
   );
   const getAllCategoryInfoError = useSelector(getAllCategoryInfoErrorSelector);

   return (
      <styled.div>
         {!!getAllCategoryInfoLoading ? <SpinnerComponent /> : null}
         {!!getAllCategoryInfoError ? (
            <p className="text-sm error_cl">{getAllCategoryInfoError}</p>
         ) : null}
         {!!allCategoryInfo &&
         allCategoryInfo?.success &&
         allCategoryInfo?.categorys.length
            ? allCategoryInfo?.categorys.map((el) => (
                 <CategoryListInnerComponent key={el?._id?._id} data={el} />
              ))
            : null}
      </styled.div>
   );
}

export default React.memo(CategoryListComponent);
