import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SideBarIconComponent from '../SideBarIconComponent/SideBarIconComponent';
import { AiOutlineHome } from '@react-icons/all-files/ai/AiOutlineHome';
import { CgGames } from '@react-icons/all-files/cg/CgGames';
import { VscHistory } from '@react-icons/all-files/vsc/VscHistory';
import { AiOutlineLike } from '@react-icons/all-files/ai/AiOutlineLike';
import { TiThSmallOutline } from '@react-icons/all-files/ti/TiThSmallOutline';
import { VscArchive } from '@react-icons/all-files/vsc/VscArchive';
import { DiJqueryUiLogo } from '@react-icons/all-files/di/DiJqueryUiLogo';
import { DiProlog } from '@react-icons/all-files/di/DiProlog';
import { AiFillFire } from '@react-icons/all-files/ai/AiFillFire';

function SmSidebarComponent({ toggleMenuHandler }) {
   return (
      <div>
         <div className="toogle_sidebar_div d-flex align-items-center">
            <div>
               <div className="toggle_bar_div" onClick={toggleMenuHandler}>
                  <LazyLoadImage src="/images/bars.svg" alt="" />
               </div>
            </div>
         </div>
         <div className="mt-4">
            <SideBarIconComponent
               icon={<AiOutlineHome />}
               subVariation={true}
               link={'/'}
            />
            <SideBarIconComponent
               subVariation={true}
               icon={<DiJqueryUiLogo />}
               link={'/slots?page=0'}
            />
            <SideBarIconComponent
               subVariation={true}
               link={'/casino?page=0'}
               icon={<DiProlog />}
            />
            <SideBarIconComponent
               subVariation={true}
               link={'/hot?page=0'}
               icon={<AiFillFire />}
            />
            <SideBarIconComponent
               subVariation={true}
               icon={<TiThSmallOutline />}
               link={'/all-games?page=0'}
            />
            <SideBarIconComponent
               subVariation={true}
               link={'/new-games'}
               icon={<VscArchive />}
            />
            <SideBarIconComponent
               subVariation={true}
               link={'/favourite-games'}
               icon={<AiOutlineLike />}
            />
            <SideBarIconComponent
               subVariation={true}
               link={'/recent-games'}
               icon={<VscHistory />}
            />
         </div>
      </div>
   );
}

export default SmSidebarComponent;
