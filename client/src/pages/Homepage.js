import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import background from '../assets/background-mobile.jpg'
// import AboutUs from '../components/AboutUs';

import Auth from '../utils/auth';

function Homepage() {
  return (
    <div>
      <h1>Help fund or collaborate on projects!</h1>
      
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link to='/create-project'>
              <button>+ New Project</button>
            </Link>
          </>
        ) : (
          <>
            <Link to={'/login'}>
              <button>+ New Project</button>
            </Link>
          </>
        )}
        
      </div>

      {/* <img className='background' src={background}></img>
      <AboutUs/> */}
    </div>
  )
};

export default Homepage;