import React from 'react';
import * as styled from './AboutComponent.style';

function AboutComponent() {
   return (
      <styled.div className="py-4 px-5">
         <h1 className="text-center text-2xl text-red-500 font-medium">
            About Red pepe
         </h1>
         <div className="my-4">
            <p className="text-md text-gray-300 mb-4">
               Introducing our betting platform, the ultimate destination for
               sports betting enthusiasts. Our platform offers a wide range of
               sports, including football, basketball, tennis, and more. Whether
               you're a fan of traditional sports or more niche competitions,
               we've got you covered. Our platform is designed with user
               experience in mind, offering a sleek and intuitive interface that
               makes it easy to place bets and track your progress.
            </p>
            <p className="text-md text-gray-300 mb-4">
               We also offer a variety of betting options, including point
               spreads, moneylines, and over/unders, giving you the flexibility
               to choose the bet that best suits your strategy. But what really
               sets our platform apart are our payment options. We accept
               Redpepe as a native coin, providing users with a secure, fast,
               and transparent payment option that eliminates the need for
               complicated financial transactions. With Redpepe, you can make
               deposits and withdrawals quickly and easily, without having to
               worry about hidden fees or lengthy processing times.
            </p>
            <p className="text-md text-gray-300 mb-4">
               In addition to the benefits of using Redpepe as your payment
               option, we also offer exclusive promotions and bonuses for our
               users. Whether it's a free bet or a bonus for referring a friend,
               we're always looking for ways to enhance your experience and give
               you more opportunities to win big.
            </p>
            <p className="text-md text-gray-300 mb-4">
               On our betting platform, we're committed to providing our users
               with the best possible betting experience. With our wide range of
               sports, flexible betting options, and seamless payment options,
               we're confident that you'll find everything you need to take your
               sports betting to the next level. So why wait? Sign up today and
               start betting with Redpepe!
            </p>
         </div>
      </styled.div>
   );
}

export default AboutComponent;
