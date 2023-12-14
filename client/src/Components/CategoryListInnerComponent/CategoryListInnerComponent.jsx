import React, { useRef } from 'react';
import * as styled from './CategoryListInnerComponent.style';
import { BiLayer } from '@react-icons/all-files/bi/BiLayer';
import { MdKeyboardArrowDown } from '@react-icons/all-files/md/MdKeyboardArrowDown';
import { VscEdit } from '@react-icons/all-files/vsc/VscEdit';
import { deleteSingleGameCategory, getSinglegameCategory } from '../../App/Features/Games/GameActions';
import { useDispatch } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { MdDeleteForever } from '@react-icons/all-files/md/MdDeleteForever';
import { Popconfirm } from 'antd';
import Badge from '@mui/material/Badge';
import { CgGames } from '@react-icons/all-files/cg/CgGames';

function CategoryListInnerComponent({ data }) {
   const {
      userRoles: { isAdmin, isSupport },
   } = useRoles();
   const dispatch = useDispatch();
   const DropDownRef = useRef(null);
   const ArRef = useRef(null);

   const EditHandler = function () {
      if (isAdmin) {
         dispatch(getSinglegameCategory({ gameCategoryId: data?._id?._id }));
      }
   };

   const Confirm = function () {
      dispatch(
         deleteSingleGameCategory({
            gameCategoryId: data?._id?._id || data?._id,
         })
      );
   };

   const ShowHandler = function () {
      DropDownRef.current.classList.toggle('Show_drop_down');
      ArRef.current.classList.toggle('Drop');
   };

   return (
      <styled.div ref={DropDownRef}>
         <div className="flex items-center justify-between ic_box" onClick={ShowHandler}>
            <div className="flex items-center space-x-4">
               <BiLayer className="text-gray-300" />
               <styled.iconBoxDiv className="hover:bg-gray-900" onClick={EditHandler}>
                  <VscEdit className="text-gray-300" />
               </styled.iconBoxDiv>
               {/* <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this category?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={Confirm}
               >
                  <styled.iconBoxDiv className="hover:bg-gray-300">
                     <MdDeleteForever className="text-red-600" />
                  </styled.iconBoxDiv>
               </Popconfirm> */}
               <p className="text-gray-300">{data?._id?.name || data?.name}</p>
               <div className={`shadow status ${data?._id?.status || data?.status}`}>
                  {data?._id?.status || data?.status}
               </div>
               <div>
                  <Badge badgeContent={data?._id?.totalsGames} color="primary">
                     <CgGames className="text-green-300" />
                  </Badge>
               </div>
            </div>
            <div ref={ArRef} className="ar">
               <MdKeyboardArrowDown className="text-gray-300" />
            </div>
         </div>
         {data?.games && data?.games.length ? (
            <styled.subMenu>
               <div className="games_list">
                  {data?.games.map((el) =>
                     el?._id ? (
                        <p className="text-gray-400" key={el?._id}>
                           {el?.name}
                        </p>
                     ) : null
                  )}
               </div>
            </styled.subMenu>
         ) : null}
      </styled.div>
   );
}

export default CategoryListInnerComponent;
