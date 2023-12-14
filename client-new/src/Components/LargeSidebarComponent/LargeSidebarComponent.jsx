import React from 'react';
import MyVipPacksComponent from '../MyVipPacksComponent/MyVipPacksComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SideBarIconComponent from '../SideBarIconComponent/SideBarIconComponent';
import { useNavigate } from 'react-router';
import * as styled from './LargetSidebar.Style';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { AiOutlineHome } from '@react-icons/all-files/ai/AiOutlineHome';
import { CgGames } from '@react-icons/all-files/cg/CgGames';
import { VscHistory } from '@react-icons/all-files/vsc/VscHistory';
import { AiOutlineLike } from '@react-icons/all-files/ai/AiOutlineLike';
import { TiThSmallOutline } from '@react-icons/all-files/ti/TiThSmallOutline';
import { VscArchive } from '@react-icons/all-files/vsc/VscArchive';
import { DiJqueryUiLogo } from '@react-icons/all-files/di/DiJqueryUiLogo';
import { DiProlog } from '@react-icons/all-files/di/DiProlog';
import { AiFillFire } from '@react-icons/all-files/ai/AiFillFire';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';
import GameCategoryComponent from '../GameCategoryComponent/GameCategoryComponent';
import { showAndHideSideBarHandler } from '../../App/Features/Client/clientSlice';
import { useDispatch } from 'react-redux';
import { GiRolledCloth } from '@react-icons/all-files/gi/GiRolledCloth';

function LargeSidebarComponent({ toggleMenuHandler }) {
   const navigation = useNavigate();
   const dispatch = useDispatch();

   const hideSmMenu = function () {
      dispatch(showAndHideSideBarHandler(false));
   };

   return (
      <styled.div className="lg_div">
         <div className="toogle_sidebar_div d-flex align-items-center">
            <div className="d-none d-md-block">
               <div className="toggle_bar_div" onClick={toggleMenuHandler}>
                  <LazyLoadImage src="/images/bars.svg" alt="" />
               </div>
            </div>
            <div
               className=" cursor-pointer ms-0 ms-md-3 flex items-center justify-center space-x-2"
               onClick={() => navigation('/')}
            >
               {/* <LazyLoadImage
                  src="/images/red-pepe-logo.png"
                  className="logo"
                  alt=""
               /> */}
               <LazyLoadImage src="/images/logo-mv_game.svg" alt="" />
               {/* <p className="text-gray-200 font-xl font-bold">Red Pepe</p> */}
            </div>
            <div className="d-block d-md-none close_btn">
               <VscClose className="text-gray-400" onClick={hideSmMenu} />
            </div>
         </div>
         <div className="mt-4">
            <SideBarIconComponent
               icon={<AiOutlineHome />}
               text={'Home'}
               subVariation={true}
               link={'/'}
               onClick={hideSmMenu}
            />
            <MyVipPacksComponent />
            <SideBarIconComponent
               icon={<CgGames />}
               text={'games'}
               subVariation={false}
               parent={true}
               dropDownIcon={
                  <MdKeyboardArrowRight className="text-gray-300 text-2xl" />
               }
            >
               <SideBarIconComponent
                  text={'Slots'}
                  subVariation={true}
                  link={'/slots?page=0'}
                  icon={<DiJqueryUiLogo />}
                  onClick={hideSmMenu}
               />
               <SideBarIconComponent
                  text={'Live Casino'}
                  subVariation={true}
                  icon={<DiProlog />}
                  link={'/casino?page=0'}
                  onClick={hideSmMenu}
               />
               <SideBarIconComponent
                  text={'Hot Games'}
                  subVariation={true}
                  link={'/hot?page=0'}
                  icon={<AiFillFire />}
                  onClick={hideSmMenu}
               />
               <GameCategoryComponent />
               <SideBarIconComponent
                  text={'All Games'}
                  subVariation={true}
                  icon={<TiThSmallOutline />}
                  link={'/all-games?page=0'}
                  onClick={hideSmMenu}
               />
               <SideBarIconComponent
                  text={'New Releases'}
                  subVariation={true}
                  icon={<VscArchive />}
                  link={'/new-games'}
                  onClick={hideSmMenu}
               />
            </SideBarIconComponent>
         </div>
         <SideBarIconComponent
            icon={<GiRolledCloth />}
            text={'lottery'}
            subVariation={false}
            link={'/lottery'}
         ></SideBarIconComponent>
         <SideBarIconComponent
            text={'My Favourite Games'}
            subVariation={true}
            icon={<AiOutlineLike />}
            link={'/favourite-games'}
            onClick={hideSmMenu}
         />
         <SideBarIconComponent
            text={'Recently Played Games'}
            subVariation={true}
            icon={<VscHistory />}
            link={'/recent-games'}
            onClick={hideSmMenu}
         />
      </styled.div>
   );
}

export default LargeSidebarComponent;
