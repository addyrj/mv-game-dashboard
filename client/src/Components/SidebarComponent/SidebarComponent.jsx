import React, { useEffect, useContext, Fragment } from 'react';
import * as styled from './SidebarComponent.style';
import DashboardSidebarTabComponent from '../DashboardSidebarTabComponent/DashboardSidebarTabComponent';
import IconListComponent from '../IconListComponent/IconListComponent';
import { FiGitlab } from '@react-icons/all-files/fi/FiGitlab';
import { FiLink } from '@react-icons/all-files/fi/FiLink';
import { HiOutlineCurrencyRupee } from '@react-icons/all-files/hi/HiOutlineCurrencyRupee';
import { RiGameFill } from '@react-icons/all-files/ri/RiGameFill';
import { VscExtensions } from '@react-icons/all-files/vsc/VscExtensions';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { AiOutlineFileProtect } from '@react-icons/all-files/ai/AiOutlineFileProtect';
import { SiNintendogamecube } from '@react-icons/all-files/si/SiNintendogamecube';
import { MdDashboard } from '@react-icons/all-files/md/MdDashboard';
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod';
import { RiNotificationBadgeFill } from '@react-icons/all-files/ri/RiNotificationBadgeFill';
import { authSelector, userRoleSelector } from './Sidebar.Selector';
import { useSelector, useDispatch } from 'react-redux';
import { SocketContext } from '../../Context/SocketContext';
import { MdPayment } from '@react-icons/all-files/md/MdPayment';
import { VscSymbolArray } from '@react-icons/all-files/vsc/VscSymbolArray';
import { AiOutlineTransaction } from '@react-icons/all-files/ai/AiOutlineTransaction';
import { ImSpinner10 } from '@react-icons/all-files/im/ImSpinner10';
import { ImImages } from '@react-icons/all-files/im/ImImages';
import { GiRolledCloth } from '@react-icons/all-files/gi/GiRolledCloth';
import { RiAccountPinBoxFill } from '@react-icons/all-files/ri/RiAccountPinBoxFill';
import { FaQuestion } from '@react-icons/all-files/fa/FaQuestion';
import { AiOutlineCreditCard } from '@react-icons/all-files/ai/AiOutlineCreditCard';
import { HiOutlineChatAlt } from '@react-icons/all-files/hi/HiOutlineChatAlt';
import { VscVerified } from '@react-icons/all-files/vsc/VscVerified';
import { getUserRole } from '../../App/Features/Admin/adminActions';
import useRoles from '../../Hooks/useRoles';
import { FcCustomerSupport } from '@react-icons/all-files/fc/FcCustomerSupport';
import { useNavigate } from 'react-router';

function SidebarComponent() {
   const {
      userRoles: { isAdmin, isSupport, isSubAdmin, roles },
   } = useRoles();

   const socket = useContext(SocketContext);
   const userRole = useSelector(userRoleSelector);
   const auth = useSelector(authSelector);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!!auth && auth?.user && auth?.user?._id) {
         socket.emit('_online_user', {
            userId: auth?.user?._id,
            userCrId: auth?.user?.userId,
         });

         if (!userRole) {
            dispatch(getUserRole({ userId: auth?.user?._id }));
         }
      }
   }, [auth]);

   return (
      <styled.div>
         <div className="nav_logo_div">
            <img src="/images/logo_blc.png" alt="logo png" />
         </div>
         <styled.sclDiv className="shadow">
            <DashboardSidebarTabComponent heading={'Dashboard'}>
               <IconListComponent icon={<MdDashboard />} heading={'Dashboard'} link={'/'} />
               {isAdmin && (
                  <>
                     <IconListComponent icon={<FiLink />} heading={'Users Role'} link={'/user-roles?page=0'} />
                     <IconListComponent
                        icon={<HiOutlineCurrencyRupee />}
                        heading={'Game Currency'}
                        link={'/game-currency?page=0'}
                     />
                     <IconListComponent
                        icon={<VscExtensions />}
                        heading={'Game Category'}
                        link={'/game-category?page=0'}
                     />
                     <IconListComponent icon={<RiGameFill />} heading={'Games'} link={'/games?page=0'} />
                     <IconListComponent icon={<FiGitlab />} heading={'Avatar'} link={'/avatars'} />
                     <IconListComponent
                        icon={<SiNintendogamecube />}
                        heading={'Games providers'}
                        link={'/games/providers?page=0'}
                     />
                     <IconListComponent icon={<ImImages />} heading={'Images'} link={'/upload-images'} />
                  </>
               )}
            </DashboardSidebarTabComponent>
            {isAdmin && (
               <DashboardSidebarTabComponent heading={'Push Notification'}>
                  <IconListComponent
                     icon={<RiNotificationBadgeFill />}
                     heading={'Notification'}
                     link={'notification'}
                  />
               </DashboardSidebarTabComponent>
            )}
            {isAdmin || isSubAdmin ? (
               <Fragment>
                  <DashboardSidebarTabComponent heading={'Tools'}>
                     <IconListComponent
                        icon={<AiOutlineFileProtect />}
                        heading={'Export Game Data'}
                        link={'/export/game/data'}
                     />
                  </DashboardSidebarTabComponent>
                  <DashboardSidebarTabComponent heading={'Payment'}>
                     <IconListComponent icon={<VscSymbolArray />} heading={'Payment fields'} link={'/payment-fields'} />
                     <IconListComponent
                        icon={<VscSymbolMethod />}
                        heading={'Game Currency Payment'}
                        link={'/game-currency-payment'}
                     />
                     <IconListComponent
                        icon={<MdPayment />}
                        heading={'Fiat deposit payments'}
                        link={'/fiat-deposit-payments'}
                     />
                     <IconListComponent
                        icon={<AiOutlineTransaction />}
                        heading={'Fiat withdraw transaction'}
                        link={'/fiat/withdraw/transaction'}
                     />
                  </DashboardSidebarTabComponent>
                  <DashboardSidebarTabComponent heading={'Lucky Draw'}>
                     <IconListComponent icon={<ImSpinner10 />} heading={'Spin'} link={'spin-draw'} />
                     <IconListComponent icon={<GiRolledCloth />} heading={'Lottery lucky draw'} link={'lottery-draw'} />
                  </DashboardSidebarTabComponent>
                  <DashboardSidebarTabComponent heading={'Faq'}>
                     <IconListComponent icon={<FaQuestion />} heading={'Faqs Category'} link={'faq-category'} />
                     <IconListComponent icon={<AiOutlineCreditCard />} heading={'Faqs Posts'} link={'faq-posts'} />
                  </DashboardSidebarTabComponent>
                  <DashboardSidebarTabComponent heading={'User management'}>
                     <IconListComponent icon={<FiUsers />} heading={'Users'} link={'/users?page=0'} />
                     <IconListComponent
                        icon={<RiAccountPinBoxFill />}
                        heading={'Player accounts'}
                        link={'/players-accounts/create'}
                     />
                     <IconListComponent icon={<FcCustomerSupport />} heading={'Support Team'} link={'/support/team'} />
                  </DashboardSidebarTabComponent>
               </Fragment>
            ) : null}
            {isSupport ? (
               <DashboardSidebarTabComponent heading={'Live'}>
                  <IconListComponent icon={<VscVerified />} heading={'Support approval'} link={'/support/approval'} />
                  <IconListComponent icon={<HiOutlineChatAlt />} heading={'Live chat'} link={'/live/support'} />
               </DashboardSidebarTabComponent>
            ) : null}
            <DashboardSidebarTabComponent heading={'Rewards Management'}>
               <IconListComponent icon={<MdDashboard />} heading={'Rewards'} link={'/rewards?page=0'} />
               <IconListComponent icon={<VscExtensions />} heading={'Create Reward'} link={'/rewards/create-reward'} />
            </DashboardSidebarTabComponent>
            <DashboardSidebarTabComponent heading={'Activity Management'}>
               {isAdmin ? <IconListComponent icon={<FiGitlab />} heading={'Admin'} link={'/activity-monitor/admin'} /> : null}
               {isAdmin || isSubAdmin ? <IconListComponent icon={<MdPayment />} heading={'Sub Admin'} link={'/activity-monitor/sub-admin'} /> : null}
               {isAdmin || isSubAdmin || isSupport ? <IconListComponent icon={<RiAccountPinBoxFill />} heading={'Support'} link={'/activity-monitor/support'} /> : null}
               {isAdmin || isSubAdmin || isSupport ? <IconListComponent icon={<FiUsers />} heading={'User'} link={'/activity-monitor/user'} /> : null}
            </DashboardSidebarTabComponent>
         </styled.sclDiv>
      </styled.div>
   );
}

export default SidebarComponent;
