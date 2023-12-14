import React, { useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import * as styled from './GameCategoryPage.style';
import CategoryListComponent from '../../Components/CategoryListComponent/CategoryListComponent';
import PostNewCategoryComponent from '../../Components/PostNewCategoryComponent/PostNewCategoryComponent';
import { useDispatch } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { getAllProductsCategory } from '../../App/Features/Games/GameActions';
import { useSearchParams } from 'react-router-dom';

function GameCategoryPage() {
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [params] = useSearchParams();
   const page = params.get('page');

   useEffect(() => {
      if (isAdmin && page) {
         dispatch(getAllProductsCategory({ page }));
      }
   }, [isAdmin]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent pageName={'Game Category'} subHeading={'All Games Category'} />
            <styled.categoryDiv className="mt-5 flex">
               <div className="w-5/12">
                  <PostNewCategoryComponent />
               </div>
               <div className="w-7/12 p-2">
                  <CategoryListComponent />
               </div>
            </styled.categoryDiv>
         </div>
      </styled.div>
   );
}

export default GameCategoryPage;
