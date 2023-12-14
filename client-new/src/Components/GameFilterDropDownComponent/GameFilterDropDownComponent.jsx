import React, { useEffect, useState } from 'react';
import DropDownComponent from '../DropDownComponent/DropDownComponent';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

function GameFilterDropDownComponent({ FilterDropDownAr, pageName }) {
   const [ActiveFilterTab, setActiveFilterTab] = useState('You may like');
   const navigation = useNavigate();
   const [params] = useSearchParams();
   const filter = params.get('filter');

   const activeChangeHandler = function (value, id) {
      setActiveFilterTab(value);

      if (id === 1 && ActiveFilterTab !== value) {
         return navigation(`/${pageName}?page=0`);
      }

      if (id === 1) {
         return navigation(`/${pageName}?page=0`);
      }

      navigation(`?filter=${value}&page=0`);
   };

   useEffect(() => {
      if (!!filter) {
         setActiveFilterTab(filter);
      }
   }, []);

   return (
      <div className="mb-3 mb-sm-0 me-0 me-sm-3 me-md-0">
         <DropDownComponent
            heading={'Sort By'}
            active={ActiveFilterTab}
            filterName={'game_filter'}
         >
            <div className="select-options-wrap game_af">
               <div className="ui-scrollview select-options len-5">
                  {FilterDropDownAr.map((el) => (
                     <div
                        key={el?.id}
                        className={`select-option ${
                           ActiveFilterTab === el?.name ? 'active' : ' '
                        }`}
                        onClick={() => activeChangeHandler(el?.name, el.id)}
                     >
                        {el?.name}
                     </div>
                  ))}
               </div>
            </div>
         </DropDownComponent>
      </div>
   );
}

export default GameFilterDropDownComponent;
