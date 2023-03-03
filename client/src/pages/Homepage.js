import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from './DummyData';
// import { useQuery } from '@apollo/client';
import background from '../assets/background-mobile.jpg'
import AboutUs from '../components/AboutUs';
import { Progress } from 'semantic-ui-react'
import Auth from '../utils/auth';
import { QUERY_PROJECTS } from '../utils/queries';
import ProjectCards from '../components/ProjectCards';

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
      <div>
      {/* {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectCards
              project={project}
            />
          )} */}
      </div>

      {/* <img className='background' src={background}></img>
      <AboutUs/> */}
    </div>
  )
};

export default Homepage;