import React from 'react';
// import { useQuery } from '@apollo/client';
import background from '../assets/background-mobile.jpg'
import AboutUs from '../components/AboutUs';

function Homepage() {
  return (
    <div>
      {/* <NavBar/> */}
    <img className='background' src={background}></img>
    <AboutUs/>
    </div>
  )
};

export default Homepage;