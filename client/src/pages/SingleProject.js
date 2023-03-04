import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_PROJECT } from '../utils/queries';

import { Progress } from 'semantic-ui-react';


function Project() {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='project'>
        <h1>{project.title}</h1>
        <h3>By: {project.creator}</h3>
        <p>{project.description}</p>
        <h6>Project Repository: </h6>
        <div className="image-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEDTM_UykRqicsM53-Z3-xlv9epc9nxNcI3g&usqp=CAU" alt=""/>
        </div>
        <div>
          <h5>Funding Goal: ${project.fundingGoal}</h5>
          <Progress percent="80" inverted progress success/>
          <div className='button-container'>
            <button className='button'>Donate</button>
            <button className='button'>Collaborate</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default Project;