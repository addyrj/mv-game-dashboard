import React, { useCallback, useRef, useState } from 'react';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import * as styled from './SearchBarComponent.style';
import _debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function SearchBarComponent({ sty, fetchFn, pageUrl, showSearchListCm, cl }) {
   const [value, setValue] = useState('');
   const SearchRef = useRef(null);
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const FoucesHandler = function () {
      SearchRef.current.style.border = '1px solid var(--primary-color)';
   };

   const BlurHandler = function () {
      SearchRef.current.style.border = '1px solid transparent';
   };

   const debounceFn = useCallback(_debounce(handleDebounceFn, 300), []);

   const EnterHandler = function (event) {
      if (event.keyCode === 13) {
         navigation(`${pageUrl}?q=${value}`);
         dispatch(showSearchListCm(false));
      }
   };

   function handleDebounceFn(inputValue) {
      if (!!fetchFn && !!inputValue) {
         dispatch(fetchFn({ inputValue }));

         if (showSearchListCm && inputValue.length > 1) {
            dispatch(showSearchListCm(true));
         } else {
            dispatch(showSearchListCm(false));
         }
      }
   }

   function handleChange(event) {
      setValue(event.target.value);
      debounceFn(event.target.value);
   }

   return (
      <styled.div style={sty}>
         <div ref={SearchRef} className={`search_bar ${cl}`}>
            <div className="icon_div">
               <BsSearch />
            </div>
            <input
               onKeyDown={EnterHandler}
               value={value}
               onChange={handleChange}
               type="text"
               placeholder="Search Name"
               onFocus={FoucesHandler}
               onBlur={BlurHandler}
            />
         </div>
      </styled.div>
   );
}

export default React.memo(SearchBarComponent);
