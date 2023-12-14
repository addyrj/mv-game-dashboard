import React from 'react';
import * as styled from './SearchGameListComponent.style';
import { useNavigate } from 'react-router-dom';
import { showSearchListCmHandler } from '../../App/Features/Client/clientSlice';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SearchGameListComponent({ data }) {
   const navigation = useNavigate();
   const dispatch = useDispatch();

   const NavigationHandler = () => {
      navigation(
         `/game/${data.name.toLowerCase().replaceAll(' ', '-')}/${data?._id}`
      );
      dispatch(showSearchListCmHandler(false));
   };

   return (
      <styled.div>
         <styled.listDiv className="flex items-center space-x-4">
            <div>
               <div className="gameImage_div" onClick={NavigationHandler}>
                  <LazyLoadImage src={data?.gameImage} alt="" />
               </div>
            </div>
            <div className="content_div">
               <h5 className="text-gray-300">{data?.name}</h5>
               <p className="text-gray-400 mt-2 text-sm">{data?.description}</p>
            </div>
         </styled.listDiv>
      </styled.div>
   );
}

export default SearchGameListComponent;
