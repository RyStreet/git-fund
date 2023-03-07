import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Donate from '../components/Donate'
import Collaborate from '../components/Collaborate'
import Collaborators from '../components/Collaborators';
import Donations from '../components/Donations';

import { QUERY_SINGLE_PROJECT } from '../utils/queries';

import { Progress } from 'semantic-ui-react';


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

  return (
    <>
      <div className='project'>
        <h1>{project.title}</h1>
        <h3>By: {project.creator}</h3>
        <p>{project.description}</p>
        <h6>Project Repository: {project.repo}</h6>
        {/* <div className="image-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEDTM_UykRqicsM53-Z3-xlv9epc9nxNcI3g&usqp=CAU" alt=""/>
        </div> */}
        <div>
          <div>
            <h5>Funding Goal: ${project.fundingGoal}</h5>
            {/* <h5>Funding Earned: <Donations fundingEarned={project.fundingEarned}/> </h5> */}
            <Progress percent="80" inverted progress success/>
          </div>      
          <div>
            <h5>Collaborators: <Collaborators collaborators={project.collaborators}/></h5>
          </div>
          <div className='button-container'>
            <Donate projectId={project._id} className='button' />
            <Collaborate projectId={project._id} className='button' />
          </div>
          <div className='donations-container'>
            <h5>Donations:</h5>
            <Donations fundingEarned={project.fundingEarned}/>
          </div>
        </div>
      </div>
    </>
  )
};

export default SingleProject;