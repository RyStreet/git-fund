import React from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import background from '../assets/background-mobile.jpg'
// import AboutUs from '../components/AboutUs';

function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      
      <div>
        <Link to='/create-project'>
          <button>+ New Project</button>
        </Link>
      </div>

      {/* <img className='background' src={background}></img>
      <AboutUs/> */}
    </div>
  )
};

export default Homepage;