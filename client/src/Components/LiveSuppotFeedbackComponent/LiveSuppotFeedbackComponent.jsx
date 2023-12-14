import React, { useState } from 'react';
import { authSelector } from './LiveSuppotFeedbackComponent.Selector';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { updateUserQueryFeedBack } from '../../App/Features/LiveSupport/liveSupportActions';
import { useNavigate } from 'react-router-dom';

const actions = [
   { icon: <CheckCircleIcon />, name: 'resolved' },
   { icon: <ThumbDownAltIcon />, name: 'abused' },
   { icon: <BookmarkRemoveIcon />, name: 'removed' },
];

function LiveSuppotFeedbackComponent() {
   const [open, setOpen] = useState(false);
   const [show, setShow] = useState(false);
   const [searchParams] = useSearchParams();
   const param = searchParams.get('chat');
   const navigation = useNavigate();

   const dispatch = useDispatch();

   const auth = useSelector(authSelector);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const clickHandler = async function (value) {
      if (!!auth && auth?.user && auth?.user?._id) {
         setOpen(false);
         setShow(true);
         const response = await dispatch(
            updateUserQueryFeedBack({ queryId: param, supportTeamUserId: auth?.user?._id, feedBack: value })
         );

         if (response?.payload && response?.payload?.data && !!response?.payload?.data?.userId) {
            navigation('/live/support');
         }
      }
   };

   return (
      <div>
         <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
               ariaLabel="SpeedDial basic example"
               sx={{ position: 'absolute', bottom: -25, right: 16 }}
               icon={<SpeedDialIcon />}
               onClose={handleClose}
               onOpen={handleOpen}
               open={open}
               hidden={show}
            >
               {actions.map((action) => (
                  <SpeedDialAction
                     onClick={() => clickHandler(action?.name)}
                     key={action.name}
                     icon={action.icon}
                     tooltipTitle={action.name}
                  />
               ))}
            </SpeedDial>
         </Box>
      </div>
   );
}

export default LiveSuppotFeedbackComponent;
