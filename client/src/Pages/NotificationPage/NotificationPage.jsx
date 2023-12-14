import React, { useState, useEffect, useContext } from 'react';
import * as styled from './NotificationPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllSystemNotification,
   deleteSingleNotification,
} from '../../App/Features/Notification/notificationActions';
import useRoles from '../../Hooks/useRoles';
import {
   systemNotificationsSelector,
   systemNotificationsLoadingSelector,
   notificationErrorSelector,
} from './Notification.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import TableComponent from '../../Components/TableComponent/TableComponent';
import dayjs from 'dayjs';
import { RiEditFill } from '@react-icons/all-files/ri/RiEditFill';
import { MdDeleteForever } from '@react-icons/all-files/md/MdDeleteForever';
import { Popconfirm } from 'antd';
import { Switch } from 'antd';
import { SocketContext } from '../../Context/SocketContext';
import { message } from 'antd';

const ROW = [
   { heading: 'heading', id: 1 },
   { heading: 'created At', id: 2 },
   { heading: 'updated At', id: 3 },
   { heading: 'options', id: 4 },
   { heading: 'publish', id: 5 },
];

function NotificationPage() {
   const navigation = useNavigate();
   const [Page, setPage] = useState(0);
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();
   const socket = useContext(SocketContext);

   const notificationError = useSelector(notificationErrorSelector);
   const systemNotifications = useSelector(systemNotificationsSelector);
   const systemNotificationsLoading = useSelector(systemNotificationsLoadingSelector);

   const NextPageHandler = function () {
      setPage((prevState) => prevState + 1);
      const nextPage = Page + 1;
      dispatch(getAllSystemNotification({ page: nextPage }));
   };

   const PrevPageHandler = function () {
      setPage((prevState) => prevState - 1);
      const prevPage = Page - 1;
      dispatch(getAllSystemNotification({ page: prevPage }));
   };

   const CreateNewNotification = function () {
      navigation('/notification/create');
   };

   const DeleteNotification = function (id) {
      dispatch(deleteSingleNotification({ notificationId: id }));
   };

   const PublishSystemNotification = function (id, checked) {
      let type = '';
      if (checked) {
         type = 'pushNotification';
      } else {
         type = 'pullNotification';
      }
      socket.emit('_system_notification', { id, type });
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllSystemNotification({ page: Page }));
      }
   }, [isAdmin]);

   const SystemNotificationHandler = function (arg) {
      if (arg?.success) {
         message.success(arg?.message);
      } else {
         message.error(arg?.message);
      }
   };

   useEffect(() => {
      socket.on('_system_notification_response', SystemNotificationHandler);

      return () => {
         socket.off('_system_notification_response', SystemNotificationHandler);
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               subHeading={'All system notification'}
               pageName={'Notification'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias.`}
               menu={true}
               innerProps={<MenuItem onClick={CreateNewNotification}>Create new notification</MenuItem>}
            />
            <div className="mt-5">
               {!!systemNotificationsLoading ? <SpinnerComponent /> : null}
               {!!notificationError ? <p className="text-sm error_cl">{notificationError}</p> : null}
               {!!systemNotifications &&
               systemNotifications?.success &&
               systemNotifications?.notifications &&
               systemNotifications?.notifications.length ? (
                  <TableComponent
                     row={ROW}
                     nextAndPrev={true}
                     nextHandler={NextPageHandler}
                     prevHandler={PrevPageHandler}
                     disablePrevbtn={Page === 0 ? true : false}
                     disableNextbtn={Page >= systemNotifications?.totalPages ? true : false}
                     tableWidth={'1000'}
                  >
                     {systemNotifications?.notifications.map((el) => (
                        <tr key={el?._id}>
                           <td>{el?.heading}</td>
                           <td>{dayjs(el?.createdAt).format('DD MMMM YY hh:mm:ss A')}</td>
                           <td>{dayjs(el?.updatedAt).format('DD MMMM YY hh:mm:ss A')}</td>
                           <td className="flex items-center space-x-3 icon_box">
                              <RiEditFill onClick={() => navigation(`/notification/edit/${el?._id}`)} />
                              <Popconfirm
                                 title="Delete the task"
                                 description="Are you sure to delete this notification?"
                                 onConfirm={() => DeleteNotification(el?._id)}
                                 okText="Yes"
                                 cancelText="No"
                              >
                                 <MdDeleteForever />
                              </Popconfirm>
                           </td>
                           <td>
                              <Switch
                                 onChange={(checked) => PublishSystemNotification(el?._id, checked)}
                                 checkedChildren="Yes"
                                 unCheckedChildren="No"
                                 defaultChecked={el?.publish}
                              />
                           </td>
                        </tr>
                     ))}
                  </TableComponent>
               ) : (
                  <div className="text-center">
                     <p className="text-gray-300 font-medium">No Notifications</p>
                  </div>
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default NotificationPage;
