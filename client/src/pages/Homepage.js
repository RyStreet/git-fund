import React from 'react';
import NavBar from '../components/Navbar';
// import { useQuery } from '@apollo/client';
import background from '../assets/background-mobile.jpg'
function Homepage() {
  return (
    <div>
      <NavBar/>
    <img className='background' src={background}></img>

    </div>
  )
};

export default Homepage;