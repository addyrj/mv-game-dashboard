import React from 'react';
import * as styled from './ModelHeaderComponent.style';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';

function ModelHeaderComponent({
   heading,
   back,
   backIcon,
   option,
   hideClBtn,
   cl,
}) {
   return (
      <styled.div className={`flex items-center justify-between shadow ${cl}`}>
         <div className="flex items-center cursor-pointer" onClick={back}>
            {!backIcon ? null : <IoIosArrowBack />}
            <p className="ms-1">{heading}</p>
         </div>
         <div className="flex items-center">
            {option}
            {hideClBtn ? null : <VscClose onClick={back} />}
         </div>
      </styled.div>
   );
}

export default React.memo(ModelHeaderComponent);
