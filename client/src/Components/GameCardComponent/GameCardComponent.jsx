import React from 'react';
import * as styled from './GameCardComponent.style';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { useNavigate } from 'react-router';
import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline';
import { Popconfirm } from 'antd';
import { deleteSingleGame } from '../../App/Features/Games/GameActions';
import { useDispatch } from 'react-redux';

function GameCardComponent({ data }) {
   const navigation = useNavigate();
   const dispatch = useDispatch();

   const DeleteGameHandler = function () {
      dispatch(deleteSingleGame({ gameId: data?._id }));
   };

   return (
      <styled.div className="p-2">
         <ul className="game-cards">
            <div className="game-card">
               <div className="game-card__front">
                  <div className="game-card__header">
                     <div className="game-card__cover">
                        <div
                           className="game-card__image-placeholder"
                           style={{
                              backgroundImage: `url(${data?.gameImage})`,
                           }}
                        ></div>
                        <span className="game-card__cover-badge new">
                           {data?.gameStatus}
                        </span>
                     </div>
                     <div className="game-card__title text-gray-500 font-medium">
                        {data?.name}
                     </div>
                     <button
                        className="game-card__touch-target"
                        aria-label="expand"
                     ></button>
                  </div>
               </div>

               <div className="game-card__back">
                  <div className="game-card__content">
                     <div className="game-card__metadata">
                        <i className="fa fa-clock" aria-hidden="true"></i>
                        {data?.description}
                     </div>
                     <div className="game-card__buttons">
                        <button className="game-card__button -download">
                           <i className="fa fa-download" aria-hidden="true"></i>
                           More Info
                        </button>
                        <button
                           className="game-card__button"
                           aria-label="More"
                           onClick={() => navigation(`/games/${data?._id}`)}
                        >
                           <FiEdit2 />
                        </button>
                        <Popconfirm
                           title="Delete the task"
                           description="Are you sure to delete this task?"
                           okText="Yes"
                           cancelText="No"
                           onConfirm={DeleteGameHandler}
                        >
                           <button
                              className="game-card__button"
                              aria-label="More"
                           >
                              <TiDeleteOutline />
                           </button>
                        </Popconfirm>
                     </div>
                  </div>
               </div>
            </div>
         </ul>
      </styled.div>
   );
}

export default GameCardComponent;
