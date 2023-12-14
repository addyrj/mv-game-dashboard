import React, { useState, useContext, useEffect } from 'react';
import * as styled from './SidebarChatGroupListComponent.style';
import { useSelector } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { useNavigate } from 'react-router';
import { SocketContext } from '../../Context/SocketIoContext';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGroupChats } from '../../App/Features/Group/groupActions';
import { DefaultGroupId } from '../../helper/helper';
import {
   groupsSelector,
   fetchGroupsLoadingSelector,
   fetchGroupsErrorSelector,
} from './SideBarChat.Selector';

function SidebarChatGroupListComponent({ event }) {
   const [ActiveList, setActiveList] = useState('63c917686086807eb2e80d0a');

   const groups = useSelector(groupsSelector);
   const fetchGroupsLoading = useSelector(fetchGroupsLoadingSelector);
   const fetchGroupsError = useSelector(fetchGroupsErrorSelector);

   const navigation = useNavigate();
   const socket = useContext(SocketContext);
   const [search] = useSearchParams();
   const prev_id = search.get('groupId');
   const dispatch = useDispatch();

   const ActiveHandler = function (id) {
      if (ActiveList !== id) {
         setActiveList(id);
         socket.emit('_leave_group', { groupId: prev_id });
         navigation(`?groupId=${id}`);
         socket.emit('_join_group_room', { groupId: id });
         dispatch(getGroupChats({ groupId: id, page: 0 }));
      }
   };

   useEffect(() => {
      if (!prev_id) {
         socket.emit('_join_group_room', { groupId: DefaultGroupId });
      }

      if (prev_id) {
         setActiveList(prev_id);
      }
   }, []);

   return (
      <styled.div className="shadow">
         {!!fetchGroupsError ? (
            <p className="text-red-500 text-sm">{fetchGroupsError}</p>
         ) : null}
         {fetchGroupsLoading ? (
            <div className="loading_svg_div">
               <SpennerComponent center={true} />
            </div>
         ) : null}
         {!!groups && groups?.success && groups?.groups
            ? groups.groups.map((el) => (
                 <div
                    className={
                       ActiveList === el._id
                          ? 'list_div active_list'
                          : 'list_div'
                    }
                    key={el._id}
                    onClick={() => {
                       ActiveHandler(el._id);
                       event(el.groupName);
                    }}
                 >
                    <h5 className="text-gray-200 font-bold">{el.groupName}</h5>
                 </div>
              ))
            : null}
      </styled.div>
   );
}

export default React.memo(SidebarChatGroupListComponent);
