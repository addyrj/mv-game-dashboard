import React from 'react';
import { Button, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete';
import { BiShareAlt } from '@react-icons/all-files/bi/BiShareAlt';
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical';

const IsolatedMenu = ({ gameId, deleteSingleHandler, shareGameHandler }) => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   return (
      <div>
         <Button
            className="p-0"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         >
            <div className="bars_div">
               <BsThreeDotsVertical className="text-gray-500" />
            </div>
         </Button>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
         >
            {/* <MenuItem onClick={handleClose}>
               <div
                  className="flex items-center space-x-3"
                  onClick={() => shareGameHandler()}
               >
                  <BiShareAlt />
                  <p className="text-sm">Share with others</p>
               </div>
            </MenuItem> */}
            <MenuItem onClick={handleClose}>
               <div
                  className="flex items-center space-x-3"
                  onClick={() => deleteSingleHandler(gameId)}
               >
                  <AiOutlineDelete />
                  <p className="text-sm">Remove from recent games</p>
               </div>
            </MenuItem>
         </Menu>
      </div>
   );
};

export default IsolatedMenu;
