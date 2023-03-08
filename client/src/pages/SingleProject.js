import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Donate from '../components/Donate'
import Collaborate from '../components/Collaborate'
import Collaborators from '../components/Collaborators';
import Donations from '../components/Donations';

import { QUERY_SINGLE_PROJECT } from '../utils/queries';

import { Progress } from 'semantic-ui-react';
import { Dummydata } from './DummyData';


function SingleProject() {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};
  console.log(project)
  if (loading) {
    return <div>Loading...</div>
  }

 

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
        {/* <div className="image-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEDTM_UykRqicsM53-Z3-xlv9epc9nxNcI3g&usqp=CAU" alt=""/>
        </div> */}
        {/* <div> */}
          <div>
            {/* <h5>Funding Earned: <Donations fundingEarned={project.fundingEarned}/> </h5> */}
            {/* <Progress percent="80" inverted progress success/> */}
          </div> 
      </div>  
          <div className='project-section3'>
            
            <h5>Funding Total: ${total}</h5>
            <h5>Funding Goal: ${project.fundingGoal}</h5>
            {/* <Donations fundingEarned={project.fundingEarned}/> */}
            <Donate projectId={project._id} className='button donate-btn' />
          </div>

          <div className='project-section2'>
            <h5>Collaborators:</h5>
            <h5><Collaborators collaborators={project.collaborators}/></h5>
            <Collaborate projectId={project._id} className='button' />
          </div>

      </div>


      <div className='list'> 
      Name - Amount
      </div>


    </>
  )
};

export default SingleProject;