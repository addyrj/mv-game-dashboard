import React, { Fragment } from 'react';
import * as styled from './NavbarComponent.style';
import { VscListSelection } from '@react-icons/all-files/vsc/VscListSelection';
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent';
import { AiFillSetting } from '@react-icons/all-files/ai/AiFillSetting';
import { RiNotification4Line } from '@react-icons/all-files/ri/RiNotification4Line';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../App/Features/Auth/authSlice';
import PicMediaImagesPopupComponent from '../../Pages/PicMediaImagesPopupComponent/PicMediaImagesPopupComponent';
import { AnimatePresence } from 'framer-motion';
import { showPickerPopUpSelector, authSelector } from './Navbar.Selector';
import { showPickerPopUpHandler } from '../../App/Features/Media/MediaSlice';

function NavbarComponent() {
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const [anchorEl, setAnchorEl] = React.useState(null);

   const open = Boolean(anchorEl);
   const auth = useSelector(authSelector);
   const showPickerPopUp = useSelector(showPickerPopUpSelector);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const LogoutHandler = function () {
      setAnchorEl(null);
      dispatch(logOut());
      localStorage.removeItem('_mv_games_access_token');
      localStorage.removeItem('_mv_games_auth');
      localStorage.removeItem('_mv_games_refresh_token');
      navigation('/dashboard/auth/login');
   };

   return (
      <styled.div className="shadow-sm flex items-center justify-between">
         <AnimatePresence>
            {!!showPickerPopUp && (
               <PicMediaImagesPopupComponent close={() => dispatch(showPickerPopUpHandler(false))} />
            )}
         </AnimatePresence>
         <Fragment>
            <div className="flex items-center">
               <div className="icon_box_div">
                  <VscListSelection />
               </div>
               <SearchBarComponent />
            </div>
            <div className="flex items-center">
               <div className="icon_box_div">
                  <Badge badgeContent={0} color="primary">
                     <AiFillSetting />
                  </Badge>
               </div>
               <div className="icon_box_div">
                  <Badge badgeContent={0} color="primary">
                     <RiNotification4Line />
                  </Badge>
               </div>
               <div className="icon_box_div">
                  <Button
                     id="basic-button"
                     aria-controls={open ? 'basic-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined}
                     onClick={handleClick}
                  >
                     <div className="user_profile_div shadow">
                        <img src={auth?.user?.avatar} alt="" />
                     </div>
                  </Button>
                  <Menu
                     id="basic-menu"
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleClose}
                     MenuListProps={{
                        'aria-labelledby': 'basic-button',
                     }}
                  >
                     <MenuItem onClick={LogoutHandler}>
                        <div className="flex items-center space-x-5">
                           <FiLogIn />
                           <p>Logout Account</p>
                        </div>
                     </MenuItem>
                  </Menu>
               </div>
            </div>
         </Fragment>
      </styled.div>
   );
}

export default React.memo(NavbarComponent);
