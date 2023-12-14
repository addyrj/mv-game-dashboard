import React, { useEffect } from "react";
import useRoles from "../../Hooks/useRoles";
import { AnimatePresence } from "framer-motion";
import dayjs from 'dayjs';
import { VscEdit } from '@react-icons/all-files/vsc/VscEdit';
import SpinnerComponent from "../../Components/SpinnerComponent/SpinnerComponent";
import PageHeadingComponent from "../../Components/PageHeadingComponent/PageHeadingComponent";
import NavbarComponent from "../../Components/NavbarComponent/NavbarComponent";
import TableComponent from "../../Components/TableComponent/TableComponent";
import { ROW } from "./RewardsTable";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { rewardsSelector } from "./Rewards.Selector";
import { useDispatch, useSelector } from "react-redux";
import { getRewardList } from "../../App/Features/VipClub/vipClubActions";

const totalPages = 0;

const RewardsPage = () => {
  const dispatch = useDispatch();

  const rewardsInfo = useSelector(rewardsSelector);

  const { isLoading } = useRoles();
  const [params] = useSearchParams();
  const page = params.get('page');
  const navigate = useNavigate();

  const editAccountHandler = (id) => {navigate('/rewards/edit-reward/'+id)};

  const NextPageHandler = () => {};

  const PrevPageHandler = () => {};

  useEffect(() => {
    dispatch(getRewardList(1));
  },[]);

  return (
    <div>
      {isLoading && <SpinnerComponent />}
      <NavbarComponent />
      <div className="container_div">
        <PageHeadingComponent
          pageName={'Rewards list for Levels'}
          heading={'Reward List'}
          para={
            'Please Note: Please first manually verify player accounts by reviewing and approving required documents or identification proofs. then create the player account'
          }
        />
        <TableComponent
          row={ROW}
          nextHandler={NextPageHandler}
          nextAndPrev={true}
          prevHandler={PrevPageHandler}
          disablePrevbtn={+page === 0 ? true : false}
          disableNextbtn={+page >= totalPages ? true : false}
          tableWidth={1400}
        >
          {rewardsInfo?.vipList?.length && rewardsInfo.vipList.map((el) => (
              <tr key={el?._id}>
                <td>{el?.name}</td>
                <td>{el?.reward?.$numberDecimal}</td>
                <td>{el?.currency?.currencyName}</td>
                <td>{el?.amount}</td>
                <td>{el?.points}</td>
                <td>{el?.level}</td>
                <td>{dayjs(el?.createdAt).format('DD MMMM YYYY hh:mm:ss A')}</td>
                <td>{dayjs(el?.updatedAt).format('DD MMMM YYYY hh:mm:ss A')}</td>
                <td>
                    <div>
                      <VscEdit className="cursor-pointer" 
                        onClick={() => editAccountHandler(el?._id)} 
                      />
                    </div>
                </td>
              </tr>
          ))}
        </TableComponent>
      </div>
    </div>
  );
};

export default RewardsPage;