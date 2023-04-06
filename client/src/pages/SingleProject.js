import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Donate from '../components/Donate'
import Collaborate from '../components/Collaborate'
import Collaborators from '../components/Collaborators';
import Donations from '../components/Donations';

import { QUERY_ME } from '../utils/queries';
import { QUERY_USER } from '../utils/queries';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import { REMOVE_PROJECT } from '../utils/mutations';

import Auth from '../utils/auth';

function SingleProject() {
  const navigate = useNavigate();

  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId }
  });

  const project = data?.project || {};

  const [removeProject, {error}] = useMutation(REMOVE_PROJECT);
  
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

  // To delete project
  const handleRemoveProject = async(event) => {
    event.preventDefault();
    console.log("Project Removed!")

    try {
      const {data} = await removeProject({
        variables: {
          projectId: project._id
        }
      })
      navigate("/profile", {replace: true});
      navigate(0);
    } catch (err) {
      console.error(err)
    }
  };

  const myProject = () => {
    const me = JSON.stringify(Auth.getProfile().data.username)
    const projectCreator = JSON.stringify(project.creator)
    if (me === projectCreator) {
      console.log("matching")
      return true;
    } else {
      console.log("not matching")
      return false;
    } 
  }
  const isMyProject = myProject()

  return (
    <>
      <div className='project'>
        <div className='project-section1'>
          <h1>{project.title}</h1>
          <h4>By: <Link className="textDecNone" to={`/profiles/${project.creator}`}>{project.creator}</Link></h4>
          <h5>{project.description}</h5>
          {/* <h5>Project Repository: {project.repo}</h5> */}
          <a className="ghIcon" style={{textDecoration:"none", color:"black"}} href={project.repo} target="_blank" rel="noreferrer" >
            <i className="github icon huge"></i>
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

        {isMyProject == true ? (
          <div>
            <button onClick={handleRemoveProject}>Delete</button>
          </div>
          ) : (
          <div></div>
        )}
      </div>
      
      <div > 
        <Donations fundingEarned={project.fundingEarned}/>
      </div> 
    </>
  )
};

export default SingleProject;