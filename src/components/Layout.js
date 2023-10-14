import React from 'react'
import '../styles/Layout.css'
import { Outlet, useLocation } from 'react-router-dom';
import SideSocial from './SideSocial';
import Header from "./Header.js";
import Footer from "./Footer.js";
import home from "../assets/images/img1.png"
// import eshop from "../assets/bg/bg_1.png"
// import game from "../assets/bg/bg_5.png"
// import compte from "../assets/bg/bg_3.png"
import signup from "../assets/images/img19.png"

function Layout() {
  const location = useLocation();

  let bgImg = home;
  let bgClass =''

  // Définir des classes spécifiques pour chaque NavLink actif
  if (location.pathname === '/eshop') {
    bgImg = home;
    bgClass =''
  } else if (location.pathname === '/compte') {
    bgImg = signup;
    bgClass = 'bgRadiant'
  } else if (location.pathname === '/signup') {
    bgImg = signup;
    bgClass = 'bgRadiant'
  } else if (location.pathname === '/login') {
    bgImg = signup
    bgClass = 'bgRadiant'
  } else {
    bgImg = home
    bgClass =''
  }

  return (
    <>
      <div id="appContainer" className={bgClass}>
        <div className='backgroundImg'>
          <img src={bgImg} alt="background-image" />
          <div ></div>
        </div>
        <div id="appBody">
          <SideSocial />
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout