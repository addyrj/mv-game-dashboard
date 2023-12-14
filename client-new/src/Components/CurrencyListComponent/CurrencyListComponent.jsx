import React, { Fragment, useState } from 'react';
import * as styled from './CurrencyListComponent.style';
import { BiRupee } from '@react-icons/all-files/bi/BiRupee';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { Typography } from '@mui/material';
// import { cardData } from '../PaymentOptionsTabsComponent/BtnAmount';

export const CurrencyListComponent = ({ BtnAmount, item }) => {
   const [selectedCard, setSelectedCard] = useState(true);

   return (
      <Fragment>
         {/* <div> */}
         <styled.Card
            onClick={() => setSelectedCard(item)}
            key={item.id}
            className={`_card ${selectedCard === item ? 'card_Selected' : ''}`}
         >
            {
               <div className="smallWrapper">
                  <LazyLoadImage src={item.image} alt="" />
                  <p className="_title">{item.title}</p>
                  <span className="questioncirlce">{item.icon}</span>
               </div>
            }
            <p className="btcAmount">
               {item.title === 'bcd' ? (
                  <div className="birupeeholder">
                     {/* <span>
                                <BiRupee style={{
                                    fontSize: '16px',
                                    fontWeight: 800,
                                    color: '#fff',
                                    display: 'inline'
                                }} />
                            </span> */}
                     <BtnAmount value={item.btcamount.toFixed(8)} />
                  </div>
               ) : (
                  <div className="birupeeholder">
                     <span>
                        <BiRupee
                           style={{
                              fontSize: '16px',
                              fontWeight: 800,
                              color: '#fff',
                              display: 'inline',
                           }}
                        />
                     </span>
                     <BtnAmount value={item.btcamount.toFixed(8)} />
                  </div>
               )}
               {item.title === 'bcd' ? (
                  <div className="_lockiconparent">
                     <span className="_lockicon">{item.lock}</span>
                     <span className="inr">
                        <span>
                           <BiRupee
                              style={{
                                 fontSize: '16px',
                                 fontWeight: 800,
                                 color: '#FBCF10',
                              }}
                           />
                        </span>
                        {item.inr}
                     </span>
                  </div>
               ) : (
                  <BtnAmount value={item.btcamount.toPrecision(9)} />
               )}
            </p>
         </styled.Card>

         {/* </div > */}
      </Fragment>
   );
};

export default CurrencyListComponent;
