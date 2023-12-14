import React, { useEffect, useRef } from 'react';

const countdownTime = 1684669734680;

function LotteryBannerComponent() {
   const timerRef = useRef(null);

   function updateCountdown() {
      const currentTime = new Date().getTime();
      const remainingTime = countdownTime - currentTime;
      if (remainingTime <= 0) {
         timerRef.current.textContent = 'Countdown finished!';
         return;
      }

      let hours = Math.floor(
         (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      let minutes = Math.floor(
         (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
      );
      let seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      timerRef.current.textContent = `${hours}h : ${minutes}m : ${seconds}s`;
   }

   useEffect(() => {
      const interval = setInterval(() => {
         updateCountdown();
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div>
         <div className="lottery-banner">
            <div className="over-lay"></div>
            <img src="/images/banner-mv-game-lottery.png" alt="" />
            <div className="timer_div">
               <h5 className="text-2xl text-gray-100 font-bold" ref={timerRef}>
                  03h : 10m : 37s
               </h5>
            </div>
         </div>
      </div>
   );
}

export default LotteryBannerComponent;
