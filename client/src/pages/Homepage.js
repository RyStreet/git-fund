import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background-mobile.jpg'
import AboutUs from '../components/AboutUs';
import ProjectCards from '../components/ProjectCards';
import city from '../assets/background-desktop.jpg';

import Auth from '../utils/auth';
import { QUERY_PROJECTS } from '../utils/queries';


function Homepage() {
  const {loading, data} = useQuery(QUERY_PROJECTS)
  const projects = data?.projects || []

  return (
    <div className='HomeMainContainer'>
      <div id='homeHeader' style={{ justifyContent: "center"}}>
       
      <h3 style={{fontSize: "50px", marginLeft: "5%" }}>Help fund or collaborate on projects!</h3>
      </div>
      <div style={{marginLeft: "5%" }}>
        {Auth.loggedIn() ? (
          <div>
            <Link style={{}} to='/create-project'>
              <button style={{backgroundColor:'#FE9F00'}} className='button'>+ New Project</button>
            </Link>
          </div>
        ) : (
          <>
            <Link to={'/login'}>
              <button className='button'>+ New Project</button>
            </Link>
          </>
         )}
        
      </div>
      <div>


        {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectCards
              projects={projects}
            />
          )}
      </div>

      {/* <img className='background' src={background}></img>
      <AboutUs/> */}
    </div>
  )
};

export default Homepage;