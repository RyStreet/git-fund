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

import { Progress } from 'semantic-ui-react';
import { Dummydata } from './DummyData';


function SingleProject() {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};
  console.log(project)
  if (!Auth.loggedIn()) {
    return (
      <Link to={'/login'} className="textDecNone">
        <h1>Login or sign up to interact with projects!</h1>
      </Link>
    )
  }
  if (loading) {
    return <div>Loading...</div>
  }

  // For total donations
  let donations = project.fundingEarned
  console.log(donations)

  let total = 0

  for (let i = 0; i < donations.length; i++){
   const loopDonations = donations[i].amount
   console.log("LOOP", loopDonations)   

   total += loopDonations
  }
  console.log(total)
  

  return (
    <>
      <div className='project'>
        <div className='project-section1'>
          <h1>{project.title}</h1>
          <h5>By: {project.creator}</h5>
          <h5>{project.description}</h5>
          <h5>Project Repository: {project.repo}</h5>
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

      <div className='list'> 
        <Donations fundingEarned={project.fundingEarned}/>
      </div>
    </>
  )
};

export default SingleProject;