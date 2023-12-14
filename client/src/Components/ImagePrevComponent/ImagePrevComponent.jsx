import React from 'react';
import * as styled from './ImagePrevComponent.style';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { useDispatch } from 'react-redux';
import { deleteSingleAvatar } from '../../App/Features/Admin/adminActions';

function ImagePrevComponent({ data }) {
   const dispatch = useDispatch();

   const deleteHandler = function () {
      dispatch(deleteSingleAvatar({ avatarId: data?._id }));
   };

   return (
      <styled.div>
         {data?.default ? null : (
            <div className="close_btn shadow" onClick={deleteHandler}>
               <VscClose />
            </div>
         )}
         <img src={data?.url} alt="" />
      </styled.div>
   );
}

export default ImagePrevComponent;
