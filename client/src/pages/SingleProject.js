import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Donate from '../components/Donate'
import Collaborate from '../components/Collaborate'
import Collaborators from '../components/Collaborators';
import Donations from '../components/Donations';


import { QUERY_SINGLE_PROJECT } from '../utils/queries';

import Auth from '../utils/auth';

function SingleProject() {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};
  
  if (!Auth.loggedIn()) {
    return (
      <div style={{height: "400px"}}>
      <Link to={'/login'} className="textDecNone">
       <div className="msgScreen">
          <h2>Login or sign up to view user profiles</h2>
        </div>
      </Link>
      </div>
    )
  }
  if (loading) {
    return <div>Loading...</div>
  }

  // For total donations
  let donations = project.fundingEarned
  

  let total = 0

  for (let i = 0; i < donations.length; i++){
   const loopDonations = donations[i].amount
    

   total += loopDonations
  }
  
  

  return (
    <>
      <div className='project'>
        <div className='project-section1'>
          <h1>{project.title}</h1>
          <h4>By: <Link className="textDecNone" to={`/profiles/${project.creator}`}>{project.creator}</Link></h4>
          <h5>{project.description}</h5>
          {/* <h5>Project Repository: {project.repo}</h5> */}
          <a className="ghIcon" style={{textDecoration:"none", color:"black"}} href={project.repo} target="_blank" rel="noreferrer" >
            <i class="github icon huge"></i>
          </a>
        </div>  

        <br/>

        <div className='project-section3'>          
          <h4>Funding Total: ${total}</h4>
          <h4>Funding Goal: ${project.fundingGoal}</h4>
          {/* <Progress percent="80" inverted progress success/> */}
          <Donate projectId={project._id} className='button donate-btn' />
        </div>

        <div className='project-section2'>
          <h4>Collaborators:</h4>
          <h5><Collaborators collaborators={project.collaborators}/></h5>
          <Collaborate projectId={project._id} className='button' />
        </div>
      </div>

      <div > 
        <Donations fundingEarned={project.fundingEarned}/>
      </div>
    </>
  )
};

export default SingleProject;